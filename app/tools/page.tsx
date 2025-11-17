"use client";

import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { KeyboardShortcutsDialog } from "../../components/KeyboardShortcutsDialog";
import {
  useKeyboardShortcuts,
  type KeyboardShortcut,
} from "../../components/useKeyboardShortcuts";
import { tools, type Tool } from "../../data/tools";
import { toast } from "sonner";
import { useSavedTools } from "../../components/SavedToolsContext";
import { useUpvotes } from "../../components/UpvoteContext";
import {
  AudienceFilter,
  ResultsHeader,
  ToolsGrid,
  ToolModal,
  MobileNavigation,
  MobileSearch,
} from "../../components/tools";

type AudienceFilter = "all" | "students" | "developers";

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAudience, setSelectedAudience] =
    useState<AudienceFilter>("all");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showModalShareDialog, setShowModalShareDialog] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleSavedTool, isToolSaved } = useSavedTools();
  const { toggleUpvote, isToolUpvoted } = useUpvotes();

  const handleOpenModal = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleCloseModal = () => {
    setSelectedTool(null);
  };

  // Show first-time keyboard shortcuts hint
  useEffect(() => {
    const hasSeenHint = localStorage.getItem("hasSeenKeyboardHint");
    if (!hasSeenHint) {
      setTimeout(() => {
        toast("💡 Press Shift + ? to see keyboard shortcuts", {
          duration: 5000,
          position: "bottom-center",
        });
        localStorage.setItem("hasSeenKeyboardHint", "true");
      }, 2000);
    }
  }, []);

  // Define keyboard shortcuts
  const shortcuts: KeyboardShortcut[] = [
    {
      key: "?",
      shift: true,
      description: "Show keyboard shortcuts",
      action: () => setShowShortcuts(true),
      category: "general",
    },
    {
      key: "Escape",
      description: "Close modal or dialog",
      action: () => {
        if (selectedTool) handleCloseModal();
        else if (showShortcuts) setShowShortcuts(false);
      },
      category: "general",
    },
  ];

  // Enable shortcuts
  useKeyboardShortcuts({
    shortcuts,
    enabled: true,
  });

  // Category mapping from sidebar IDs to data categories
  const getCategoryFilter = (selectedCategory: string): string[] => {
    const categoryMapping: Record<string, string[]> = {
      all: [],
      chatbots: ["chatbots"],
      "note-taking": ["note-taking"],
      studying: ["studying"],
      tools: ["tools"],
      scheduling: ["scheduling"],
      tutorials: ["tutorials"],
      documentation: ["documentation"],
      prompting: ["prompting"],
      "no-code": ["no-code", "no-code-tools"],
      extensions: ["extensions"],
      resources: ["book-resources"],
      games: ["game-development", "game-assets", "gaming-platforms"],
      productivity: ["productivity"],
    };
    return categoryMapping[selectedCategory] || [selectedCategory];
  };

  // Filter tools based on category, audience, and search
  const filteredTools = tools.filter((tool) => {
    const categoryFilter = getCategoryFilter(selectedCategory);
    const matchesCategory =
      selectedCategory === "all" ||
      tool.categories.some((category) => categoryFilter.includes(category));
    const matchesAudience =
      selectedAudience === "all" || tool.audience.includes(selectedAudience);
    const normalizedSearch = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      tool.name.toLowerCase().includes(normalizedSearch) ||
      tool.description.toLowerCase().includes(normalizedSearch) ||
      tool.categories.some((category) =>
        category.toLowerCase().includes(normalizedSearch)
      ) ||
      tool.tags.some((tag) =>
        tag.toLowerCase().includes(normalizedSearch)
      );
    return matchesCategory && matchesAudience && matchesSearch;
  });

  // Sort tools (popular first, then alphabetically)
  const sortedTools = [...filteredTools].sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <KeyboardShortcutsDialog
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        shortcuts={shortcuts}
      />

      <div className="flex flex-col h-screen bg-gray-50 dark:bg-background transition-colors duration-300">
        <Header
          onShortcutsClick={() => setShowShortcuts(true)}
          onMenuClick={() => setShowMobileMenu(true)}
          onMobileSearchClick={() => setShowMobileSearch(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Mobile Navigation Drawer */}
        <MobileNavigation
          isOpen={showMobileMenu}
          onOpenChange={setShowMobileMenu}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Mobile Search Dialog */}
        <MobileSearch
          isOpen={showMobileSearch}
          onOpenChange={setShowMobileSearch}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          tools={sortedTools}
          onToolSelect={handleOpenModal}
        />

        <div className="flex flex-1 min-h-0">
          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden md:block">
            <Sidebar
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden overflow-y-auto custom-scrollbar">
            {/* Audience Filter Buttons */}
            <AudienceFilter
              selectedAudience={selectedAudience}
              onAudienceSelect={setSelectedAudience}
            />

            {/* Results Header */}
            <ResultsHeader
              selectedCategory={selectedCategory}
              selectedAudience={selectedAudience}
              toolsCount={sortedTools.length}
            />

            {/* Tools Grid */}
            <ToolsGrid tools={sortedTools} onToolPreview={handleOpenModal} />
          </main>
        </div>

        {/* Tool Preview Modal */}
        <ToolModal
          tool={selectedTool}
          isOpen={!!selectedTool}
          onClose={handleCloseModal}
          onUpvote={toggleUpvote}
          onSave={toggleSavedTool}
          isUpvoted={isToolUpvoted}
          isSaved={isToolSaved}
          onShare={() => setShowModalShareDialog(true)}
          showShareDialog={showModalShareDialog}
          onCloseShareDialog={() => setShowModalShareDialog(false)}
        />
      </div>
    </>
  );
}
