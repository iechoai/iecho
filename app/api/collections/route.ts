/**
 * GET/PUT /api/collections
 *
 * Persists saved tool collections per client fingerprint.
 * GET returns the caller's collection; PUT replaces the stored tool list.
 * PUT is limited to 20 requests per hour per fingerprint.
 */

import { NextResponse, type NextRequest } from "next/server";

import { getClientFingerprint } from "../../../lib/fingerprint";
import {
  applyRateLimit,
  RATE_LIMIT_WINDOWS,
  type RateLimitResult,
} from "../../../lib/rate-limit";
import {
  ensureAllToolIdsExist,
  getCollectionByFingerprint,
  saveCollectionForFingerprint,
} from "../../../lib/queries";
import { collectionUpdateSchema } from "../../../lib/validation";

export const dynamic = "force-dynamic";

const BAD_REQUEST_STATUS = 400;
const RATE_LIMIT_STATUS = 429;
const COLLECTION_RATE_LIMIT = 20;

const formatIssues = (messages: string[]) =>
  messages.filter(Boolean).join("; ") || "Invalid request";

const respondWithError = (message: string, status = BAD_REQUEST_STATUS) =>
  NextResponse.json({ error: message }, { status });

const attachRateLimitHeaders = (
  response: NextResponse,
  result: RateLimitResult
) => {
  // The headers is used for informing the client about their current rate limit status
  response.headers.set("X-RateLimit-Limit", result.limit.toString());
  response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
  response.headers.set("X-RateLimit-Reset", result.reset.toString());
  return response;
};

// The deduplication helper to ensure collections do not contain duplicate tool IDs.
// it is used in the PUT handler below. to ensure that the saved collections are clean.
const dedupeToolIds = (toolIds: string[]) => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const toolId of toolIds) {
    if (!seen.has(toolId)) {
      seen.add(toolId);
      result.push(toolId);
    }
  }

  return result;
};

// This GET handler retrieves the collection associated with the client's fingerprint.
// if no collection exists, it returns null values. The collection includes the tool IDs and creation timestamp.
export async function GET(request: NextRequest) {
  const fingerprint = getClientFingerprint(request);
  const collection = await getCollectionByFingerprint(fingerprint);

  return NextResponse.json({
    data: {
      id: collection?.id ?? null,
      toolIds: collection?.toolIds ?? [],
      createdAt: collection?.createdAt
        ? collection.createdAt.toISOString()
        : null,
    },
  });
}

// This PUT handler replaces the stored tool list for the client's collection.
// It enforces rate limiting and validates the payload and tool IDs.
export async function PUT(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    return respondWithError("Invalid JSON payload");
  }

  const parsed = collectionUpdateSchema.safeParse(body);

  if (!parsed.success) {
    const errorMessage = formatIssues(
      parsed.error.issues.map((issue) => issue.message)
    );
    return respondWithError(errorMessage);
  }

  const fingerprint = getClientFingerprint(request);
  const rateLimitKey = `collections:${fingerprint}`;
  const rateLimitResult = await applyRateLimit({
    identifier: rateLimitKey,
    limit: COLLECTION_RATE_LIMIT,
    windowMs: RATE_LIMIT_WINDOWS.TEN_PER_HOUR,
  });

  if (!rateLimitResult.success) {
    return attachRateLimitHeaders(
      respondWithError("Rate limit exceeded", RATE_LIMIT_STATUS),
      rateLimitResult
    );
  }

  const toolIds = dedupeToolIds(parsed.data.toolIds);
  const validation = await ensureAllToolIdsExist(toolIds);

  if (!validation.ok) {
    return attachRateLimitHeaders(
      respondWithError(
        `Unknown tool ids: ${validation.missing.join(", ")}`,
        BAD_REQUEST_STATUS
      ),
      rateLimitResult
    );
  }

  const record = await saveCollectionForFingerprint(fingerprint, toolIds);

  const response = NextResponse.json({
    data: {
      id: record.id,
      toolIds: record.toolIds,
      createdAt: record.createdAt.toISOString(),
    },
  });

  return attachRateLimitHeaders(response, rateLimitResult);
}
