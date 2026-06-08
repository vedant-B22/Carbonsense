import React from "react";

/**
 * Global Page Loader Component.
 * Displays a premium skeleton loading state during route navigation.
 * 
 * @returns {React.ReactElement} The loading state component.
 */
export default function Loading() {
  return (
    <div className="flex-1 flex flex-col space-y-8 animate-pulse p-4 max-w-4xl mx-auto w-full">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-forestMuted rounded w-1/3" />
        <div className="h-4 bg-forestMuted rounded w-2/3" />
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="h-64 bg-card/50 border border-accent/5 rounded-2xl p-6 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-accent/10 border-t-accent animate-spin" />
          </div>
          <div className="h-4 bg-forestMuted rounded w-full" />
          <div className="h-4 bg-forestMuted rounded w-5/6" />
        </div>

        <div className="space-y-6">
          <div className="h-40 bg-card/50 border border-accent/5 rounded-2xl p-6 space-y-3">
            <div className="h-4 bg-forestMuted rounded w-1/2" />
            <div className="h-3 bg-forestMuted rounded w-full" />
            <div className="h-3 bg-forestMuted rounded w-4/5" />
          </div>
          <div className="h-48 bg-card/50 border border-accent/5 rounded-2xl p-6 space-y-3">
            <div className="h-4 bg-forestMuted rounded w-2/3" />
            <div className="h-3 bg-forestMuted rounded w-full" />
            <div className="h-3 bg-forestMuted rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
