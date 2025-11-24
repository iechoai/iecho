import { notFound } from "next/navigation";
import { getSharedCollection, listTools } from "../../../lib/queries";
import { CollectionClient } from "./CollectionClient";
import type { ToolListItem } from "../../../lib/types";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CollectionPageProps {
  params: Promise<{ id: string }>;
}

const mapToolRecordToClient = (tool: any): ToolListItem => ({
  ...tool,
  createdAt: tool.createdAt.toISOString(),
});

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { id } = await params;
  const collection = await getSharedCollection(id);

  if (!collection) {
    notFound();
  }

  const result = await listTools({
    ids: collection.toolIds.join(","),
    limit: Math.max(collection.toolIds.length, 1),
    sort: "popular",
    page: 1,
  });
  const fetchedById = new Map(
    result.items.map((tool) => [tool.id, mapToolRecordToClient(tool)])
  );
  const tools = collection.toolIds
    .map((toolId) => fetchedById.get(toolId))
    .filter((tool): tool is ToolListItem => Boolean(tool));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">
      <header className="bg-white dark:bg-card/50 backdrop-blur-sm border-b border-gray-200 dark:border-border px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/tools">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-muted/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-medium text-gray-900 dark:text-foreground">
                Shared Collection
              </h1>
              <p className="text-sm text-gray-600 dark:text-muted-foreground">
                {tools.length} tools
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <CollectionClient tools={tools} />
      </main>
    </div>
  );
}
