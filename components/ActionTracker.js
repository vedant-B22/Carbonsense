"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useGlobalContext } from "./GlobalContext";
import { TRACKER_ACTIONS } from "@/lib/trackerActions";

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
      {/* Progress & Savings Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-accent/15 flex flex-col items-center justify-center text-center lg:sticky lg:top-24 h-fit">
        <span className="text-[10px] text-accent uppercase font-bold tracking-widest font-body mb-4">Your Impact Progress</span>
        {/* SVG Progress Ring */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="72" cy="72" r="62" stroke="#122315" strokeWidth="10" fill="transparent" />
            <circle
              cx="72" cy="72" r="62" stroke="#a8ff3e" strokeWidth="10" fill="transparent"
              strokeDasharray={2 * Math.PI * 62}
              strokeDashoffset={2 * Math.PI * 62 * (1 - percent / 100)}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute font-heading text-3xl font-extrabold text-text">{percent}%</div>
        </div>
        <h3 className="font-heading text-lg font-bold mb-1">{completedCount} of {totalActions} Actions Done</h3>
        <p className="text-xs text-textMuted font-body mb-6">Hit 50% and 100% to celebrate milestones!</p>
        <div className="border-t border-accent/10 w-full pt-6">
          <span className="text-[10px] text-textMuted uppercase font-bold tracking-wider block mb-1">Annual Savings Achieved</span>
          <span className="text-2xl font-heading font-extrabold text-accent font-mono">{totalSavings.toLocaleString()} kg CO₂/yr</span>
        </div>
      </div>

      {/* Action Checklist */}
      <div className="lg:col-span-2 space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 border-b border-accent/10 pb-4">
          {["All", "Transport", "Energy", "Food", "Lifestyle"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold font-body transition ${
                filter === cat
                  ? "bg-accent text-background"
                  : "bg-forestMuted/60 text-textMuted hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action Cards */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {filteredActions.map((action) => {
            const isDone = completedActions.includes(action.id);
            return (
              <label
                key={action.id}
                htmlFor={`chk-${action.id}`}
                className={`flex items-start p-4 rounded-xl border transition duration-200 cursor-pointer ${
                  isDone
                    ? "bg-accent/5 border-accent/30"
                    : "bg-forestMuted/40 border-accent/5 hover:border-accent/15"
                }`}
              >
                <input
                  type="checkbox"
                  id={`chk-${action.id}`}
                  checked={isDone}
                  onChange={() => handleToggle(action.id)}
                  className="mt-1 mr-4 accent-accent w-4 h-4 cursor-pointer focus:ring-2 focus:ring-accent"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-heading font-bold text-sm ${isDone ? "text-accent" : "text-text"}`}>{action.title}</h4>
                    <span className="text-[10px] font-mono text-accent">-{action.saving} kg</span>
                  </div>
                  <p className="text-xs text-textMuted font-body mt-1">{action.description}</p>
                  <div className="flex items-center space-x-2 mt-3">
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-forestMuted text-textMuted">{action.category}</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-forestMuted text-textMuted">{action.difficulty}</span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
