-- Ensure pgcrypto is available for SHA-256 hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Add the new hash column
ALTER TABLE "iecho_shared_collections" ADD COLUMN "tool_hash" text;

-- Backfill hashes for existing collections using the sorted, de-duplicated tool ids
UPDATE "iecho_shared_collections" AS target
SET "tool_hash" = encode(
  digest(
    COALESCE(
      array_to_string(
        COALESCE(
          (
            SELECT array_agg(tool_id ORDER BY tool_id)
            FROM (
              SELECT DISTINCT tool_id
              FROM unnest(target.tool_ids) AS tool_ids(tool_id)
            ) AS ordered
          ),
          ARRAY[]::text[]
        ),
        '|'  -- Deterministic delimiter
      ),
      ''
    )::bytea,
    'sha256'
  ),
  'hex'
);

-- Enforce non-null constraint now that data is backfilled
ALTER TABLE "iecho_shared_collections" ALTER COLUMN "tool_hash" SET NOT NULL;

-- Add a unique index to guarantee one record per unique tool set
CREATE UNIQUE INDEX IF NOT EXISTS "iecho_shared_collections_tool_hash_idx"
ON "iecho_shared_collections" ("tool_hash");
