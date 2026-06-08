import React from "react";

/**
 * ChartSkeleton component.
 * Renders an animated pulse skeleton loader card for chart fallback loads.
 * @returns {React.ReactElement} The loading loader skeleton frame.
 */
export default function ChartSkeleton() {
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center space-y-4 animate-pulse"
      role="status"
      aria-label="Loading analytics charts..."
    >
      <div className="rounded-full bg-forestMuted w-32 h-32" />
      <div className="h-4 bg-forestMuted rounded w-3/4" />
    </div>
  );
}
