import "dotenv/config";
import { db } from "../lib/db";
import { sql } from "drizzle-orm";

async function checkAndFix() {
  console.log("Checking table structure...\n");

  try {
    // Check if categories column exists
    const checkCat = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'iecho_tools' 
      AND column_name = 'categories'
    `);

    if (checkCat && checkCat.length > 0) {
      console.log("✅ Migration already applied!");
      process.exit(0);
    }

    console.log("❌ Running migration manually...\n");

    console.log("1. Adding categories column...");
    await db.execute(
      sql`ALTER TABLE iecho_tools ADD COLUMN categories text[] NOT NULL DEFAULT '{}'`
    );

    console.log("2. Copying data from category to categories...");
    await db.execute(sql`UPDATE iecho_tools SET categories = ARRAY[category]`);

    console.log("3. Dropping old index...");
    await db.execute(sql`DROP INDEX IF EXISTS iecho_tools_category_idx`);

    console.log("4. Dropping old category column...");
    await db.execute(sql`ALTER TABLE iecho_tools DROP COLUMN category`);

    console.log("\n✅ Migration complete!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }

  process.exit(0);
}

checkAndFix();
