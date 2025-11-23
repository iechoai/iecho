import { Skeleton } from "../../components/ui/skeleton";

export default function ToolsLoading() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-background transition-colors duration-300">
      {/* Header Skeleton */}
      <div className="h-16 border-b bg-white dark:bg-card flex items-center px-4 sm:px-6 lg:px-8 gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <div className="flex-1" />
        <Skeleton className="h-10 w-64 rounded-md hidden sm:block" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar Skeleton */}
        <div className="hidden md:block w-64 border-r bg-white dark:bg-sidebar/50 p-6 space-y-4">
          <Skeleton className="h-6 w-24 mb-6" />
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-hidden flex flex-col gap-6">
          {/* Audience Filter Skeleton */}
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>

          {/* Results Header Skeleton */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-32" />
          </div>

          {/* Tools Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
