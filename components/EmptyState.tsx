import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  customIcon?: React.ReactNode;
  showShortcutHint?: boolean;
  shortcutHint?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  customIcon,
  showShortcutHint = false,
  shortcutHint
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center py-12 sm:py-16"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-muted/50 dark:to-muted/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-sm"
      >
        {customIcon ? (
          customIcon
        ) : Icon ? (
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 dark:text-muted-foreground" />
        ) : (
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 dark:text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        )}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg sm:text-xl font-medium text-gray-900 dark:text-foreground mb-2"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 dark:text-muted-foreground max-w-md mx-auto mb-6 px-4"
      >
        {description}
      </motion.p>

      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onAction}
            className="bg-[#0F5F6A] dark:bg-primary hover:bg-[#0F5F6A]/90 dark:hover:bg-primary/90 text-white dark:text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}

      {showShortcutHint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B6FF3D]/10 dark:bg-primary/10 border border-[#B6FF3D]/30 dark:border-primary/30"
        >
          <svg className="w-4 h-4 text-[#0F5F6A] dark:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm text-[#0F5F6A] dark:text-primary">
            {shortcutHint || (
              <>
                Press{" "}
                <kbd className="px-2 py-0.5 mx-1 rounded bg-white dark:bg-card border border-[#B6FF3D]/50 dark:border-primary/50 font-mono text-xs">
                  Shift + ?
                </kbd>{" "}
                to see all shortcuts
              </>
            )}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}