/**
 * POST /api/upvote
 *
 * Record an upvote for a tool by the requesting client (identified via fingerprint).
 * Enforces rate limiting: 10 upvotes per hour per fingerprint.
 * Deduplicates upvotes: same fingerprint voting multiple times counts as one.
 *
 * Request body:
 * - toolId: string, required
 *
 * Response headers:
 * - X-RateLimit-Limit: max requests per window
 * - X-RateLimit-Remaining: requests left before limit
 * - X-RateLimit-Reset: unix timestamp when limit resets
 *
 * Responses:
 * - 200: { data: Tool, meta: { added: boolean } }
 * - 400: { error: "message" } (validation error)
 * - 404: { error: "Tool not found" }
 * - 429: { error: "Rate limit exceeded" } (too many requests)
 */

import { NextResponse, type NextRequest } from "next/server";

import { getClientFingerprint } from "../../../lib/fingerprint";
import {
  applyRateLimit,
  RATE_LIMIT_WINDOWS,
  type RateLimitResult,
} from "../../../lib/rate-limit";
import { findToolById, registerUpvote } from "../../../lib/queries";
import { upvotePayloadSchema } from "../../../lib/validation";

const BAD_REQUEST_STATUS = 400;
const NOT_FOUND_STATUS = 404;
const RATE_LIMIT_STATUS = 429;

const formatIssues = (messages: string[]) =>
  messages.filter(Boolean).join("; ") || "Invalid request";

const respondWithError = (message: string, status = BAD_REQUEST_STATUS) =>
  NextResponse.json({ error: message }, { status });

/**
 * Attach standard rate limit headers to a response.
 */
const attachRateLimitHeaders = (
  response: NextResponse,
  result: RateLimitResult
) => {
  response.headers.set("X-RateLimit-Limit", result.limit.toString());
  response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
  response.headers.set("X-RateLimit-Reset", result.reset.toString());
  return response;
};

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    return respondWithError("Invalid JSON payload");
  }

  const parsed = upvotePayloadSchema.safeParse(body);

  if (!parsed.success) {
    const errorMessage = formatIssues(
      parsed.error.issues.map((issue) => issue.message)
    );
    return respondWithError(errorMessage);
  }

  const tool = await findToolById(parsed.data.toolId);

  if (!tool) {
    return respondWithError("Tool not found", NOT_FOUND_STATUS);
  }

  const fingerprint = getClientFingerprint(request);
  const rateLimitKey = `upvote:${fingerprint}`;
  const rateLimitResult = await applyRateLimit({
    identifier: rateLimitKey,
    limit: 10,
    windowMs: RATE_LIMIT_WINDOWS.TEN_PER_HOUR,
  });

  if (!rateLimitResult.success) {
    return attachRateLimitHeaders(
      respondWithError("Rate limit exceeded", RATE_LIMIT_STATUS),
      rateLimitResult
    );
  }

  // Wait for Drizzle to persist/deduplicate the vote before responding.
  const upvoteResult = await registerUpvote(tool.id, fingerprint);

  const response = NextResponse.json({
    data: upvoteResult.tool,
    meta: {
      added: upvoteResult.added,
    },
  });

  return attachRateLimitHeaders(response, rateLimitResult);
}
