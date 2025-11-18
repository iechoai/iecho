"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface UpvoteContextType {
  upvotedTools: string[];
  toggleUpvote: (toolId: string) => void;
  isToolUpvoted: (toolId: string) => boolean;
}

const UpvoteContext = createContext<UpvoteContextType | undefined>(undefined);

export function UpvoteProvider({ children }: { children: ReactNode }) {
  const [upvotedTools, setUpvotedTools] = useState<string[]>([]);

  const toggleUpvote = (toolId: string) => {
    setUpvotedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
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
