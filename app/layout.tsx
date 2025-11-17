import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { SavedToolsProvider } from "../components/SavedToolsContext";
import { UpvoteProvider } from "../components/UpvoteContext";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { ToasterWrapper } from "../components/ToasterWrapper";

export const metadata: Metadata = {
  title: "IechoAI",
  description: "Curated tools for students & developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <SavedToolsProvider>
              <UpvoteProvider>
                {children}
                <ToasterWrapper />
              </UpvoteProvider>
            </SavedToolsProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}