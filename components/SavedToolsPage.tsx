"use client";
import { ArrowLeft, GripVertical, Heart, Download, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { ToolCard } from "./ToolCard";
import { useSavedTools } from "./SavedToolsContext";
import type { ToolListItem } from "../lib/types";
import { EmptyState } from "./EmptyState";
import { ExportDialog } from "./ExportDialog";
import { ShareDialog } from "./ShareDialog";
import { motion, Reorder } from "motion/react";
import { useState, useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";
import Link from "next/link";

const normaliseToolIds = (ids: string[]) => {
  const seen = new Set<string>();
  const ordered: string[] = [];

  ids.forEach((rawId) => {
    const trimmed = rawId.trim();
    if (!trimmed || seen.has(trimmed)) {
      return;
    }
    seen.add(trimmed);
    ordered.push(trimmed);
  });

  return ordered;
};

const computeShareHash = (ids: string[]) => {
  const normalised = normaliseToolIds(ids);
  if (normalised.length === 0) {
    return "";
  }

  return [...normalised].sort((a, b) => a.localeCompare(b)).join("|");
};

export function SavedToolsPage() {
  const { savedTools, reorderSavedTools } = useSavedTools();
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [orderedTools, setOrderedTools] = useState<ToolListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const savedToolsHash = useMemo(
    () => computeShareHash(savedTools),
    [savedTools]
  );
  const lastSharedHashRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      if (savedTools.length === 0) {
        setOrderedTools([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        params.set("ids", savedTools.join(","));
        params.set("limit", "100");

        const response = await fetch(`/api/tools?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          const fetchedTools: ToolListItem[] = data.data;

          // Sort based on savedTools order
          const sorted = savedTools
            .map((id) => fetchedTools.find((t) => t.id === id))
            .filter((t): t is ToolListItem => t !== undefined);

          setOrderedTools(sorted);
        }
      } catch (error) {
        console.error("Failed to fetch saved tools", error);
        toast.error("Failed to load saved tools");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, [savedTools]);

  // Reset share URL only when tool set (ignoring order) changes
  useEffect(() => {
    if (lastSharedHashRef.current === savedToolsHash) {
      return;
    }
    lastSharedHashRef.current = null;
    setShareUrl(null);
  }, [savedToolsHash]);

  const handleReorder = (newOrder: ToolListItem[]) => {
    setOrderedTools(newOrder);
    reorderSavedTools(newOrder.map((tool) => tool.id));
    toast.success("Tools reordered!", {
      duration: 1500,
    });
  };

  const handleShare = async () => {
    if (shareUrl && lastSharedHashRef.current === savedToolsHash) {
      setShowShareDialog(true);
      return;
    }

    setIsSharing(true);
    try {
      const response = await fetch("/api/collections/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolIds: savedTools }),
      });

      if (!response.ok) throw new Error("Failed to create share link");

      const data = await response.json();
      setShareUrl(data.url);
      lastSharedHashRef.current = savedToolsHash;
      setShowShareDialog(true);
    } catch (error) {
      toast.error("Failed to create share link");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">
      {/* Minimalistic Header */}
      <header className="bg-white dark:bg-card/50 backdrop-blur-sm border-b border-gray-200 dark:border-border px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/tools">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-muted/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="hidden md:block">
              <h1 className="text-xl font-medium text-gray-900 dark:text-foreground">
                Saved Tools
              </h1>
              <p className="text-sm text-gray-600 dark:text-muted-foreground">
                {orderedTools.length} tools saved
              </p>
            </div>
          </div>

          {/* Actions & Logo */}
          <div className="flex items-center gap-3">
            {orderedTools.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  disabled={isSharing}
                  className="hover:bg-gray-100 dark:hover:bg-muted/50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {isSharing ? "loading..." : "Share"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExportDialog(true)}
                  className="hover:bg-gray-100 dark:hover:bg-muted/50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        {orderedTools.length > 0 ? (
          <div className="space-y-4">
            {/* Drag instruction */}
            <motion.div
              className="bg-blue-50/80 dark:bg-blue-500/10 border border-blue-200/50 dark:border-blue-500/30 rounded-xl p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <GripVertical className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Drag to Reorder
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Hover over cards and drag the grip handle to rearrange your
                    saved tools
                  </p>
                </div>
              </div>
            </motion.div>

            <Reorder.Group
              axis="y"
              values={orderedTools}
              onReorder={handleReorder}
              className="space-y-3"
            >
              {orderedTools.map((tool) => (
                <Reorder.Item
                  key={tool.id}
                  value={tool}
                  className="group cursor-grab active:cursor-grabbing touch-none"
                  whileDrag={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    rotate: 1,
                    zIndex: 999,
                  }}
                  dragElastic={0.1}
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                  }}
                >
                  <motion.div
                    className="relative bg-white dark:bg-card/80 rounded-xl border border-gray-200/50 dark:border-border/30 overflow-hidden"
                    whileHover={{ scale: 1.01 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    {/* Drag Handle */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-8 h-8 rounded-lg bg-gray-100/90 dark:bg-muted/90 backdrop-blur-sm border border-gray-200/50 dark:border-border/50 flex items-center justify-center shadow-sm">
                        <GripVertical className="w-4 h-4 text-gray-500 dark:text-muted-foreground" />
                      </div>
                    </div>

                    {/* Tool Card Content with padding for drag handle */}
                    <div className="pl-6 group-hover:pl-14 transition-all duration-200">
                      <ToolCard
                        tool={tool}
                        showMinimal={true}
                        onPreview={() => {}}
                      />
                    </div>
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        ) : (
          <EmptyState
            icon={Heart}
            title="No saved tools yet"
            description="Start exploring and save your favorites. Press Shift + H to go home, or hover over any tool and click the heart icon to save it."
            actionLabel="Explore Tools"
            onAction={() => (window.location.href = "/tools")}
            showShortcutHint={true}
            shortcutHint="Press Shift + S on any tool to quickly save it"
          />
        )}
      </main>

      {/* Export Dialog */}
      <ExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        tools={orderedTools}
        title="My Saved Tools"
      />

      {/* Share Dialog */}
      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        title="My Tool Collection"
        url={shareUrl || ""}
        description={`Check out my collection of ${orderedTools.length} amazing tools on IechoAI!`}
        type="collection"
      />
    </div>
  );
}
