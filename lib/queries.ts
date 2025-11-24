/**
 * Query layer for tools, upvotes, and search.
 *
 * This module provides database-backed queries for the tools catalog using Drizzle ORM.
 *
 * Key operations:
 * - listTools: paginated catalog with filtering and sorting
 * - searchTools: text search across name, description, tags
 * - findToolById: lookup a single tool
 * - registerUpvote: persist per-fingerprint upvotes and update aggregate counts
 */

import { createHash, randomUUID } from "crypto";

import {
  SQL,
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  inArray,
  or,
  sql,
} from "drizzle-orm";

import { db } from "./db";

import {
  collections,
  contacts,
  sharedCollections,
  tools,
  upvotes,
} from "./schema";
import type {
  CollectionRow,
  NewCollection,
  NewContact,
  NewSharedCollection,
  NewUpvote,
  SharedCollectionRow,
  ToolRow,
} from "./schema";
import type {
  ContactPayload,
  PaginatedToolResponse,
  ToolListQueryInput,
  ToolRecord,
  ToolSearchQueryInput,
} from "./validation";
type FilterableInput = Pick<
  ToolListQueryInput | ToolSearchQueryInput,
  "category" | "audience" | "tier" | "popular"
> & { ids?: string[] };

// Build SQL WHERE clauses matching the ad-hoc filters used for list/search endpoints.
const buildFilters = (filters: FilterableInput): SQL | undefined => {
  const clauses: SQL[] = [];

  const toPattern = (value: string) => `%${value.replace(/[%_]/g, "")}%`;

  if (filters.ids && filters.ids.length > 0) {
    clauses.push(inArray(tools.id, filters.ids));
  }

  if (filters.category) {
    clauses.push(
      sql<boolean>`EXISTS (SELECT 1 FROM unnest(${tools.categories}) AS category WHERE category ILIKE ${toPattern(filters.category)})`
    );
  }

  if (filters.audience) {
    clauses.push(
      sql<boolean>`EXISTS (SELECT 1 FROM unnest(${tools.audience}) AS audience WHERE audience ILIKE ${toPattern(filters.audience)})`
    );
  }

  if (filters.tier) {
    clauses.push(eq(tools.tier, filters.tier));
  }

  if (typeof filters.popular === "boolean") {
    clauses.push(eq(tools.isPopular, filters.popular));
  }

  return clauses.length ? and(...clauses) : undefined;
};

const translateSort = (sort: ToolListQueryInput["sort"]) => {
  if (sort === "name") {
    return asc(tools.name);
  }

  if (sort === "new") {
    return desc(tools.createdAt);
  }

  return desc(tools.upvotes);
};

const toToolRecord = (row: ToolRow): ToolRecord => ({
  id: row.id,
  name: row.name,
  description: row.description,
  categories: row.categories,
  tags: row.tags,
  url: row.url,
  icon: row.icon ?? null,
  audience: row.audience,
  tier: row.tier,
  isPopular: row.isPopular,
  upvotes: row.upvotes,
  createdAt: row.createdAt,
});

export const listTools = async (
  filters: ToolListQueryInput
): Promise<PaginatedToolResponse> => {
  const { page, limit, sort, ...rest } = filters;
  const { ids, ...otherFilters } = rest;
  const idList = ids
    ?.split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index);
  const filterInput: FilterableInput = {
    ...otherFilters,
    ids: idList && idList.length > 0 ? idList : undefined,
  };
  const where = buildFilters(filterInput); // Build SQL WHERE clause based on filters 
  const hasExplicitIds = Boolean(filterInput.ids?.length);
  const pageSize = hasExplicitIds ? filterInput.ids!.length : limit;

  const totalSelection = count(tools.id).as("total");
  const totalResult = await (where
    ? db.select({ total: totalSelection }).from(tools).where(where)
    : db.select({ total: totalSelection }).from(tools));


  // Calculate pagination details
  const totalNumber = Number(totalResult[0]?.total ?? 0);
  const totalPages = hasExplicitIds
    ? 1
    : Math.max(1, Math.ceil(totalNumber / pageSize));
  const safePage = hasExplicitIds ? 1 : Math.min(page, totalPages); // Ensure the requested page does not exceed total pages
  const offset = hasExplicitIds ? 0 : (safePage - 1) * pageSize; // This offset is used for pagination

  const rows = await (where
    ? db
        .select()
        .from(tools)
        .where(where)
        .orderBy(translateSort(sort))
        .limit(pageSize)
        .offset(offset)
    : db
        .select()
        .from(tools)
        .orderBy(translateSort(sort))
        .limit(pageSize)
        .offset(offset));

  return {
    items: rows.map(toToolRecord),
    total: totalNumber,
    page: safePage,
    limit: pageSize,
    totalPages,
  };
};

export const searchTools = async (
  input: ToolSearchQueryInput
): Promise<PaginatedToolResponse> => {
  const { q, page, limit, sort = "popular", ...filters } = input;
  const searchTerm = `%${q}%`;

  const textMatch = or(
    ilike(tools.name, searchTerm),
    ilike(tools.description, searchTerm),
    sql<boolean>`EXISTS (SELECT 1 FROM unnest(${tools.tags}) AS tag WHERE tag ILIKE ${searchTerm})`
  );

  const whereFilters = buildFilters(filters);
  const where = whereFilters ? and(textMatch, whereFilters) : textMatch;

  const totalSelection = count(tools.id).as("total");
  const totalResult = await db
    .select({ total: totalSelection })
    .from(tools)
    .where(where);

  const totalNumber = Number(totalResult[0]?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(totalNumber / limit));
  const safePage = Math.min(page, totalPages);
  const offset = (safePage - 1) * limit;

  const rows = await db
    .select()
    .from(tools)
    .where(where)
    .orderBy(translateSort(sort))
    .limit(limit)
    .offset(offset);

  return {
    items: rows.map(toToolRecord),
    total: totalNumber,
    page: safePage,
    limit,
    totalPages,
  };
};

