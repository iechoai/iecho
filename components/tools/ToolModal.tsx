"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ChevronUp, Heart, Share2, Info, ExternalLink } from "lucide-react";
import { openExternalUrl } from "../../lib/dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ShareDialog } from "../ShareDialog";
import type { ToolListItem } from "../../lib/types";

interface ToolModalProps {
  tool: ToolListItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpvote: (toolId: string) => void;
  onSave: (toolId: string) => void;
  isUpvoted: (toolId: string) => boolean;
  isSaved: (toolId: string) => boolean;
  onShare: () => void;
  showShareDialog: boolean;
  onCloseShareDialog: () => void;
}

const getDomain = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (e) {
    console.log(e);
  }
};

const formatCategories = (categories: string[]) =>
  categories
    .map((category) =>
      category
        .split("-")
        .map((segment) =>
          segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : segment
        )
        .join(" ")
    )
    .join(", ");

export function ToolModal({
  tool,
  isOpen,
  onClose,
  onUpvote,
  onSave,
  isUpvoted,
  isSaved,
  onShare,
  showShareDialog,
  onCloseShareDialog,
}: ToolModalProps) {
  if (!tool) return null;

  const domain = getDomain(tool.url) || "";
  const categoryLabel = formatCategories(tool.categories);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`card-${tool.id}`}
              className="relative z-10 w-full max-w-sm sm:max-w-2xl max-h-[100vh] sm:max-h-[90vh] overflow-hidden sm:overflow-y-auto bg-white/95 dark:bg-card/95 backdrop-blur-sm border border-gray-200/50 dark:border-border/50 rounded-xl sm:rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: 0.1,
                },
              }}
              exit={{
                scale: 0.9,
                y: 20,
                transition: { duration: 0.3 },
              }}
            >
              {/* Modal content */}
              <div className="p-0">
                {/* Header Section */}
                <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-border/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <img
                          src={`https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`}
                          alt={`${tool.name} logo`}
                          className="w-12 h-12 rounded-xl object-contain"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            // Show fallback icon when favicon fails to load
                            const fallbackIcon =
                              e.currentTarget.nextElementSibling;
                            if (fallbackIcon) {
                              (fallbackIcon as HTMLElement).style.display =
                                "flex";
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
                        <div className="flex items-start justify-between mb-2">
                          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-card-foreground pr-4">
                            {tool.name}
                          </h2>
                          <button
                            onClick={onClose}
                            className="p-2 rounded-full text-gray-400 dark:text-muted-foreground hover:text-gray-600 dark:hover:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted/50 transition-colors flex-shrink-0"
                            aria-label="Close tool details"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {tool.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className={`text-sm px-3 py-1 backdrop-blur-sm ${
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
                              className="text-sm px-3 py-1 bg-amber-50/80 dark:bg-yellow-500/10 border-amber-200/50 dark:border-yellow-500/30 text-amber-700 dark:text-yellow-400 backdrop-blur-sm"
                            >
                              Paid
                            </Badge>
                          )}
                          {tool.tier === "freemium" && (
                            <Badge
                              variant="outline"
                              className="text-sm px-3 py-1 bg-blue-50/80 dark:bg-blue-500/10 border-blue-200/50 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 backdrop-blur-sm"
                            >
                              Freemium
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-muted-foreground text-base leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Stats and Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0F5F6A] dark:text-primary mb-1">
                        {tool.upvotes > 999
                          ? `${Math.floor(tool.upvotes / 1000)}k`
                          : tool.upvotes}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-muted-foreground">
                        Upvotes
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900 dark:text-card-foreground mb-1 capitalize">
                        {categoryLabel}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-muted-foreground">
                        Category
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900 dark:text-card-foreground mb-1">
                        {tool.audience.join(", ")}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-muted-foreground">
                        For
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-lg font-semibold mb-1 ${
                          tool.tier === "paid"
                            ? "text-amber-600 dark:text-yellow-400"
                            : tool.tier === "freemium"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {tool.tier.charAt(0).toUpperCase() + tool.tier.slice(1)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-muted-foreground">
                        Access
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 dark:border-border/30">
                    <Button
                      className="flex-1 p-4 bg-[#0F5F6A] dark:bg-primary hover:bg-[#0F5F6A]/90 dark:hover:bg-primary/90 text-white dark:text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                      size="lg"
                      onClick={() => openExternalUrl(tool.url)}
                    >
                      Open {tool.name}
                      <ExternalLink className=" sw-5 sh-5 mr-2" />
                    </Button>

                    <div className="flex gap-3">
                      <button
                        onClick={() => onUpvote(tool.id)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isUpvoted(tool.id)
                            ? "bg-[#B6FF3D]/20 dark:bg-primary/20 text-[#0F5F6A] dark:text-primary border border-[#B6FF3D]/30 dark:border-primary/30 shadow-md"
                            : "bg-white/80 dark:bg-muted/30 text-gray-600 dark:text-muted-foreground hover:bg-[#B6FF3D]/10 dark:hover:bg-primary/10 hover:text-[#0F5F6A] dark:hover:text-primary border border-gray-200/50 dark:border-border/30 hover:shadow-md"
                        } hover:scale-105 backdrop-blur-sm`}
                        aria-label={`Upvote ${tool.name}`}
                      >
                        <ChevronUp className="w-4 h-4" />
                        <span className="font-semibold">
                          {tool.upvotes > 999
                            ? `${Math.floor(tool.upvotes / 1000)}k`
                            : tool.upvotes}
                        </span>
                      </button>

                      <button
                        onClick={() => onSave(tool.id)}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          isSaved(tool.id)
                            ? "text-red-500 dark:text-red-400 bg-red-50/80 dark:bg-red-500/10 backdrop-blur-sm border border-red-200/50 dark:border-red-500/30"
                            : "text-gray-500 dark:text-muted-foreground hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-500/10 hover:backdrop-blur-sm border border-gray-200/50 dark:border-border/30"
                        } hover:scale-105`}
                        aria-label={`${
                          isSaved(tool.id) ? "Remove from" : "Add to"
                        } saved tools`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isSaved(tool.id) ? "fill-current" : ""
                          }`}
                        />
                      </button>

                      <button
                        onClick={onShare}
                        className="p-3 rounded-xl text-gray-500 dark:text-muted-foreground hover:text-[#0F5F6A] dark:hover:text-primary hover:bg-[#0F5F6A]/10 dark:hover:bg-primary/10 border border-gray-200/50 dark:border-border/30 hover:border-[#0F5F6A]/30 dark:hover:border-primary/30 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                        aria-label="Share tool"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Dialog */}
      <ShareDialog
        isOpen={showShareDialog}
        onClose={onCloseShareDialog}
        title={tool.name}
        url={`https://iecho.app/tools/${tool.id}`}
        description={tool.description}
        type="tool"
      />
    </>
  );
}
