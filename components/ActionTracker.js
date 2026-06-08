"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useGlobalContext } from "./GlobalContext";
import { TRACKER_ACTIONS } from "@/lib/trackerActions";
import ActionItem from "./ActionItem";
import ProgressRing from "./ProgressRing";

/**
 * ActionTracker component.
 * Manages the checklist of 20 green actions, updates completion status, and displays savings.
 * @returns {React.ReactElement} The action tracking dashboard.
 */
export default function ActionTracker() {
  const { completedActions, updateCompletedActions } = useGlobalContext();
  const [filter, setFilter] = useState("All");

  const totalActions = TRACKER_ACTIONS.length;
  const completedCount = completedActions.length;
  const percent = totalActions > 0 ? Math.round((completedCount / totalActions) * 100) : 0;

  const totalSavings = TRACKER_ACTIONS
    .filter((a) => completedActions.includes(a.id))
    .reduce((sum, a) => sum + a.saving, 0);

  const handleToggle = (id) => {
    let next;
    if (completedActions.includes(id)) {
      next = completedActions.filter((item) => item !== id);
    } else {
      next = [...completedActions, id];
    }
    
    const nextPercent = Math.round((next.length / totalActions) * 100);
    if ((percent < 50 && nextPercent >= 50) || (percent < 100 && nextPercent === 100)) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ["#a8ff3e", "#2e6b36", "#ffffff"] });
    }
    updateCompletedActions(next);
  };

  const filteredActions = filter === "All"
    ? TRACKER_ACTIONS
    : TRACKER_ACTIONS.filter((a) => a.category === filter);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-accent/15 flex flex-col items-center justify-center text-center lg:sticky lg:top-24 h-fit">
        <span className="text-[10px] text-accent uppercase font-bold tracking-widest font-body mb-4">Your Impact Progress</span>
        <ProgressRing percent={percent} />
        <h3 className="font-heading text-lg font-bold mb-1">{completedCount} of {totalActions} Actions Done</h3>
        <p className="text-xs text-textMuted font-body mb-6">Hit 50% and 100% to celebrate milestones!</p>
        <div className="border-t border-accent/10 w-full pt-6">
          <span className="text-[10px] text-textMuted uppercase font-bold tracking-wider block mb-1">Annual Savings Achieved</span>
          <span className="text-2xl font-heading font-extrabold text-accent font-mono">{totalSavings.toLocaleString()} kg CO₂/yr</span>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-wrap gap-2 border-b border-accent/10 pb-4">
          {["All", "Transport", "Energy", "Food", "Lifestyle"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold font-body transition ${
                filter === cat ? "bg-accent text-background" : "bg-forestMuted/60 text-textMuted hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {filteredActions.map((action) => (
            <ActionItem
              key={action.id}
              action={action}
              isDone={completedActions.includes(action.id)}
              onToggle={() => handleToggle(action.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
