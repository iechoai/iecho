import { Search } from "lucide-react";
import { ToolCard } from "../ToolCard";
import { EmptyState } from "../EmptyState";
import type { ToolListItem } from "../../lib/types";

interface ToolsGridProps {
  tools: ToolListItem[];
  onToolPreview: (tool: ToolListItem) => void;
}

export function ToolsGrid({ tools, onToolPreview }: ToolsGridProps) {
  if (tools.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No tools found"
        description="Try selecting a different category or audience filter to discover more tools."
        showShortcutHint={true}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 auto-rows-fr overflow-hidden ">
      {tools.map((tool) => (
        <div
          key={tool.id}
          className="min-w-0 w-full"
          style={{ minWidth: "280px" }}
        >
          <ToolCard tool={tool} onPreview={() => onToolPreview(tool)} />
        </div>
      ))}
    </div>
  );
}
