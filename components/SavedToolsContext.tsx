"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "savedTools";
const SYNC_DEBOUNCE_MS = 2000; // Wait 2s after last change before syncing to API

const readSavedToolsFromStorage = (): string[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((toolId): toolId is string => typeof toolId === "string");
    }
  } catch (error) {
    console.warn("Failed to read saved tools from localStorage", error);
  }

  return [];
};

const writeSavedToolsToStorage = (toolIds: string[]) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toolIds));
  } catch (error) {
    console.warn("Failed to persist saved tools", error);
  }
};

/**
 * Fetch saved tools from the API.
 * Falls back to localStorage if API fails.
 */
const fetchSavedToolsFromAPI = async (): Promise<string[] | null> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch("/api/collections", {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.data?.toolIds ?? [];
  } catch (error) {
    console.warn("Failed to fetch saved tools from API", error);
    return null;
  }
};

/**
 * Sync saved tools to the API.
 * Debounced to avoid excessive requests.
 */
const syncSavedToolsToAPI = async (toolIds: string[]): Promise<boolean> => {
  try {
    const response = await fetch("/api/collections", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolIds }),
    });
    return response.ok;
  } catch (error) {
    console.warn("Failed to sync saved tools to API", error);
    return false;
  }
};

interface SavedToolsContextType {
  savedTools: string[];
  toggleSavedTool: (toolId: string) => void;
  isToolSaved: (toolId: string) => boolean;
  reorderSavedTools: (newOrder: string[]) => void;
}

const SavedToolsContext = createContext<SavedToolsContextType | undefined>(
  undefined
);

export function SavedToolsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [savedTools, setSavedTools] = useState<string[]>([]);
  const [syncTimeoutId, setSyncTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // On mount: Load from localStorage first, then hydrate from API if available
  useEffect(() => {
    const localTools = readSavedToolsFromStorage();
    setSavedTools(localTools);

    // Try to fetch from API in the background
    fetchSavedToolsFromAPI().then((apiTools) => {
      if (apiTools && apiTools.length > 0) {
        // API has data, use it
        setSavedTools(apiTools);
        writeSavedToolsToStorage(apiTools);
      } else if (localTools.length > 0 && apiTools !== null) {
        // API is empty but we have local data - sync it up
        syncSavedToolsToAPI(localTools);
      }
    });
  }, []);

  // Persist to localStorage immediately, debounce API sync
  useEffect(() => {
    writeSavedToolsToStorage(savedTools);

    // Clear existing timeout
    if (syncTimeoutId) {
      clearTimeout(syncTimeoutId);
    }

    // Set new timeout for API sync
    const newTimeoutId = setTimeout(() => {
      syncSavedToolsToAPI(savedTools);
    }, SYNC_DEBOUNCE_MS);

    setSyncTimeoutId(newTimeoutId);

    // Cleanup on unmount
    return () => {
      if (newTimeoutId) {
        clearTimeout(newTimeoutId);
      }
    };
  }, [savedTools]);

  const toggleSavedTool = (toolId: string) => {
    setSavedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const isToolSaved = (toolId: string) => {
    return savedTools.includes(toolId);
  };

  const reorderSavedTools = (newOrder: string[]) => {
    setSavedTools(newOrder);
  };

  return (
    <SavedToolsContext.Provider
      value={{ savedTools, toggleSavedTool, isToolSaved, reorderSavedTools }}
    >
      {children}
    </SavedToolsContext.Provider>
  );
}

export function useSavedTools() {
  const context = useContext(SavedToolsContext);
  if (context === undefined) {
    throw new Error("useSavedTools must be used within a SavedToolsProvider");
  }
  return context;
}
