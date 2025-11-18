"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { KeyboardShortcutsDialog } from "../KeyboardShortcutsDialog";
import { useSavedTools } from "../SavedToolsContext";
import { useUpvotes } from "../UpvoteContext";
import type { KeyboardShortcut } from "../useKeyboardShortcuts";
import { useKeyboardShortcuts } from "../useKeyboardShortcuts";
import { AudienceFilter } from "./AudienceFilter";
import { ResultsHeader } from "./ResultsHeader";
import { ToolsGrid } from "./ToolsGrid";
import { MobileNavigation } from "./MobileNavigation";
import type { ToolListItem } from "../../lib/types";
import { mapCategoryUiToParam } from "../../lib/tool-filters";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const ToolModal = dynamic(
  () => import("./ToolModal").then((mod) => mod.ToolModal),
  {
    ssr: false,
  }
);

const MobileSearch = dynamic(
  () => import("./MobileSearch").then((mod) => mod.MobileSearch),
  { ssr: false }
);

type AudienceSelection = "all" | "students" | "developers";

type PageMode = "browse" | "search";

interface PaginationState {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}

interface FilterState {
  category: string;
  audience: string;
  sort: "popular" | "name" | "new";
  tier?: string;
  popular?: string;
  search: string;
}

interface ToolsPageClientProps {
  initialTools: ToolListItem[];
  pagination: PaginationState;
  filters: FilterState;
  mode: PageMode;
}

const FIRST_LOAD_HINT_KEY = "hasSeenKeyboardHint";
const SEARCH_DEBOUNCE_MS = 350;

