"use client";

import { motion } from "motion/react";

type AudienceFilter = "all" | "students" | "developers";

interface AudienceFilterProps {
  selectedAudience: AudienceFilter;
  onAudienceSelect: (audience: AudienceFilter) => void;
}

export function AudienceFilter({
  selectedAudience,
  onAudienceSelect,
}: AudienceFilterProps) {
  return (
    <div className="mb-4 sm:mb-6 overflow-x-auto pb-2">
      <div className="relative inline-flex items-center gap-1 bg-white dark:bg-card/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200 dark:border-border min-w-fit">
        <button
          onClick={() => onAudienceSelect("all")}
          className={`relative z-10 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-colors duration-200 whitespace-nowrap ${
            selectedAudience === "all"
              ? "text-white dark:text-primary-foreground"
              : "text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground"
          }`}
        >
          {selectedAudience === "all" && (
            <motion.div
              layoutId="audienceIndicator"
              className="absolute inset-0 bg-[#0F5F6A] dark:bg-primary rounded-full shadow-md dark:shadow-primary/20"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">All</span>
        </button>
        <button
          onClick={() => onAudienceSelect("students")}
          className={`relative z-10 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-colors duration-200 whitespace-nowrap ${
            selectedAudience === "students"
              ? "text-white dark:text-primary-foreground"
              : "text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground"
          }`}
        >
          {selectedAudience === "students" && (
            <motion.div
              layoutId="audienceIndicator"
              className="absolute inset-0 bg-[#0F5F6A] dark:bg-primary rounded-full shadow-md dark:shadow-primary/20"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">Students</span>
        </button>
        <button
          onClick={() => onAudienceSelect("developers")}
          className={`relative z-10 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-colors duration-200 whitespace-nowrap ${
            selectedAudience === "developers"
              ? "text-white dark:text-primary-foreground"
              : "text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground"
          }`}
        >
          {selectedAudience === "developers" && (
            <motion.div
              layoutId="audienceIndicator"
              className="absolute inset-0 bg-[#0F5F6A] dark:bg-primary rounded-full shadow-md dark:shadow-primary/20"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">Developers</span>
        </button>
      </div>
    </div>
  );
}
