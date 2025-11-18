"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-card rounded-2xl shadow-xl border border-gray-200 dark:border-border p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-foreground mb-2">
              Oops! Something went wrong
            </h2>

            <p className="text-gray-600 dark:text-muted-foreground mb-6">
              We encountered an unexpected error. Don't worry, your data is
              safe.
            </p>

            {this.state.error && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-muted/30 rounded-lg text-left">
                <p className="text-xs font-mono text-gray-700 dark:text-muted-foreground break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                className="bg-[#0F5F6A] dark:bg-primary hover:bg-[#0F5F6A]/90 dark:hover:bg-primary/90 text-white dark:text-primary-foreground"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="hover:bg-gray-100 dark:hover:bg-muted/50"
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
