/**
 * Client fingerprinting utilities for rate limiting and upvote deduplication.
 *
 * Generates a SHA256 hash of IP (via x-forwarded-for or req.ip), user-agent,
 * and accept-language headers. Falls back to "anonymous" if critical headers
 * are missing or if hashing fails.
 *
 * **Note**: This is a basic fingerprinting strategy suitable for MVP.
 * BUG: implement a dedicated fingerprinting libraries
 * or migrating to user-based auth for more reliable identification.
 */

import { createHash } from "crypto";
import { type NextRequest } from "next/server";

const FALLBACK_FINGERPRINT = "anonymous";

/**
 * Normalise header values by trimming and lowercasing.
 * Returns empty string if the value is null or undefined.
 */
const normaliseHeader = (value: string | null) =>
  value?.trim().toLowerCase() ?? "";

/**
 * Generate a unique fingerprint for the requesting client.
 *
 * @returns SHA256 hash of (IP | user-agent | accept-language), or "anonymous" on error.
 */
export const getClientFingerprint = (req: NextRequest): string => {
// it takes the request object as input, then extracts and normalizes the relevant headers 
// (x-forwarded-for, user-agent, accept-language). If both the x-forwarded-for and user-agent headers are missing,
// it returns the fallback fingerprint "anonymous". Otherwise, it concatenates the normalized header values

  try {
    const forwardedFor = normaliseHeader(
      req.headers.get("x-forwarded-for") ?? null
    );
    const userAgent = normaliseHeader(req.headers.get("user-agent"));
    const acceptLanguage = normaliseHeader(req.headers.get("accept-language"));

    if (!forwardedFor && !userAgent) {
      return FALLBACK_FINGERPRINT;
    }

    const data = `${forwardedFor}|${userAgent}|${acceptLanguage}`;
    return createHash("sha256").update(data).digest("hex");
  } catch (error) {
    console.warn("Failed to build request fingerprint", error);
    return FALLBACK_FINGERPRINT;
  }
};
