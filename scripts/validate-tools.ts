import fs from "fs";
import path from "path";
import { z } from "zod";

const RawToolSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  categories: z.array(z.string()).min(1),
  tags: z.array(z.string()),
  url: z.string().url(),
  icon: z.string().optional(),
  audience: z.array(z.string()),
  tier: z.enum(["free", "freemium", "paid"]),
  isPopular: z.boolean().optional(),
});

const ToolSchema = RawToolSchema.superRefine((tool, ctx) => {
  const trimmedCategories = tool.categories
    .map((value) => value.trim())
    .filter(Boolean);

  if (trimmedCategories.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["categories"],
      message: "Each tool must provide at least one category.",
    });
  }
}).transform(({ categories, isPopular, ...rest }) => {
  const normalizedCategories = Array.from(
    new Set(
      categories
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

const jsonPath = path.resolve("data/tools.json");

let fileContent: string;
try {
  fileContent = fs.readFileSync(jsonPath, "utf-8");
} catch (error) {
  console.error("❌ Error reading tools.json:", error);
  process.exit(1);
}

const sanitizedContent = fileContent.replace(/^\uFEFF/, "");

if (!sanitizedContent.trim()) {
  console.error("❌ Error: tools.json is empty");
  process.exit(1);
}

let rawData: unknown;
try {
  rawData = JSON.parse(sanitizedContent);
} catch (error) {
  if (error instanceof SyntaxError) {
    // Helps pinpoint JSON issues like stray commas or encoding artifacts
    console.error("❌ Error: tools.json contains invalid JSON");
    console.error("Details:", error.message);
    const preview = sanitizedContent.slice(0, 200).replace(/\s+/g, " ");
    console.error("Preview:", preview);
  } else {
    console.error("❌ Unexpected error parsing tools.json:", error);
  }
  process.exit(1);
}

if (!rawData || typeof rawData !== "object") {
  console.error("❌ Error: tools.json must export an object at the root level");
  process.exit(1);
}

const toolsRoot = (rawData as { tools?: unknown }).tools;

const normalizedInput = {
  tools: Array.isArray(toolsRoot)
    ? toolsRoot.map((tool: Record<string, unknown>) => {
        const source =
          tool["categories"] ?? tool["category"];

        const categoriesArray = Array.isArray(source)
          ? source
          : typeof source === "string"
          ? [source]
          : [];

        const { category, categories, ...rest } = tool as {
          category?: unknown;
          categories?: unknown;
          [key: string]: unknown;
        };

        return {
          ...rest,
          categories: categoriesArray,
        };
      })
    : [],
};

const result = ToolsFileSchema.safeParse(normalizedInput);

if (!result.success) {
  console.error("Validation failed:", result.error.errors);
  process.exit(1);
}

console.log("✅ JSON validated successfully!");

const normalizedTools = result.data.tools;

fs.writeFileSync(
  jsonPath,
  JSON.stringify({ tools: normalizedTools }, null, 2)
);
console.log("✅ tools.json normalized successfully!");

const toolsTsPath = path.resolve("data/tools.ts");

const toolsWithUpvotes = normalizedTools.map((tool) => ({
  ...tool,
  upvotes: 0,
}));

const toolsFileContent = `export interface Tool {
  id: string;
  name: string;
  description: string;
  categories: string[];
  tags: string[];
  url: string;
  icon?: string;
  audience: string[];
  tier: 'free' | 'freemium' | 'paid';
  isPopular?: boolean;
  upvotes: number;
}

export const tools: Tool[] = ${JSON.stringify(toolsWithUpvotes, null, 2)};`;

fs.writeFileSync(toolsTsPath, toolsFileContent);
console.log("✅ tools.ts updated successfully!");