export function ToolsPageClient({
  initialTools,
  pagination,
  filters,
  mode,
}: ToolsPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toggleSavedTool, isToolSaved } = useSavedTools();
  const { toggleUpvote, isToolUpvoted } = useUpvotes();

  const [tools, setTools] = useState(initialTools);
  const [paginationState, setPaginationState] = useState(pagination);
  const [filterState, setFilterState] = useState<FilterState>(filters);
  const [selectedTool, setSelectedTool] = useState<ToolListItem | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchDraft, setSearchDraft] = useState(filters.search);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadError, setIsLoadError] = useState<string | null>(null);
  const [isPendingNavigation, startTransition] = useTransition();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const hasInitialisedSearch = useRef(false);

  // Reset state when server-provided props change (URL navigation)
  useEffect(() => {
    setTools(initialTools);
    setPaginationState(pagination);
    setFilterState(filters);
    setSearchDraft(filters.search);
    setSelectedTool(null);
    setIsRefreshing(false);
    setIsLoadingMore(false);
    setIsLoadError(null);
  }, [initialTools, pagination, filters]);

  // Show first-time keyboard hint
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const hasSeen = window.localStorage.getItem(FIRST_LOAD_HINT_KEY);
    if (!hasSeen) {
      const timeoutId = window.setTimeout(() => {
        toast("💡 Press Shift + ? to see keyboard shortcuts", {
          duration: 5000,
          position: "bottom-center",
        });
        window.localStorage.setItem(FIRST_LOAD_HINT_KEY, "true");
      }, 2000);
      return () => window.clearTimeout(timeoutId);
    }
    return undefined;
  }, []);

  // Debounce search input so we avoid navigating on every keystroke immediately
  useEffect(() => {
    if (!hasInitialisedSearch.current) {
      hasInitialisedSearch.current = true;
      return;
    }

    const nextSearch = searchDraft.trim();
    if (nextSearch === filterState.search.trim()) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      applyFilters({ ...filterState, search: nextSearch }, { resetPage: true });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  const derivedMode: PageMode = useMemo(() => {
    return filterState.search.trim() ? "search" : mode;
  }, [filterState.search, mode]);

  const totalLoaded = tools.length;
  const hasMore =
    !isRefreshing && paginationState.page < paginationState.totalPages;
  const isGridLoading =
    isRefreshing ||
    (tools.length === 0 && (isPendingNavigation || isLoadingMore));

  const updateUrl = (nextFilters: FilterState, nextPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");

    const setOrDelete = (
      key: string,
      value: string | undefined,
      predicate?: (value: string) => boolean
    ) => {
      if (!value || value === "" || (predicate && predicate(value))) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    };

    const categoryParamValue = mapCategoryUiToParam(nextFilters.category);
    if (categoryParamValue) {
      params.set("category", categoryParamValue);
    } else if (nextFilters.category && nextFilters.category !== "all") {
      params.set("category", nextFilters.category);
    } else {
      params.delete("category");
    }
    setOrDelete("audience", nextFilters.audience, (value) => value === "all");
    setOrDelete("sort", nextFilters.sort, (value) => value === "popular");
    setOrDelete("tier", nextFilters.tier);
    setOrDelete("popular", nextFilters.popular);
    setOrDelete("q", nextFilters.search.trim());

    if (nextPage > 1) {
      params.set("page", String(nextPage));
    } else {
      params.delete("page");
    }

    params.set("limit", String(paginationState.limit));

    const target = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    startTransition(() => {
      router.replace(target, { scroll: false });
    });
  };

  // Prepare shared filter query parameters for load-more and search API calls.
  const appendFilterParams = (params: URLSearchParams) => {
    const categoryFilter = mapCategoryUiToParam(filterState.category);
    if (categoryFilter) {
      params.set("category", categoryFilter);
    } else if (filterState.category && filterState.category !== "all") {
      params.set("category", filterState.category);
    }

    if (filterState.audience && filterState.audience !== "all") {
      params.set("audience", filterState.audience);
    }

    if (filterState.tier) {
      params.set("tier", filterState.tier);
    }

    if (filterState.sort && filterState.sort !== "popular") {
      params.set("sort", filterState.sort);
    }

    if (filterState.popular) {
      params.set("popular", filterState.popular);
    }
  };

  const applyFilters = (
    nextFilters: FilterState,
    options: { resetPage?: boolean } = {}
  ) => {
    const shouldReset = Boolean(options.resetPage);
    setFilterState(nextFilters);

    if (shouldReset) {
      setIsRefreshing(true);
      setIsLoadError(null);
      setTools([]);
      setPaginationState((prev) => ({
        page: 1,
        limit: prev.limit,
        total: 0,
        totalPages: 1,
      }));
    }
    const nextPage = shouldReset ? 1 : paginationState.page;
    updateUrl(nextFilters, nextPage);
  };

  const handleCategorySelect = (category: string) => {
    const updated = { ...filterState, category };
    applyFilters(updated, { resetPage: true });
  };

  const handleAudienceSelect = (audience: AudienceSelection) => {
    const updated = { ...filterState, audience };
    applyFilters(updated, { resetPage: true });
  };

  const handleSearchChange = (query: string) => {
    setSearchDraft(query);
  };

  const handleToolPreview = (tool: ToolListItem) => {
    setSelectedTool(tool);
  };

  const handleCloseModal = () => {
    setSelectedTool(null);
    setShowShareDialog(false);
  };

  const loadMoreTools = async () => {
    if (isLoadingMore || !hasMore || isRefreshing) {
      return;
    }

    setIsLoadingMore(true);
    setIsLoadError(null);

    const nextPage = paginationState.page + 1;
    const params = new URLSearchParams();
    params.set("page", String(nextPage));
    params.set("limit", String(paginationState.limit));

    const endpoint =
      derivedMode === "search" ? "/api/tools/search" : "/api/tools";

    appendFilterParams(params);

    if (derivedMode === "search") {
      params.set("q", filterState.search.trim());
    }

    try {
      const response = await fetch(`${endpoint}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      const fetched: ToolListItem[] = (payload.data ?? []).map(
        (tool: ToolListItem) => ({
          ...tool,
          createdAt: new Date(tool.createdAt).toISOString(),
        })
      );

      setTools((prev) => [...prev, ...fetched]);
      setPaginationState((prev) => ({
        page: payload.meta?.page ?? nextPage,
        totalPages: payload.meta?.totalPages ?? prev.totalPages,
        total: payload.meta?.total ?? prev.total,
        limit: payload.meta?.limit ?? prev.limit,
      }));
    } catch (error) {
      setIsLoadError(
        error instanceof Error ? error.message : "Failed to load more tools"
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  const shortcuts = useMemo<KeyboardShortcut[]>(
    () => [
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
          if (selectedTool) {
            handleCloseModal();
          } else if (showShortcuts) {
            setShowShortcuts(false);
          }
        },
        category: "general",
      },
    ],
    [selectedTool, showShortcuts]
  );

  useKeyboardShortcuts({
    shortcuts,
    enabled: true,
  });

  const audienceSelection = useMemo<AudienceSelection>(() => {
    if (
      filterState.audience === "students" ||
      filterState.audience === "developers"
    ) {
      return filterState.audience;
    }
    return "all";
  }, [filterState.audience]);

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
          searchQuery={searchDraft}
          onSearchChange={handleSearchChange}
        />

        <MobileNavigation
          isOpen={showMobileMenu}
          onOpenChange={setShowMobileMenu}
          selectedCategory={filterState.category}
          onCategorySelect={handleCategorySelect}
        />

        <MobileSearch
          isOpen={showMobileSearch}
          onOpenChange={setShowMobileSearch}
          searchQuery={searchDraft}
          onSearchChange={handleSearchChange}
          tools={tools}
          onToolSelect={(tool) => {
            handleToolPreview(tool);
            setShowMobileSearch(false);
          }}
        />

        <div className="flex flex-1 min-h-0">
          <div className="hidden md:block">
            <Sidebar
              selectedCategory={filterState.category}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden overflow-y-auto custom-scrollbar">
            <AudienceFilter
              selectedAudience={audienceSelection}
              onAudienceSelect={handleAudienceSelect}
            />

            <ResultsHeader
              selectedCategory={filterState.category}
              selectedAudience={audienceSelection}
              totalTools={paginationState.total}
            />

            <ToolsGrid
              tools={tools}
              onToolPreview={handleToolPreview}
              isLoading={isGridLoading}
              skeletonCount={Math.max(paginationState.limit, 6)}
            />

            {isLoadError && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                {isLoadError}
              </p>
            )}

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={loadMoreTools}
                  disabled={isLoadingMore || isPendingNavigation}
                  className={cn("px-6 py-2", isLoadingMore && "opacity-70")}
                >
                  {isLoadingMore ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}

            {!hasMore && totalLoaded > 0 && (
              <p className="mt-8 text-center text-sm text-muted-foreground">
                You have reached the end of the list.
              </p>
            )}
          </main>
        </div>

        <ToolModal
          tool={selectedTool}
          isOpen={Boolean(selectedTool)}
          onClose={handleCloseModal}
          onUpvote={toggleUpvote}
          onSave={toggleSavedTool}
          isUpvoted={isToolUpvoted}
          isSaved={isToolSaved}
          onShare={() => setShowShareDialog(true)}
          showShareDialog={showShareDialog}
          onCloseShareDialog={() => setShowShareDialog(false)}
        />
      </div>
    </>
  );
}
