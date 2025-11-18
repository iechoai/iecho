import {
  Grid3X3,
  MessageCircle,
  FileText,
  BookOpen,
  Wrench,
  Calendar,
  Play,
  FileSearch,
  Zap,
  Code,
  Puzzle,
  Book,
  Gamepad2,
  Lightbulb,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";

interface MobileNavigationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
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
  { id: "games", label: "Game Development", icon: Gamepad2 },
];

export function MobileNavigation({
  isOpen,
  onOpenChange,
  selectedCategory,
  onCategorySelect,
}: MobileNavigationProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 w-[280px] overflow-y-auto custom-scrollbar"
      >
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="text-lg font-medium text-gray-900 dark:text-sidebar-foreground">
            Categories
          </SheetTitle>
          <SheetDescription className="sr-only">
            Browse tools by category
          </SheetDescription>
        </SheetHeader>

        {/* Mobile Category Navigation */}
        <nav className="space-y-1 p-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => {
                  onCategorySelect(category.id);
                  onOpenChange(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-[#0F5F6A] dark:bg-primary text-white dark:text-primary-foreground shadow-md dark:shadow-primary/20"
                    : "text-gray-700 dark:text-sidebar-foreground hover:bg-gray-100 dark:hover:bg-sidebar-accent hover:text-gray-900 dark:hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
