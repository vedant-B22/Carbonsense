"use client";

import React from "react";
import Link from "next/link";
import { useGlobalContext } from "@/components/GlobalContext";
import ChartsPanel from "@/components/ChartsPanel";
import WhatIfSimulator from "@/components/WhatIfSimulator";
import AITipsPanel from "@/components/AITipsPanel";

export default function DashboardPage() {
  const { footprint, isCalculated, isLoaded } = useGlobalContext();

  if (!isLoaded) {
    return (
      <div className="w-full flex justify-center items-center py-24" aria-live="polite">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent" />
      </div>
    );
  }

  if (!isCalculated) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-16 px-6 glass-panel rounded-3xl border border-accent/15">
        <h1 className="font-heading text-2xl font-bold mb-3">No Footprint Data</h1>
        <p className="text-sm text-textMuted font-body leading-relaxed mb-6">
          To view your carbon dashboard, please complete the step-by-step calculator first.
        </p>
        <Link
          href="/calculator"
          className="inline-block bg-accent text-background font-heading font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200 shadow-[0_0_15px_rgba(168,255,62,0.2)] focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Start Calculator
        </Link>
      </div>
    );
  }

  const getScoreLabel = (score) => {
    if (score < 2000) return { label: "Excellent (Paris Compliant)", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" };
    if (score < 4000) return { label: "Good", color: "text-accent border-accent/20 bg-accent/5" };
    if (score < 6000) return { label: "Above Average", color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5" };
    if (score < 9000) return { label: "High", color: "text-amber-500 border-amber-500/20 bg-amber-500/5" };
    return { label: "Very High", color: "text-rose-500 border-rose-500/20 bg-rose-500/5" };
  };

  const scoreInfo = getScoreLabel(footprint.total);

  return (
    <div className="w-full space-y-10 py-6">
      {/* Header & Total Score Hero */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center glass-panel p-6 sm:p-8 rounded-3xl border border-accent/15 gap-6">
        <div>
          <span className="text-[10px] text-accent uppercase font-bold tracking-widest font-body">Annual Carbon Footprint</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight mt-1 flex items-baseline gap-2">
            {footprint.total.toLocaleString()}
            <span className="text-base sm:text-lg text-textMuted font-body font-medium">kg CO₂/yr</span>
          </h1>
        </div>
        <div className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider ${scoreInfo.color}`}>
          {scoreInfo.label}
        </div>
      </div>

      {/* Visual Analytics */}
      <ChartsPanel footprint={footprint} />

      {/* Simulator */}
      <WhatIfSimulator footprint={footprint} />

      {/* AI Tips */}
      <AITipsPanel footprint={footprint} />
    </div>
  );
}
