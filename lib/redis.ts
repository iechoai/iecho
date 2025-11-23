import Redis from "ioredis";

import { env } from "~/env";

let redisClient: Redis | null = null;
let redisInitialised = false;
let redisAvailable = true;
let loggedError = false;

const logRedisError = (error: unknown) => {
  if (loggedError) {
    return;
  }

  loggedError = true;
  console.warn(
    "Redis is unavailable; falling back to in-memory rate limiting.",
    error
  );
};

const initialiseRedisClient = () => {
  if (redisInitialised) {
    return;
  }

  if (!env.REDIS_URL) {
    redisAvailable = false;
    redisInitialised = true;
    return;
  }

  redisClient = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 1,
    enableReadyCheck: false,
    enableOfflineQueue: false,
    connectTimeout: 5000,
    retryStrategy: (times) => {
      // Don't retry indefinitely; after 1 attempt, mark as unavailable
      if (times > 1) {
        redisAvailable = false;
        return null;
      }
      return Math.min(times * 50, 1000);
    },
  });

  redisClient.on("error", (error) => {
    redisAvailable = false;
    logRedisError(error);
  });

  redisClient.on("close", () => {
    redisAvailable = false;
  });

  redisClient.on("ready", () => {
    redisAvailable = true;
  });

  redisInitialised = true;
};

export const getRedisClient = (): Redis | null => {
  initialiseRedisClient();

  if (!redisAvailable || !redisClient) {
    return null;
  }

  // Fail fast if Redis is not ready (e.g. connecting or disconnected)
  // This prevents "Stream isn't writeable" errors when enableOfflineQueue is false
  if (redisClient.status !== "ready") {
    return null;
  }

  return redisClient;
};
