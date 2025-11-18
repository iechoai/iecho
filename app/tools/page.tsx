import { notFound } from "next/navigation";

import { listTools, searchTools } from "../../lib/queries";
import type { ToolListItem } from "../../lib/types";
import {
  mapCategoryParamToUi,
  mapCategoryUiToParam,
} from "../../lib/tool-filters";
import {
  toolListQuerySchema,
  toolSearchQuerySchema,
} from "../../lib/validation";
import { ToolsPageClient } from "../../components/tools/ToolsPageClient";

const DEFAULT_LIST_LIMIT = 30;

const normaliseQueryValue = (
  value: string | string[] | undefined
): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value ?? undefined;
};

const mapToolRecordToClient = (tool: {
  id: string;
  name: string;
  description: string;
  categories: string[];
  tags: string[];
  url: string;
  icon: string | null;
  audience: string[];
  tier: "free" | "freemium" | "paid";
  isPopular: boolean;
  upvotes: number;
  createdAt: Date;
}): ToolListItem => ({
  ...tool,
  createdAt: tool.createdAt.toISOString(),
});

interface ToolsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const params = await searchParams;

  const q = normaliseQueryValue(params?.q);
  const pageParam = normaliseQueryValue(params?.page);
  const limitParam = normaliseQueryValue(params?.limit);
  const rawCategory = normaliseQueryValue(params?.category);

  const mappedCategory = rawCategory
    ? mapCategoryUiToParam(rawCategory)
    : undefined;
  const categoryParam =
    mappedCategory ??
    (rawCategory && rawCategory !== "all" ? rawCategory : undefined);

  if (q) {
    const parsedSearch = toolSearchQuerySchema.safeParse({
      q,
      page: pageParam,
      limit: limitParam ?? String(DEFAULT_LIST_LIMIT),
      category: categoryParam,
      audience: normaliseQueryValue(params.audience),
      tier: normaliseQueryValue(params.tier),
      sort: normaliseQueryValue(params.sort),
      popular: normaliseQueryValue(params.popular),
    });

    if (!parsedSearch.success) {
      notFound();
    }

    const result = await searchTools(parsedSearch.data);
    const { popular, category, audience, sort, tier } = parsedSearch.data;
    const normalisedSort: "popular" | "name" | "new" = sort ?? "popular";
    const normalisedAudience = audience ?? "all";
    const normalisedPopular =
      typeof popular === "boolean" ? String(popular) : undefined;

    return (
      <ToolsPageClient
        initialTools={result.items.map(mapToolRecordToClient)}
        pagination={{
          page: result.page,
          totalPages: result.totalPages,
          total: result.total,
          limit: result.limit,
        }}
        filters={{
          category: mapCategoryParamToUi(category),
          audience: normalisedAudience,
          sort: normalisedSort,
          tier,
          popular: normalisedPopular,
          search: q,
        }}
        mode="search"
      />
    );
  }

  const listParams = toolListQuerySchema.safeParse({
    page: pageParam,
    limit: limitParam ?? String(DEFAULT_LIST_LIMIT),
    category: categoryParam,
    audience: normaliseQueryValue(searchParams.audience),
    tier: normaliseQueryValue(searchParams.tier),
    sort: normaliseQueryValue(searchParams.sort),
    popular: normaliseQueryValue(searchParams.popular),
  });

  if (!listParams.success) {
    notFound();
  }

  const result = await listTools(listParams.data);

  return (
    <ToolsPageClient
      initialTools={result.items.map(mapToolRecordToClient)}
      pagination={{
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
        limit: result.limit,
      }}
      filters={{
        category: mapCategoryParamToUi(listParams.data.category),
        audience: listParams.data.audience ?? "all",
        sort: listParams.data.sort,
        tier: listParams.data.tier,
        popular:
          typeof listParams.data.popular === "boolean"
            ? String(listParams.data.popular)
            : undefined,
        search: "",
      }}
      mode="browse"
    />
  );
}
