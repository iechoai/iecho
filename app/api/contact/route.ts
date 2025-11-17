/**
 * POST /api/contact
 *
 * Store a contact form submission with rate limiting.
 * Enforces: 5 submissions per hour per fingerprint.
 * Submissions are stored in-memory (MVP); database persistence is planned soon.
 *
 * Request body:
 * - name: string (1-120 chars)
 * - email: string (valid email format)
 * - message: string (10-2000 chars)
 *
 * Response headers:
 * - X-RateLimit-Limit: max requests per window
 * - X-RateLimit-Remaining: requests left before limit
 * - X-RateLimit-Reset: unix timestamp when limit resets
 *
 * Responses:
 * - 202: { data: { id: UUID, createdAt: ISO8601 } } (accepted for processing)
 * - 400: { error: "message" } (validation error)
 * - 429: { error: "Rate limit exceeded" } (too many requests)
 */

import * as React from "react";
import { NextResponse, type NextRequest } from "next/server";

import { getClientFingerprint } from "../../../lib/fingerprint";
import {
  applyRateLimit,
  RATE_LIMIT_WINDOWS,
  type RateLimitResult,
} from "../../../lib/rate-limit";
import { createContact } from "../../../lib/queries";
import { contactPayloadSchema } from "../../../lib/validation";
import { ContactNotificationEmail } from "../../../lib/email/contact-notification";
import { resendClient, logResendError } from "../../../lib/resend";
import { env } from "~/env";

const BAD_REQUEST_STATUS = 400;
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

  const parsed = contactPayloadSchema.safeParse(body); // zod schema validation

  if (!parsed.success) {
    const errorMessage = formatIssues(
      parsed.error.issues.map((issue) => issue.message)
    );
    return respondWithError(errorMessage);
  }

  const fingerprint = getClientFingerprint(request);
  const rateLimitKey = `contact:${fingerprint}`;
  const rateLimitResult = await applyRateLimit({
    identifier: rateLimitKey,
    limit: 5,
    windowMs: RATE_LIMIT_WINDOWS.TEN_PER_HOUR,
  });

  if (!rateLimitResult.success) {
    return attachRateLimitHeaders(
      respondWithError("Rate limit exceeded", RATE_LIMIT_STATUS),
      rateLimitResult
    );
  }

  // Persist submissions via Drizzle so contacts survive server restarts.
  const record = await createContact(parsed.data);

  try {
    // Notify the admin mailbox using Resend; failures are logged for follow-up but do not block the user.
    const { error } = await resendClient.emails.send({
      from: "iecho notifications <no-reply@iecho.app>",
      to: env.ADMIN_EMAIL,
      replyTo: parsed.data.email,
      subject: `New contact from ${parsed.data.name}`,
      react: React.createElement(ContactNotificationEmail, {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
        submittedAtIso: record.createdAt.toISOString(),
      }),
    });

    if (error) {
      logResendError(error, "contact-notification-email");
    }
  } catch (sendError) {
    logResendError(sendError, "contact-notification-email");
  }

  const response = NextResponse.json(
    {
      data: {
        id: record.id,
        createdAt: record.createdAt.toISOString(),
      },
    },
    { status: 202 }
  );

  return attachRateLimitHeaders(response, rateLimitResult);
}
