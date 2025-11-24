"use client";

import { useState } from "react";
import { ToolsGrid } from "../../../components/tools/ToolsGrid";
import { ToolModal } from "../../../components/tools/ToolModal";
import type { ToolListItem } from "../../../lib/types";
import { useSavedTools } from "../../../components/SavedToolsContext";
import { useUpvotes } from "../../../components/UpvoteContext";

interface CollectionClientProps {
  tools: ToolListItem[];
}

export function CollectionClient({ tools }: CollectionClientProps) {
  const [selectedTool, setSelectedTool] = useState<ToolListItem | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const { toggleSavedTool, isToolSaved } = useSavedTools();
  const { toggleUpvote, isToolUpvoted } = useUpvotes();

  return (
    <>
      <ToolsGrid
        tools={tools}
        onToolPreview={setSelectedTool}
      />
      <ToolModal
        tool={selectedTool}
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        onUpvote={toggleUpvote}
        onSave={toggleSavedTool}
        isUpvoted={isToolUpvoted}
        isSaved={isToolSaved}
        onShare={() => setShowShareDialog(true)}
        showShareDialog={showShareDialog}
        onCloseShareDialog={() => setShowShareDialog(false)}
      />
    </>
  );
}
