/**
 * import-tools.ts
 *
 * Fresh import of tools.json into the database.
 * This script DELETES existing tools and performs a clean import.
 * Use sync-tools.ts if you want to preserve existing upvote counts.
 *
 * Usage:
 *   pnpm tsx scripts/import-tools.ts
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { env } from "~/env";
import { db } from "../lib/db";
import { tools } from "../drizzle/schema";
import { ToolSchema } from "./sync-tools";

const DATABASE_URL = env.DATABASE_URL;

// Define the schema matching the structure of tools.json
const ToolsFileSchema = z.object({
  tools: z.array(ToolSchema),
});

async function importTools() {
  console.log("🔄 Starting fresh tool import to database...\n");
  console.warn(
    "⚠️  WARNING: This will DELETE all existing tools and upvotes!\n"
  );

  const jsonPath = path.resolve("data/tools.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ File not found: ${jsonPath}`);
    process.exit(1); // Exit with error
  }

  const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8")); // checks if it's a valid json
  const result = ToolsFileSchema.safeParse(jsonData);

  if (!result.success) {
    console.error("❌ Validation failed:", result.error.errors);
    process.exit(1); // Exit with error
  }

  console.log(
    `✅ Validated ${result.data.tools.length} tools from tools.json\n`
  );

  try {
    // Delete all existing tools (cascade will remove upvotes)
    console.log("🗑️  Deleting existing tools...");
    await db.delete(tools);
    console.log("✅ Existing tools deleted\n");

    let insertedCount = 0;

    // Insert tools in batches
    const BATCH_SIZE = 50;
    const toolsData = result.data.tools;

    for (let i = 0; i < toolsData.length; i += BATCH_SIZE) {
      const batch = toolsData.slice(i, i + BATCH_SIZE);

      const values = batch.map((tool) => ({
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
        upvotes: 0, // Always start at 0; real upvotes come from user interactions
      }));

      await db.insert(tools).values(values);
      insertedCount += values.length;

      console.log(
        `✅ Imported batch ${Math.floor(i / BATCH_SIZE) + 1} (${Math.min(
          i + BATCH_SIZE,
          toolsData.length
        )}/${toolsData.length} tools)`
      );
    }

    console.log(`\n✅ Import complete! Inserted ${insertedCount} tools\n`);
  } catch (error) {
    console.error("❌ Error deleting existing tools:", error);
    process.exit(1); // Exit with error
  }
}

importTools();
