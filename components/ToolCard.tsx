import { ExternalLink, Heart, Info, ChevronUp, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { openExternalUrl } from "../lib/dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useSavedTools } from "./SavedToolsContext";
import { useUpvotes } from "./UpvoteContext";
import type { ToolListItem } from "../lib/types";

const getDomain = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (e) {
    return "";
  }
};

interface ToolCardProps {
  tool: ToolListItem;
  showMinimal?: boolean;
  onPreview?: () => void;
}

export function ToolCard({
  tool,
  showMinimal = false,
  onPreview,
}: ToolCardProps) {
  const { toggleSavedTool, isToolSaved } = useSavedTools();
  const { toggleUpvote, isToolUpvoted } = useUpvotes();
  const saved = isToolSaved(tool.id);
  const upvoted = isToolUpvoted(tool.id);
  const [optimisticUpvote, setOptimisticUpvote] = useState(false);

  const handleUpvote = async () => {
    if (upvoted) {
      toast.info("You have already upvoted this tool.");
      return;
    }
    setOptimisticUpvote(true);
    await toggleUpvote(tool.id);
  };

  // Calculate display upvotes:
  // If we just upvoted optimistically, add 1 to the server count.
  // Otherwise, trust the server count (which should include our vote if we voted previously).
  const displayUpvotes = tool.upvotes + (optimisticUpvote ? 1 : 0);

  const domain = getDomain(tool.url);

  if (showMinimal) {
    return (
      <div
        className="relative bg-white/90 dark:bg-card/90 backdrop-blur-md border border-white/20 dark:border-border/30 rounded-xl p-4 shadow-md shadow-black/5 dark:shadow-black/15 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/20 hover:bg-white/95 dark:hover:bg-card/95 transition-all duration-200 hover:scale-[1.01] group"
        id={`card-${tool.id}`}
      >
        {/* Preview Icon - Top Left */}
        <button
          onClick={onPreview}
          className="absolute top-3 left-3 p-1.5 rounded-full transition-all duration-200 text-gray-500 dark:text-muted-foreground bg-white/80 dark:bg-muted/30 backdrop-blur-sm opacity-0 group-hover:opacity-80 border border-gray-200/50 dark:border-border/30 hover:opacity-100 hover:text-[#0F5F6A] dark:hover:text-primary hover:scale-105"
          title="Preview Tool"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src={`https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`}
                alt={`${tool.name} logo`}
                className="w-10 h-10 rounded-lg object-contain"
                onError={(e) => {
                  // Show fallback icon when favicon fails to load
                  const fallbackIcon = e.currentTarget.nextElementSibling;
                  if (fallbackIcon) {
                    (fallbackIcon as HTMLElement).style.display = "flex";
                  }
                  e.currentTarget.style.display = "none";
                }}
              />
              {tool.icon ? (
                <div className="w-10 h-10 bg-gradient-to-br from-[#0F5F6A] to-[#0F5F6A]/90 dark:from-primary dark:to-primary/90 rounded-lg flex items-center justify-center text-white dark:text-primary-foreground text-xs font-medium shadow-md shadow-[#0F5F6A]/20 dark:shadow-primary/20 hidden">
                  {tool.icon}
                </div>
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-muted dark:to-muted/80 rounded-lg flex items-center justify-center shadow-inner hidden">
                  <Info className="w-4 h-4 text-gray-500 dark:text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 dark:text-card-foreground text-sm truncate">
                {tool.name}
              </h3>
              {tool.tier === "paid" && (
                <Badge
                  variant="outline"
                  className="text-xs h-4 px-1 mt-1 bg-amber-50/80 dark:bg-yellow-500/10 border-amber-200/50 dark:border-yellow-500/30 text-amber-700 dark:text-yellow-400 backdrop-blur-sm"
                >
                  Paid
                </Badge>
              )}
              {tool.tier === "freemium" && (
                <Badge
                  variant="outline"
                  className="text-xs h-4 px-1 mt-1 bg-blue-50/80 dark:bg-blue-500/10 border-blue-200/50 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 backdrop-blur-sm"
                >
                  Freemium
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={handleUpvote}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${
                upvoted
                  ? "bg-[#B6FF3D]/20 dark:bg-primary/20 text-[#0F5F6A] dark:text-primary border border-[#B6FF3D]/30 dark:border-primary/30"
                  : "bg-white/80 dark:bg-muted/30 text-gray-500 dark:text-muted-foreground hover:bg-[#B6FF3D]/10 dark:hover:bg-primary/10 hover:text-[#0F5F6A] dark:hover:text-primary border border-gray-200/50 dark:border-border/30"
              } hover:scale-105 backdrop-blur-sm`}
            >
              <ChevronUp className="w-3 h-3" />
              <span className="text-xs font-medium">
                {displayUpvotes > 999
                  ? `${Math.floor(displayUpvotes / 1000)}k`
                  : displayUpvotes}
              </span>
            </button>
            <button
              onClick={() => toggleSavedTool(tool.id)}
              className={`p-1.5 rounded-full transition-all duration-200 ${
                saved
                  ? "text-red-500 dark:text-red-400 bg-red-50/80 dark:bg-red-500/10 backdrop-blur-sm"
                  : "text-gray-400 dark:text-muted-foreground hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-500/10 hover:backdrop-blur-sm"
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
            </button>
            <Button
              className="bg-[#0F5F6A] dark:bg-primary hover:bg-[#0F5F6A]/90 dark:hover:bg-primary/90 text-white dark:text-primary-foreground h-7 px-3 text-xs shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => openExternalUrl(tool.url)}
            >
              Open
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-full flex flex-col min-w-0 max-w-md mx-auto w-full bg-white/90 dark:bg-card/90 backdrop-blur-md border border-white/20 dark:border-border/30 rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/25 hover:bg-white/95 dark:hover:bg-card/95 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group"
      id={`card-${tool.id}`}
    >
      {/* Preview Icon - Top Left */}
      <button
        onClick={onPreview}
        className="absolute top-4 left-4 z-10 p-2 rounded-full transition-all duration-200 text-gray-500 dark:text-muted-foreground bg-white/80 dark:bg-muted/30 backdrop-blur-sm opacity-0 group-hover:opacity-80 border border-gray-200/50 dark:border-border/30 hover:opacity-100 hover:text-[#0F5F6A] dark:hover:text-primary hover:scale-105"
        title="Preview Tool"
      >
        <Eye className="w-4 h-4" />
      </button>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={`https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`}
              alt={`${tool.name} logo`}
              className="w-12 h-12 rounded-xl object-contain"
              onError={(e) => {
                // Show fallback icon when favicon fails to load
                const fallbackIcon = e.currentTarget.nextElementSibling;
                if (fallbackIcon) {
                  (fallbackIcon as HTMLElement).style.display = "flex";
                }
                e.currentTarget.style.display = "none";
              }}
            />
            {tool.icon ? (
              <div className="w-12 h-12 bg-gradient-to-br from-[#0F5F6A] to-[#0F5F6A]/90 dark:from-primary dark:to-primary/90 rounded-xl flex items-center justify-center text-white dark:text-primary-foreground font-semibold shadow-lg shadow-[#0F5F6A]/25 dark:shadow-primary/25 hidden">
                {tool.icon}
              </div>
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-muted dark:to-muted/80 rounded-xl flex items-center justify-center shadow-inner hidden">
                <Info className="w-5 h-5 text-gray-500 dark:text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-card-foreground mb-2 line-clamp-1">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-muted-foreground leading-relaxed line-clamp-3">
              {tool.description}
            </p>
          </div>
        </div>
        <button
          onClick={() => toggleSavedTool(tool.id)}
          className={`p-2 rounded-full transition-all duration-200 flex-shrink-0 ml-2 ${
            saved
              ? "text-red-500 dark:text-red-400 bg-red-50/80 dark:bg-red-500/10 backdrop-blur-sm"
              : "text-gray-400 dark:text-muted-foreground hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-500/10 hover:backdrop-blur-sm opacity-0 group-hover:opacity-100"
          }`}
        >
          <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tool.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className={`text-xs px-2 py-1 backdrop-blur-sm ${
              tag === "AI"
                ? "bg-[#B6FF3D]/20 dark:bg-primary/20 text-[#0F5F6A] dark:text-primary border-[#B6FF3D]/30 dark:border-primary/30"
                : ""
            } ${
              tag === "Free"
                ? "bg-green-100/80 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-200/50 dark:border-green-500/30"
                : ""
            } ${
              tag === "Education"
                ? "bg-blue-100/80 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200/50 dark:border-blue-500/30"
                : ""
            }`}
          >
            {tag}
          </Badge>
        ))}
        {tool.tier === "paid" && (
          <Badge
            variant="outline"
            className="text-xs px-2 py-1 bg-amber-50/80 dark:bg-yellow-500/10 border-amber-200/50 dark:border-yellow-500/30 text-amber-700 dark:text-yellow-400 backdrop-blur-sm"
          >
            Paid
          </Badge>
        )}
        {tool.tier === "freemium" && (
          <Badge
            variant="outline"
            className="text-xs px-2 py-1 bg-blue-50/80 dark:bg-blue-500/10 border-blue-200/50 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 backdrop-blur-sm"
          >
            Freemium
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
              upvoted
                ? "bg-[#B6FF3D]/20 dark:bg-primary/20 text-[#0F5F6A] dark:text-primary border border-[#B6FF3D]/30 dark:border-primary/30 shadow-md"
                : "bg-white/80 dark:bg-muted/30 text-gray-500 dark:text-muted-foreground hover:bg-[#B6FF3D]/10 dark:hover:bg-primary/10 hover:text-[#0F5F6A] dark:hover:text-primary border border-gray-200/50 dark:border-border/30 hover:shadow-md"
            } hover:scale-105 backdrop-blur-sm`}
          >
            <ChevronUp className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {displayUpvotes > 999
                ? `${Math.floor(displayUpvotes / 1000)}k`
                : displayUpvotes}
            </span>
          </button>
          <Button
            className="bg-[#0F5F6A] dark:bg-primary hover:bg-[#0F5F6A]/90 dark:hover:bg-primary/90 text-white dark:text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            size="sm"
            onClick={() => openExternalUrl(tool.url)}
          >
            Open
            <ExternalLink className="w-4 h-4 mr-2" />
          </Button>
        </div>
        <div className="text-xs text-gray-500 dark:text-muted-foreground bg-gray-50/80 dark:bg-muted/20 px-2 py-1 rounded-full backdrop-blur-sm">
          For {tool.audience.join(", ")}
        </div>
      </div>
    </div>
  );
}

export function MinimalCardSkeleton() {
  return (
    <div className="relative bg-white/90 dark:bg-card/90 backdrop-blur-md border border-white/20 dark:border-border/30 rounded-xl p-4 shadow-md shadow-black/5 dark:shadow-black/15 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-muted dark:to-muted/80 rounded-lg flex-shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded w-32" />
            <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded w-16" />
          </div>
        </div>
        <div className="flex items-center gap-2 ml-2">
          <div className="h-7 w-14 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded-lg" />
          <div className="w-7 h-7 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded-full" />
          <div className="h-7 w-16 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export function FullCardSkeleton() {
  return (
    <div className="relative h-full flex flex-col min-w-0 max-w-md mx-auto w-full bg-white/90 dark:bg-card/90 backdrop-blur-md border border-white/20 dark:border-border/30 rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-muted dark:to-muted/80 rounded-xl flex-shrink-0" />
          <div className="flex-1 min-w-0 space-y-3">
            <div className="h-5 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded w-full" />
              <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded w-5/6" />
              <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded w-2/3" />
            </div>
          </div>
        </div>
        <div className="w-8 h-8 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded-full flex-shrink-0 ml-2" />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-6 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded"
            style={{ width: `${60 + i * 10}px` }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded-lg" />
          <div className="h-8 w-24 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded" />
        </div>
        <div className="h-6 w-24 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-muted dark:via-muted/50 dark:to-muted rounded-full" />
      </div>
    </div>
  );
}
