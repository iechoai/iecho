"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

interface UpvoteContextType {
  upvotedTools: string[];
  toggleUpvote: (toolId: string) => Promise<void>;
  isToolUpvoted: (toolId: string) => boolean;
}

const UpvoteContext = createContext<UpvoteContextType | undefined>(undefined);

const STORAGE_KEY = "upvotedTools";

export function UpvoteProvider({ children }: { children: ReactNode }) {
  const [upvotedTools, setUpvotedTools] = useState<string[]>([]);

  // Load upvoted tools from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setUpvotedTools(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse upvoted tools from local storage", e);
        }
      }
    }
  }, []);

  const toggleUpvote = async (toolId: string) => {
    const isUpvoted = upvotedTools.includes(toolId);

    if (isUpvoted) {
      // We don't support removing upvotes in the API yet, so just return or handle locally if needed.
      // For now, let's assume upvotes are permanent for the session/user context in this version,
      // or we can just prevent the action if already upvoted.
      // However, the UI implies toggling. If the API only supports adding, we should probably only allow adding.
      // But let's look at the API again.
      // The API is POST /api/upvote. It registers an upvote.
      // It checks if the user already upvoted. If so, it returns { added: false }.
      // So we can't really "remove" an upvote via this API.
      // For the UI, if the user clicks again, maybe we just tell them they already upvoted?
      // Or we can just ignore it.
      // But wait, the context name is `toggleUpvote`.
      // If I look at `ToolCard`, it calls `toggleUpvote`.
      // If the user clicks it and it's already upvoted, maybe we should just do nothing or show a toast.

      // Actually, let's just allow the local state to toggle off for the user experience,
      // but since the backend doesn't support removing, it might be inconsistent.
      // Let's check the API logic again.
      // API: `registerUpvote` checks if exists. If yes, returns { added: false }.
      // So we can't remove it.

      // Let's just prevent "un-upvoting" for now if the backend doesn't support it,
      // OR we can just keep the local state in sync with what the user *thinks* they did,
      // but that would be misleading if they refresh.

      // Best approach for now: Only allow upvoting. If they click again, maybe show a message "Already upvoted".
      // But the UI shows it as a toggle button (highlighted if upvoted).

      // Let's implement it as:
      // If not upvoted: Call API. If success, add to local state.
      // If upvoted: Do nothing (or maybe show a toast saying "You already upvoted this").

      toast.info("You have already upvoted this tool.");
      return;
    }

    // Optimistic update
    const newUpvotedTools = [...upvotedTools, toolId];
    setUpvotedTools(newUpvotedTools);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newUpvotedTools));

    try {
      const response = await fetch("/api/upvote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toolId }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("You are voting too fast. Please try again later.");
        } else {
          throw new Error("Failed to upvote");
        }
        // Revert state
        const reverted = upvotedTools.filter((id) => id !== toolId);
        setUpvotedTools(reverted);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reverted));
        return;
      }

      const data = await response.json();

      // If the API says we didn't add it (e.g. duplicate on server side but not local),
      // we should probably keep it as upvoted locally to match server state.
      if (!data.meta.added) {
        // It was already upvoted on server. Ensure it is in our local list.
        if (!newUpvotedTools.includes(toolId)) {
          setUpvotedTools([...newUpvotedTools, toolId]);
          window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify([...newUpvotedTools, toolId])
          );
        }
      }

      toast.success("Upvoted!");
    } catch (error) {
      console.error("Error upvoting:", error);
      toast.error("Something went wrong. Please try again.");

      // Revert state
      const reverted = upvotedTools.filter((id) => id !== toolId);
      setUpvotedTools(reverted);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reverted));
    }
  };

  const isToolUpvoted = (toolId: string) => upvotedTools.includes(toolId);

  return (
    <UpvoteContext.Provider
      value={{ upvotedTools, toggleUpvote, isToolUpvoted }}
    >
      {children}
    </UpvoteContext.Provider>
  );
}

export function useUpvotes() {
  const context = useContext(UpvoteContext);
  if (context === undefined) {
    throw new Error("useUpvotes must be used within an UpvoteProvider");
  }
  return context;
}
