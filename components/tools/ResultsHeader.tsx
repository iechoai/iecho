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
  Palette,
} from "lucide-react";

type AudienceFilter = "all" | "students" | "developers";

interface ResultsHeaderProps {
  selectedCategory: string;
  selectedAudience: AudienceFilter;
  totalTools: number;
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
  { id: "design", label: "Design", icon: Palette },
  { id: "no-code", label: "No-code tools", icon: Code },
  { id: "extensions", label: "Extensions", icon: Puzzle },
  { id: "resources", label: "Book Resources", icon: Book },
  { id: "games", label: "Game Development", icon: Gamepad2 },
];

export function ResultsHeader({
  selectedCategory,
  selectedAudience,
  totalTools,
}: ResultsHeaderProps) {
  const getCategoryLabel = () => {
    if (selectedCategory === "all") return "All Tools";

    const category = categories.find((cat) => cat.id === selectedCategory);
    return (
      category?.label ||
      selectedCategory.charAt(0).toUpperCase() +
        selectedCategory.slice(1).replace("-", " ")
    );
  };

  return (
    <div className="mb-4 sm:mb-6">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 dark:text-foreground mb-1 sm:mb-2">
        {getCategoryLabel()}
      </h1>
      <p className="text-sm sm:text-base text-gray-600 dark:text-muted-foreground">
        {totalTools} tools found
        {selectedAudience !== "all" && ` for ${selectedAudience}`}
      </p>
    </div>
  );
}
