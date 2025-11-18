/**
 * sync-tools.ts
 *
 * Reads tools.json and syncs entries to the Postgres database.
 * This script upserts tool records: existing tools are updated, new ones are inserted.
 * Run after validating tools.json with validate-tools.ts.
 *
 * Usage:
 *   pnpm tsx scripts/sync-tools.ts
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { tools } from "../drizzle/schema";
import { z } from "zod";
import { env } from "~/env";
import { db } from "../lib/db";

// Load database connection URL from environment variables
const DATABASE_URL = env.DATABASE_URL;

//Define the schema matching the structure of tools.json
const RawToolSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string().optional(),
  categories: z.union([z.string(), z.array(z.string())]).optional(),
  tags: z.array(z.string()),
  url: z.string().url(),
  icon: z.string().optional(),
  audience: z.array(z.string()),
  tier: z.enum(["free", "freemium", "paid"]),
  isPopular: z.boolean().optional(),
});

export const ToolSchema = RawToolSchema.superRefine((tool, ctx) => {
  const categories = tool.categories ?? tool.category;
  const categoriesArray = Array.isArray(categories)
    ? categories
    : categories
    ? [categories]
    : [];
  const trimmedCategories = categoriesArray
    .map((value) => value.trim())
    .filter(Boolean);

  if (trimmedCategories.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["categories"],
      message: "Each tool must provide at least one category.",
    });
  }
}).transform(({ category, categories, isPopular, ...rest }) => {
  const source = categories ?? category!;
  const normalizedCategories = Array.from(
    new Set(
      (Array.isArray(source) ? source : [source])
        .map((value) => value.trim())
        .filter(Boolean)
    )
  );

  return {
    ...rest,
    categories: normalizedCategories,
    isPopular: isPopular ?? false,
  };
});

const ToolsFileSchema = z.object({
  tools: z.array(ToolSchema),
});

async function syncTools() {
  console.log("🔄 Starting tool sync to database...\n");

  // Read and validate tools.json
  const jsonPath = path.resolve("data/tools.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ File not found: ${jsonPath}`);
    process.exit(1);
  }

  const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const result = ToolsFileSchema.safeParse(jsonData);

  if (!result.success) {
    console.error("❌ Validation failed:", result.error.errors);
    process.exit(1);
  }

  console.log(
    `✅ Validated ${result.data.tools.length} tools from tools.json\n`
  );
  // connect to DATABASE

  try {
    let insertedCount = 0;

    // process tools in batches to aviod overwhelming the database
    const BATCH_SIZE = 50; /// the number of tools to process in each batch
    const toolsData = result.data.tools;

    for (let i = 0; i < toolsData.length; i += BATCH_SIZE) {
      const batch = toolsData.slice(i, i + BATCH_SIZE);

      for (const tool of batch) {
        console.log(`➡️  Processing tool: ${tool.id} - ${tool.name}`);
        try {
          // Use insert with onConflictDoUpdate to upsert
          await db
            .insert(tools)
            .values({
              id: tool.id,
              name: tool.name,
              description: tool.description,
              categories: tool.categories,
              tags: tool.tags,
              url: tool.url,
              icon: tool.icon ?? null,
              audience: tool.audience,
              tier: tool.tier,
              isPopular: tool.isPopular ?? false,
              upvotes: 0,
            })
            .onConflictDoUpdate({
              target: tools.id,
              set: {
                name: tool.name,
                description: tool.description,
                categories: tool.categories,
                tags: tool.tags,
                url: tool.url,
                icon: tool.icon ?? null,
                audience: tool.audience,
                tier: tool.tier,
                isPopular: tool.isPopular ?? false,
                // Note: upvotes are NOT overwritten to preserve user votes
              },
            });

          insertedCount++;
        } catch (error) {
          console.error(`❌ Error processing tool ${tool.id}:`, error);
          throw error;
        }
      }
      // This is used calculate the number of batches processed
      console.log(
        `✅ Processed batch ${Math.floor(i / BATCH_SIZE) + 1} (${Math.min(
          i + BATCH_SIZE,
          toolsData.length
        )}/${toolsData.length} tools)`
      );
    }
    console.log(`\n✅ Sync complete! Processed ${insertedCount} tools`);
    console.log("   (Note: Upvote counts from database were preserved)\n");
  } catch (error) {
    console.error("❌ Error during tool sync:", error);
    process.exit(1);
  }
}

syncTools();