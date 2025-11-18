/**
 * Request and payload validation schemas for all API endpoints.
 *
 * - Tool listing & search validation ensures safe pagination and filtering
 * - Upvote payload validation enforces toolId presence
 * - Contact payload validation enforces name, email, and message constraints
 *
 * All schemas use `.strict()` where appropriate to reject unexpected fields.
 */

import { z } from "zod";

/**
 * Transform string boolean values ("true"/"false") to actual booleans.
 * Used in query parameter parsing since all URL params arrive as strings.
 */
const mapBooleanLike = (value: string | boolean | undefined) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalised = value.trim().toLowerCase();

    if (normalised === "true") {
      return true;
    }

    if (normalised === "false") {
      return false;
    }
  }

  return undefined;
};

/**
 * Validation schema for GET /api/tools query parameters.
 * Supports filtering by category, audience, tier, and popularity.
 * Supports sorting by popular (upvotes), name, or new.
 */
const sharedFilterFields = {
  category: z.string().trim().min(1).optional(),
  audience: z.string().trim().min(1).optional(),
  tier: z.enum(["free", "freemium", "paid"]).optional(),
  sort: z.enum(["popular", "name", "new"]).default("popular"),
  popular: z
    .union([z.string(), z.boolean()])
    .optional()
    .transform(mapBooleanLike),
} as const;

export const toolListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  ...sharedFilterFields,
});

/**
 * Validation schema for GET /api/tools/search query parameters.
 * Enforces at least 1 character search query; limits results to 50 per page.
 */
export const toolSearchQuerySchema = z
  .object({
    q: z.string().trim().min(1, "Query must be at least one character"),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(30),
    ...sharedFilterFields,
  })
  .strict();

/**
 * Validation schema for POST /api/upvote request body.
 * Enforces non-empty toolId string; rejects unknown fields.
 */
export const upvotePayloadSchema = z
  .object({
    toolId: z.string().trim().min(1, "toolId is required"),
  })
  .strict();

/**
 * Validation schema for POST /api/contact request body.
 * Enforces name (1-120 chars), valid email, and message (10-2000 chars).
 * Rejects unknown fields; trims whitespace from all inputs.
 */
export const contactPayloadSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(120),
    email: z.string().trim().email("Email must be valid"),
    message: z
      .string()
      .trim()
      .min(5, "Message must be at least 5 characters")
      .max(2000),
  })
  .strict();

export const collectionUpdateSchema = z
  .object({
    toolIds: z
      .array(z.string().trim().min(1, "Tool ID cannot be empty"))
      // Keep collection payloads reasonably sized to prevent abuse.
      .max(50, "Cannot save more than 50 tools"),
  })
  .strict();

export const toolRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  url: z.string().url(),
  icon: z.string().nullable(),
  audience: z.array(z.string()),
  tier: z.enum(["free", "freemium", "paid"]),
  isPopular: z.boolean(),
  upvotes: z.number().nonnegative(),
  createdAt: z.date(),
});

export const paginatedToolResponseSchema = z.object({
  items: z.array(toolRecordSchema),
  total: z.number().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().positive(),
});

export type ToolListQueryInput = z.infer<typeof toolListQuerySchema>;
export type ToolSearchQueryInput = z.infer<typeof toolSearchQuerySchema>;
export type UpvotePayload = z.infer<typeof upvotePayloadSchema>;
export type ContactPayload = z.infer<typeof contactPayloadSchema>;
export type CollectionUpdatePayload = z.infer<typeof collectionUpdateSchema>;
export type ToolRecord = z.infer<typeof toolRecordSchema>;
export type PaginatedToolResponse = z.infer<typeof paginatedToolResponseSchema>;
