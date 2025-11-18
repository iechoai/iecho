import { motion, AnimatePresence } from "motion/react";
import { X, Keyboard } from "lucide-react";
import type { KeyboardShortcut } from "./useKeyboardShortcuts";

interface KeyboardShortcutsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  shortcuts: KeyboardShortcut[];
}

export function KeyboardShortcutsDialog({
  isOpen,
  onClose,
  shortcuts,
}: KeyboardShortcutsDialogProps) {
  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category]!.push(shortcut);
    return acc;
  }, {} as Record<string, KeyboardShortcut[]>);

  const formatKey = (shortcut: KeyboardShortcut) => {
    const keys: string[] = [];
    if (shortcut.ctrl) keys.push("Ctrl");
    if (shortcut.alt) keys.push("Alt");
    if (shortcut.shift) keys.push("Shift");
    if (shortcut.meta) keys.push("⌘");
    keys.push(shortcut.key === " " ? "Space" : shortcut.key.toUpperCase());
    return keys;
  };

  const categoryTitles = {
    general: "General",
    navigation: "Navigation",
    actions: "Actions",
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dialog */}
          <motion.div
            className="relative z-10 w-full max-w-2xl bg-white dark:bg-card rounded-2xl shadow-2xl border border-gray-200 dark:border-border overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-border sticky top-0 bg-white dark:bg-card z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#B6FF3D]/20 dark:bg-primary/20 flex items-center justify-center">
                  <Keyboard className="w-5 h-5 text-[#0F5F6A] dark:text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground">
                    Keyboard Shortcuts
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    Navigate faster with these shortcuts
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-muted transition-colors text-gray-600 dark:text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {Object.entries(groupedShortcuts).map(
                ([category, categoryShortcuts]) => (
                  <div key={category}>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-foreground uppercase tracking-wide mb-3">
                      {categoryTitles[category as keyof typeof categoryTitles]}
                    </h4>
                    <div className="space-y-2">
                      {categoryShortcuts.map((shortcut, index) => (
                        <motion.div
                          key={`${category}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-muted/30 hover:bg-gray-100 dark:hover:bg-muted/50 transition-colors"
                        >
                          <span className="text-sm text-gray-700 dark:text-muted-foreground">
                            {shortcut.description}
                          </span>
                          <div className="flex items-center gap-1">
                            {formatKey(shortcut).map((key, keyIndex) => (
                              <kbd
                                key={keyIndex}
                                className="px-2.5 py-1.5 rounded-md bg-white dark:bg-card border border-gray-300 dark:border-border font-mono text-xs text-gray-700 dark:text-foreground shadow-sm min-w-[2rem] text-center"
                              >
                                {key}
                              </kbd>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-border bg-gray-50 dark:bg-muted/30">
              <p className="text-xs text-center text-gray-600 dark:text-muted-foreground">
                Press{" "}
                <kbd className="px-2 py-0.5 mx-1 rounded bg-white dark:bg-card border border-gray-300 dark:border-border font-mono text-xs">
                  Esc
                </kbd>{" "}
                or{" "}
                <kbd className="px-2 py-0.5 mx-1 rounded bg-white dark:bg-card border border-gray-300 dark:border-border font-mono text-xs">
                  Shift + ?
                </kbd>{" "}
                to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
