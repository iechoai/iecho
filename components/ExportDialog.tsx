"use client";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, FileJson, FileText, Table } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import type { ToolListItem } from "../lib/types";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tools: ToolListItem[];
  title?: string;
}

export function ExportDialog({
  isOpen,
  onClose,
  tools,
  title = "My Saved Tools",
}: ExportDialogProps) {
  const exportAsJSON = () => {
    try {
      const data = {
        title,
        exportedAt: new Date().toISOString(),
        toolCount: tools.length,
        tools: tools.map((tool) => ({
          name: tool.name,
          description: tool.description,
          categories: tool.categories,
          url: tool.url,
          tags: tool.tags,
          audience: tool.audience,
          tier: tool.tier,
          upvotes: tool.upvotes,
        })),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      downloadFile(blob, `${title.toLowerCase().replace(/\s+/g, "-")}.json`);
      toast.success("Exported as JSON!");
    } catch (error) {
      toast.error("Failed to export. Please try again.", {
        action: {
          label: "Retry",
          onClick: exportAsJSON,
        },
      });
    }
  };

  const exportAsCSV = () => {
    try {
      const headers = [
        "Name",
        "Description",
        "Categories",
        "URL",
        "Tags",
        "Audience",
        "Tier",
        "Upvotes",
      ];
      const rows = tools.map((tool) => [
        tool.name,
        tool.description,
        tool.categories.join("; "),
        tool.url,
        tool.tags.join("; "),
        tool.audience.join("; "),
        tool.tier,
        tool.upvotes.toString(),
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
          row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      downloadFile(blob, `${title.toLowerCase().replace(/\s+/g, "-")}.csv`);
      toast.success("Exported as CSV!");
    } catch (error) {
      toast.error("Failed to export. Please try again.", {
        action: {
          label: "Retry",
          onClick: exportAsCSV,
        },
      });
    }
  };

  const exportAsText = () => {
    try {
      const textContent = [
        `${title}`,
        `Exported on ${new Date().toLocaleDateString()}`,
        `Total tools: ${tools.length}`,
        "",
        "─".repeat(50),
        "",
        ...tools
          .map(
            (tool, index) =>
              `${index + 1}. ${tool.name}\n` +
              `   ${tool.description}\n` +
              `   Categories: ${tool.categories.join(", ")}\n` +
              `   URL: ${tool.url}\n` +
              `   Tags: ${tool.tags.join(", ")}\n` +
              `   For: ${tool.audience.join(", ")}\n` +
              `   ${
                tool.tier === "paid"
                  ? "💎 Paid"
                  : tool.tier === "freemium"
                  ? "⚡ Freemium"
                  : "✓ Free"
              } | ${tool.upvotes} upvotes\n`
          )
          .join("\n"),
      ].join("\n");

      const blob = new Blob([textContent], { type: "text/plain" });
      downloadFile(blob, `${title.toLowerCase().replace(/\s+/g, "-")}.txt`);
      toast.success("Exported as Text!");
    } catch (error) {
      toast.error("Failed to export. Please try again.", {
        action: {
          label: "Retry",
          onClick: exportAsText,
        },
      });
    }
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dialog */}
          <motion.div
            className="relative z-10 w-full max-w-md bg-white dark:bg-card rounded-2xl shadow-2xl border border-gray-200 dark:border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-border">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground">
                  Export Tools
                </h3>
                <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1">
                  {tools.length} {tools.length === 1 ? "tool" : "tools"} to
                  export
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-muted transition-colors text-gray-600 dark:text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
              <p className="text-sm text-gray-600 dark:text-muted-foreground mb-4">
                Choose your preferred export format:
              </p>

              {/* JSON Export */}
              <button
                onClick={exportAsJSON}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 dark:border-border hover:border-[#0F5F6A] dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-muted/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FileJson className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-foreground">
                    JSON Format
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    Structured data with all details
                  </p>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-[#0F5F6A] dark:group-hover:text-primary transition-colors" />
              </button>

              {/* CSV Export */}
              <button
                onClick={exportAsCSV}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 dark:border-border hover:border-[#0F5F6A] dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-muted/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Table className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-foreground">
                    CSV Format
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    Import to Excel or Google Sheets
                  </p>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-[#0F5F6A] dark:group-hover:text-primary transition-colors" />
              </button>

              {/* Text Export */}
              <button
                onClick={exportAsText}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 dark:border-border hover:border-[#0F5F6A] dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-muted/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-foreground">
                    Text Format
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    Simple, readable text file
                  </p>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-[#0F5F6A] dark:group-hover:text-primary transition-colors" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
