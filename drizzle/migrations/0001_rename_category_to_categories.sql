-- Rename column and change type from text to text[]
-- First, create new column
ALTER TABLE "iecho_tools" ADD COLUMN "categories" text[] NOT NULL DEFAULT '{}';

-- Copy data from old column to new (converting single value to array)
UPDATE "iecho_tools" SET "categories" = ARRAY[category];

-- Drop old column and index
DROP INDEX IF EXISTS "iecho_tools_category_idx";
ALTER TABLE "iecho_tools" DROP COLUMN "category";
