/**
 * GET /api/tools
 *
 * List tools with optional filtering and sorting.
 *
 * Query parameters:
 * - page: integer, default 1
 * - limit: integer, default 20, max 100
 * - category: string (optional, exact match)
 * - audience: string (optional)
 * - tier: enum "free" | "freemium" | "paid" (optional)
 * - sort: enum "popular" | "name" | "new" (default "popular")
 * - popular: boolean (optional)
 *
 * Response:
 * - 200: { data: Tool[], meta: { page, limit, total, totalPages } }
 * - 400: { error: "message" }
 */

import { NextResponse, type NextRequest } from "next/server";

import { listTools } from "../../../lib/queries";
import { toolListQuerySchema } from "../../../lib/validation";

const BAD_REQUEST_STATUS = 400;

const formatIssues = (messages: string[]) => {
  return messages.filter(Boolean).join("; ") || "Invalid request";
};

const withError = (message: string, status = BAD_REQUEST_STATUS) => {
  return NextResponse.json({ error: message }, { status });
};

export async function GET(request: NextRequest) {
  const query = Object.fromEntries(request.nextUrl.searchParams.entries()); // Extract query parameters from URL endpoint
  const parsed = toolListQuerySchema.safeParse(query); // Zod validation for query params

  if (!parsed.success) {
    const errorMessage = formatIssues(
      parsed.error.issues.map((issue) => issue.message)
    );
    return withError(errorMessage);
  }

  const { page, limit, ...filters } = parsed.data;
  const result = await listTools({ page, limit, ...filters });

  return NextResponse.json({
    data: result.items,
    meta: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    },
  });
}
