"use client";

import { useParams } from "next/navigation";
import { tools, type Tool } from "../../../data/tools";
import { motion } from "motion/react";
import { Heart, ChevronUp, ExternalLink, Info } from "lucide-react";
import { openExternalUrl } from "../../../lib/dom";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { useSavedTools } from "../../../components/SavedToolsContext";
import { useUpvotes } from "../../../components/UpvoteContext";
import { notFound } from "next/navigation";

const getDomain = (url: string | undefined) => {
  try {
    if (!url) return "";
    return new URL(url).hostname;
  } catch {
    return "";
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

export default function ToolDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const tool = tools.find((t) => t.id === slug);

  const domain = getDomain(tool?.url);

  if (!tool) {
    notFound();
  }

  const { toggleSavedTool, isToolSaved } = useSavedTools();
  const { toggleUpvote, isToolUpvoted } = useUpvotes();
  const saved = isToolSaved(tool.id);
  const upvoted = isToolUpvoted(tool.id);

  const displayUpvotes = tool.upvotes + (upvoted ? 1 : 0);
  const categoryLabel = formatCategories(tool.categories);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300 p-4 sm:p-6 lg:p-8">
      <motion.div
        layoutId={`card-${tool.id}`}
        className="relative z-10 w-full max-w-sm sm:max-w-2xl mx-auto bg-white/95 dark:bg-card/95 backdrop-blur-sm border border-gray-200/50 dark:border-border/50 rounded-xl sm:rounded-2xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="p-0">
          {/* Header Section */}
          <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-border/30">
            <div className="flex items-start gap-4">
              <motion.div
                className="flex relative flex-shrink-0 text-xl sm:text-2xl border border-gray-200/50 dark:border-border/50 flex-shrink-0 "
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                <img
                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`}
                  alt={`${tool.name} logo`}
                  className="w-10 h-10 rounded-lg object-contain"
                  loading="lazy"
                  decoding="async"
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
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0F5F6A] to-[#0F5F6A]/90 dark:from-primary dark:to-primary/90 flex items-center justify-center text-white dark:text-primary-foreground text-xs font-bold shadow-xl shadow-[#0F5F6A]/20 dark:shadow-primary/20 hidden">
                    {tool.icon}
                  </div>
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-muted dark:to-muted/80 rounded-lg flex items-center justify-center shadow-inner hidden">
                    <Info className="w-4 h-4 text-gray-500 dark:text-muted-foreground" />
                  </div>
                )}
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <motion.h2
                    className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-foreground truncate"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {tool.name}
                  </motion.h2>
                  <motion.div
                    className="flex items-center gap-2 ml-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="px-3 py-1.5 rounded-lg bg-gray-100/80 dark:bg-muted/80 text-gray-700 dark:text-muted-foreground border border-gray-200/50 dark:border-border/50 text-sm font-medium backdrop-blur-sm">
                      {categoryLabel}
                    </span>
                    {tool.tier === "paid" && (
                      <span className="px-3 py-1.5 rounded-lg bg-amber-100/80 dark:bg-yellow-500/10 border border-amber-200/50 dark:border-yellow-500/30 text-amber-700 dark:text-yellow-400 text-sm font-medium">
                        Paid
                      </span>
                    )}
                    {tool.tier === "freemium" && (
                      <span className="px-3 py-1.5 rounded-lg bg-blue-100/80 dark:bg-blue-500/10 border border-blue-200/50 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 text-sm font-medium">
                        Freemium
                      </span>
                    )}
                  </motion.div>
                </div>

                <motion.p
                  className="text-gray-600 dark:text-muted-foreground leading-relaxed text-base mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {tool.description}
                </motion.p>

                {/* Quick Stats */}
                <motion.div
                  className="flex items-center gap-6 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-2 text-gray-600 dark:text-muted-foreground">
                    <ChevronUp className="w-4 h-4 text-[#B6FF3D]" />
                    <span className="font-medium">
                      {displayUpvotes} upvotes
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-[#B6FF3D]"></div>
                    <span>For {tool.audience.join(", ")}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-4">
                Tags & Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all hover:scale-105 ${
                      tag === "AI"
                        ? "bg-[#B6FF3D]/20 dark:bg-primary/20 text-[#0F5F6A] dark:text-primary border-[#B6FF3D]/30 dark:border-primary/30 shadow-sm"
                        : tag === "Free"
                        ? "bg-green-100/80 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-200/50 dark:border-green-500/30 shadow-sm"
                        : "bg-gray-100/80 dark:bg-muted/60 text-gray-700 dark:text-muted-foreground border-gray-200/50 dark:border-border/50"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="pt-4 border-t border-gray-100 dark:border-border/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Upvote Button */}
                <motion.button
                  onClick={() => toggleUpvote(tool.id)}
                  className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all text-base border-2 ${
                    upvoted
                      ? "bg-[#B6FF3D]/10 dark:bg-primary/10 text-[#0F5F6A] dark:text-primary border-[#B6FF3D] dark:border-primary shadow-lg shadow-[#B6FF3D]/25"
                      : "bg-gray-50/80 dark:bg-muted/60 text-gray-700 dark:text-muted-foreground hover:bg-[#B6FF3D]/10 dark:hover:bg-primary/10 hover:text-[#0F5F6A] dark:hover:text-primary border-gray-200 dark:border-border hover:border-[#B6FF3D]/50 dark:hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ChevronUp className="w-5 h-5" />
                  <span>Upvote ({displayUpvotes})</span>
                </motion.button>

                {/* Visit Button */}
                <motion.button
                  onClick={() => openExternalUrl(tool.url)}
                  className="flex-1 px-8 py-3 rounded-xl font-semibold text-black bg-[#B6FF3D] hover:bg-[#B6FF3D]/90 relative overflow-hidden text-base transition-all shadow-lg hover:shadow-xl shadow-[#B6FF3D]/25 hover:shadow-[#B6FF3D]/40 border-2 border-[#B6FF3D]"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Visit {tool.name}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
