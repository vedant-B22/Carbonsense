import React from "react";
import { BENCHMARKS } from "@/lib/constants";

/**
 * StatsStrip component.
 * Displays national and global annual carbon averages alongside the Paris climate target.
 * @returns {React.ReactElement} The stats strip layout.
 */
export default function StatsStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center divide-y sm:divide-y-0 sm:divide-x divide-accent/15">
      <div className="flex flex-col items-center py-2 sm:py-0">
        <span className="font-body text-xs text-textMuted uppercase tracking-wider font-semibold">
          World Average
        </span>
        <span className="font-heading text-xl font-bold text-text mt-1">
          {BENCHMARKS.worldAvg.toLocaleString()}{" "}
          <span className="text-xs font-body text-textMuted font-medium">kg/yr</span>
        </span>
      </div>
      <div className="flex flex-col items-center py-2 sm:py-0">
        <span className="font-body text-xs text-textMuted uppercase tracking-wider font-semibold">
          India Average
        </span>
        <span className="font-heading text-xl font-bold text-text mt-1">
          {BENCHMARKS.indiaAvg.toLocaleString()}{" "}
          <span className="text-xs font-body text-textMuted font-medium">kg/yr</span>
        </span>
      </div>
      <div className="flex flex-col items-center py-2 sm:py-0">
        <span className="font-body text-xs text-accent uppercase tracking-wider font-bold">
          Paris Target
        </span>
        <span className="font-heading text-xl font-bold text-accent mt-1">
          {BENCHMARKS.parisTarget.toLocaleString()}{" "}
          <span className="text-xs font-body text-accent/70 font-semibold">kg/yr</span>
        </span>
      </div>
    </div>
  );
}
