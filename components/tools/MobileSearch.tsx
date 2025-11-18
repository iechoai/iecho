import { Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Input } from "../ui/input";
import type { ToolListItem } from "../../lib/types";

interface MobileSearchProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  tools: ToolListItem[];
  onToolSelect: (tool: ToolListItem) => void;
}

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
};
export function MobileSearch({
  isOpen,
  onOpenChange,
  searchQuery,
  onSearchChange,
  tools,
  onToolSelect,
}: MobileSearchProps) {
  const normalizedQuery = searchQuery.toLowerCase();
  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(normalizedQuery) ||
      tool.description.toLowerCase().includes(normalizedQuery) ||
      tool.categories.some((category) =>
        category.toLowerCase().includes(normalizedQuery)
      )
  );

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-auto">
        <SheetHeader>
          <SheetTitle>Search Tools</SheetTitle>
          <SheetDescription>
            Search through all available tools by name or category
          </SheetDescription>
        </SheetHeader>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-gray-50 dark:bg-input-background border-gray-200 dark:border-border focus:border-[#0F5F6A] dark:focus:border-primary focus:ring-[#0F5F6A] dark:focus:ring-primary"
            autoFocus
          />
        </div>
        {searchQuery && (
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            <p className="text-sm text-muted-foreground mb-3">
              {filteredTools.length} results found
            </p>
            <div className="space-y-2">
              {filteredTools.slice(0, 5).map((tool) => {
                const domain = getDomain(tool.url);
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      onToolSelect(tool);
                      onOpenChange(false);
                    }}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {tool.url ? (
                        <div className="w-10 h-10  dark:from-primary dark:to-primary/90 rounded-lg flex items-center justify-center text-white dark:text-primary-foreground text-xs font-medium shadow-md shadow-[#0F5F6A]/20 dark:shadow-primary/20 flex-shrink-0">
                          <img
                            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`}
                            alt={`${tool.name} logo`}
                            className="w-10 h-10 rounded-lg object-contain"
                            onError={(e) => {
                              // Show fallback icon when favicon fails to load
                              console.log(
                                "Favicon load error, using fallback icon."
                              );
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 dark:from-muted dark:to-muted/80 rounded-lg flex items-center justify-center text-white dark:text-muted-foreground text-xs font-medium shadow-md flex-shrink-0">
                          {tool.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-foreground truncate">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-muted-foreground line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
