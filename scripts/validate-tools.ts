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
const rawData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

const normalizedInput = {
  tools: Array.isArray(rawData.tools)
    ? rawData.tools.map((tool: Record<string, unknown>) => {
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

const fileContent = `export interface Tool {
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

fs.writeFileSync(toolsTsPath, fileContent);
console.log("✅ tools.ts updated successfully!");
