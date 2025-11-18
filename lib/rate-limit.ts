/**
 * Distributed rate limiting for API endpoints using Redis, with in-memory fallback.
 *
 * Enforces per-fingerprint request limits within configurable time windows.
 * Clients exceeding the limit receive a 429 response with RateLimit headers.
 */

import type Redis from "ioredis";

import { getRedisClient } from "./redis";

interface RateLimitConfig {
  identifier: string;
  limit: number;
  windowMs: number;
}

interface RateLimitEntry {
  count: number;
  expiresAt: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  limit: number;
  reset: number;
}

/**
 * In-process store of rate limit entries keyed by identifier (e.g. "upvote:fingerprint").
 * Used when Redis is unavailable.
 */
const memoryStore = new Map<string, RateLimitEntry>();

export const RATE_LIMIT_WINDOWS = {
  TEN_PER_HOUR: 60 * 60 * 1000,
} as const;

const REDIS_RATE_LIMIT_SCRIPT = `
local current = redis.call("INCR", KEYS[1])
if current == 1 then
  redis.call("PEXPIRE", KEYS[1], ARGV[1])
end
local ttl = redis.call("PTTL", KEYS[1])
return { current, ttl }
`;

const nowMs = () => Date.now();

let redisFallbackLogged = false;

const toResult = (
  limit: number,
  hits: number,
  ttlMs: number,
  windowMs: number
): RateLimitResult => {
  const safeTtl = ttlMs >= 0 ? ttlMs : windowMs;
  const reset = nowMs() + safeTtl;
  const success = hits <= limit;
  const remaining = success ? Math.max(0, limit - hits) : 0;

  return {
    success,
    remaining,
    limit,
    reset,
  };
};

const applyMemoryRateLimit = ({
  identifier,
  limit,
  windowMs,
}: RateLimitConfig): RateLimitResult => {
  const currentTime = nowMs();
  const existing = memoryStore.get(identifier);

  if (!existing || existing.expiresAt <= currentTime) {
    memoryStore.set(identifier, {
      count: 1,
      expiresAt: currentTime + windowMs,
    });

    return toResult(limit, 1, windowMs, windowMs);
  }

  if (existing.count >= limit) {
    return toResult(limit, existing.count + 1, existing.expiresAt - currentTime, windowMs);
  }

  existing.count += 1;
  memoryStore.set(identifier, existing);

  return toResult(limit, existing.count, existing.expiresAt - currentTime, windowMs);
};

const applyRedisRateLimit = async (
  client: Redis,
  { identifier, limit, windowMs }: RateLimitConfig
): Promise<RateLimitResult> => {
  const key = `ratelimit:${identifier}`;

  const rawResult = (await client.eval(
    REDIS_RATE_LIMIT_SCRIPT,
    1,
    key,
    windowMs.toString()
  )) as [number | string, number | string];

  const hits = Number(rawResult?.[0] ?? 0);
  const ttlMs = Number(rawResult?.[1] ?? windowMs);

  return toResult(limit, hits, ttlMs, windowMs);
};

/**
 * Apply rate limiting to a request identifier within a given window.
 *
 * Attempts to use Redis for distributed limits. Falls back to the in-memory
 * implementation if Redis is unavailable or an error occurs.
 */
export const applyRateLimit = async (
  config: RateLimitConfig
): Promise<RateLimitResult> => {
  const redis = getRedisClient();

  if (redis) {
    try {
      return await applyRedisRateLimit(redis, config);
    } catch (error) {
      if (!redisFallbackLogged) {
        redisFallbackLogged = true;
        console.warn("Redis rate limiting failed; falling back to in-memory store.", error);
      }
    }
  }

  return applyMemoryRateLimit(config);
};