export const findToolById = async (toolId: string) => {
  const rows = await db
    .select()
    .from(tools)
    .where(eq(tools.id, toolId))
    .limit(1);

  const row = rows[0];
  return row ? toToolRecord(row) : undefined;
};

const isUniqueViolation = (error: unknown): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "23505"
  );
};

export const registerUpvote = async (toolId: string, fingerprint: string) => {
  const tool = await findToolById(toolId);
  if (!tool) {
    return { added: false, tool: undefined } as const;
  }

  const existing = await db
    .select({ id: upvotes.id })
    .from(upvotes)
    .where(
      and(eq(upvotes.toolId, toolId), eq(upvotes.fingerprint, fingerprint))
    )
    .limit(1);

  if (existing.length > 0) {
    return { added: false, tool } as const;
  }

  try {
    await db
      .insert(upvotes)
      .values({ toolId, fingerprint } satisfies NewUpvote);
  } catch (error) {
    if (isUniqueViolation(error)) {
      const current = await findToolById(toolId);
      return { added: false, tool: current ?? tool } as const;
    }
    throw error;
  }

  await db
    .update(tools)
    .set({ upvotes: sql<number>`${tools.upvotes} + 1` })
    .where(eq(tools.id, toolId));

  const updatedTool = await findToolById(toolId);

  return { added: true, tool: updatedTool ?? tool } as const;
};

const normaliseToolIds = (toolIds: string[]) => {
  const seen = new Set<string>();
  const ordered: string[] = [];

  for (const rawId of toolIds) {
    const trimmed = rawId.trim();
    if (!trimmed || seen.has(trimmed)) {
      continue;
    }
    seen.add(trimmed);
    ordered.push(trimmed);
  }

  return ordered;
};

const computeToolHash = (toolIds: string[]) => {
  return createHash("sha256")
    .update([...toolIds].sort((a, b) => a.localeCompare(b)).join("|"))
    .digest("hex");
};

const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((value, index) => value === b[index]);
};

const findSharedCollectionByHash = async (toolHash: string) => {
  const rows = await db
    .select()
    .from(sharedCollections)
    .where(eq(sharedCollections.toolHash, toolHash))
    .limit(1);

  return rows[0];
};

// Ensure referenced tool ids actually exist before persisting a collection.
export const ensureAllToolIdsExist = async (toolIds: string[]) => {
  if (toolIds.length === 0) {
    return { ok: true as const, missing: [] as string[] };
  }

  const rows = await db
    .select({ id: tools.id })
    .from(tools)
    .where(inArray(tools.id, toolIds));

  const foundIds = new Set(rows.map((row) => row.id));
  const missing = toolIds.filter((id) => !foundIds.has(id));

  return { ok: missing.length === 0, missing } as const;
};

export const getCollectionByFingerprint = async (
  fingerprint: string
): Promise<CollectionRow | undefined> => {
  const rows = await db
    .select()
    .from(collections)
    .where(eq(collections.fingerprint, fingerprint))
    .limit(1);

  return rows[0];
};

export const saveCollectionForFingerprint = async (
  fingerprint: string,
  toolIds: string[]
): Promise<CollectionRow> => {
  const existing = await getCollectionByFingerprint(fingerprint);

  if (existing) {
    const [updated] = await db
      .update(collections)
      .set({ toolIds })
      .where(eq(collections.fingerprint, fingerprint))
      .returning();

    if (!updated) {
      throw new Error("Failed to update collection record");
    }

    return updated;
  }

  const [created] = await db
    .insert(collections)
    .values({
      fingerprint,
      toolIds,
    } satisfies NewCollection)
    .returning();

  if (!created) {
    throw new Error("Failed to create collection record");
  }

  return created;
};

export const createContact = async (
  input: ContactPayload
): Promise<{ id: number; createdAt: Date }> => {
  // Write contact submissions through Drizzle so entries are auditable.
  const [record] = await db
    .insert(contacts)
    .values({
      name: input.name,
      email: input.email,
      message: input.message,
    } satisfies NewContact)
    .returning({ id: contacts.id, createdAt: contacts.createdAt });

  if (!record) {
    throw new Error("Failed to create contact record");
  }

  return record;
};

export const getOrCreateSharedCollection = async (
  toolIds: string[]
): Promise<{ collection: SharedCollectionRow; cached: boolean }> => {
  const normalised = normaliseToolIds(toolIds);
  if (normalised.length === 0) {
    throw new Error("Cannot create a shared collection without tools");
  }

  const toolHash = computeToolHash(normalised);
  const existing = await findSharedCollectionByHash(toolHash);

  if (existing) {
    if (!arraysEqual(existing.toolIds, normalised)) {
      const [updated] = await db
        .update(sharedCollections)
        .set({ toolIds: normalised })
        .where(eq(sharedCollections.id, existing.id))
        .returning();

      return { collection: updated ?? existing, cached: true } as const;
    }

    return { collection: existing, cached: true } as const;
  }

  const [created] = await db
    .insert(sharedCollections)
    .values({
      id: randomUUID(),
      toolIds: normalised,
      toolHash,
    } satisfies NewSharedCollection)
    .returning();

  if (!created) {
    throw new Error("Failed to create shared collection");
  }

  return { collection: created, cached: false } as const;
};

export const getSharedCollection = async (
  id: string
): Promise<SharedCollectionRow | undefined> => {
  const rows = await db
    .select()
    .from(sharedCollections)
    .where(eq(sharedCollections.id, id))
    .limit(1);

  return rows[0];
};
