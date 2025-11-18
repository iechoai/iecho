"use client";

import { Toaster } from "sonner";
import { useTheme } from "./ThemeProvider";

export function ToasterWrapper() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme}
      position="bottom-center"
      toastOptions={{
        style: {
          background: theme === "dark" ? "hsl(var(--card))" : "white",
          color: theme === "dark" ? "hsl(var(--foreground))" : "black",
          border: `1px solid ${
            theme === "dark" ? "hsl(var(--border))" : "#e5e7eb"
          }`,
        },
      }}
    />
  );
}
