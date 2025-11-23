/**
 * GET /api/tools/search
 *
 * Search tools by free-text query across name, description, and tags.
 * Case-insensitive substring matching; results sorted by upvotes.
 *
 * Query parameters:
 * - q: string, required, min 1 character
 * - page: integer, default 1
 * - limit: integer, default 30, max 50
 *
 * Response:
 * - 200: { data: Tool[], meta: { page, limit, total, totalPages } }
 * - 400: { error: "message" }
 */

import { NextResponse, type NextRequest } from "next/server";

import { searchTools } from "../../../../lib/queries";
import { toolSearchQuerySchema } from "../../../../lib/validation";

const BAD_REQUEST_STATUS = 400;

const formatIssues = (messages: string[]) =>
  messages.filter(Boolean).join("; ") || "Invalid request";

const withError = (message: string, status = BAD_REQUEST_STATUS) =>
  NextResponse.json({ error: message }, { status });

export async function GET(request: NextRequest) {
  const query = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = toolSearchQuerySchema.safeParse(query);

  if (!parsed.success) {
    const errorMessage = formatIssues(
      parsed.error.issues.map((issue) => issue.message)
    );
    return withError(errorMessage);
  }

  const result = await searchTools(parsed.data);

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
