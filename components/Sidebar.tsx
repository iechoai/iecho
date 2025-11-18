import { 
  Grid3X3, 
  MessageCircle, 
  FileText, 
  BookOpen, 
  Wrench, 
  Calendar, 
  Play, 
  FileSearch, 
  Lightbulb, 
  Code, 
  Puzzle, 
  Book,
  Gamepad2,
  Zap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onMobileSelect?: () => void;
}

const categories = [
  { id: "all", label: "All", icon: Grid3X3 },
  { id: "chatbots", label: "Chatbots", icon: MessageCircle },
  { id: "note-taking", label: "Note-taking", icon: FileText },
  { id: "studying", label: "Studying", icon: BookOpen },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "scheduling", label: "Scheduling", icon: Calendar },
  { id: "tutorials", label: "Tutorials", icon: Play },
  { id: "documentation", label: "Documentation", icon: FileSearch },
  { id: "prompting", label: "Prompting", icon: Lightbulb },
  { id: "productivity", label: "Productivity", icon: Zap },
  { id: "no-code", label: "No-code tools", icon: Code },
  { id: "extensions", label: "Extensions", icon: Puzzle },
  { id: "resources", label: "Book Resources", icon: Book },
  { id: "games", label: "Game Development", icon: Gamepad2 }
];

export function Sidebar({ selectedCategory, onCategorySelect, onMobileSelect }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    if (onMobileSelect) {
      onMobileSelect(); // Close mobile drawer when category is selected
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <motion.aside 
        className="relative bg-white dark:bg-sidebar/50 backdrop-blur-sm border-r border-gray-200 dark:border-sidebar-border min-h-screen"
        initial={false}
        animate={{ 
          width: isCollapsed ? '80px' : '256px'
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        {/* Toggle Button - Hide on mobile in drawer */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-6 z-10 w-6 h-6 bg-white dark:bg-card border border-gray-200 dark:border-border rounded-full items-center justify-center shadow-md hover:shadow-lg transition-shadow hover:bg-gray-50 dark:hover:bg-muted/80"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3 text-gray-600 dark:text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-gray-600 dark:text-muted-foreground" />
          )}
        </motion.button>

        <div className="p-6">
          {/* Header */}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.h2 
                className="text-lg font-medium text-gray-900 dark:text-sidebar-foreground mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                Categories
              </motion.h2>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <nav className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              const buttonContent = (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-[#0F5F6A] dark:bg-primary text-white dark:text-primary-foreground shadow-md dark:shadow-primary/20"
                      : "text-gray-700 dark:text-sidebar-foreground hover:bg-gray-100 dark:hover:bg-sidebar-accent hover:text-gray-900 dark:hover:text-sidebar-accent-foreground"
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span 
                        className="text-sm whitespace-nowrap overflow-hidden"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {category.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );

              // Wrap with tooltip only when collapsed
              if (isCollapsed) {
                return (
                  <Tooltip key={category.id}>
                    <TooltipTrigger asChild>
                      {buttonContent}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-gray-900 dark:bg-card text-white dark:text-foreground border-gray-700 dark:border-border">
                      <p>{category.label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return buttonContent;
            })}
          </nav>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}