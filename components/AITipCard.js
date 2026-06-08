import React from "react";
import { motion } from "framer-motion";

/**
 * Helper to retrieve CSS classes for tip categories.
 * @param {string} cat - Tip category.
 * @returns {string} Tailwind CSS class string.
 */
function getCategoryColor(cat) {
  const maps = {
    Transport: "border-sky-500/20 text-sky-400 bg-sky-500/5",
    Energy: "border-amber-500/20 text-amber-400 bg-amber-500/5",
    Food: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
    Lifestyle: "border-purple-500/20 text-purple-400 bg-purple-500/5"
  };
  return maps[cat] || "border-accent/20 text-accent bg-accent/5";
}

/**
 * Helper to retrieve CSS classes for tip difficulty levels.
 * @param {string} diff - Tip difficulty.
 * @returns {string} Tailwind CSS class string.
 */
function getDifficultyColor(diff) {
  const maps = {
    Easy: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
    Medium: "border-amber-500/20 text-amber-400 bg-amber-500/5",
    Hard: "border-rose-500/20 text-rose-400 bg-rose-500/5"
  };
  return maps[diff] || "border-accent/20 text-accent bg-accent/5";
}

/**
 * AITipCard component.
 * Renders an animated card detailing a carbon-saving recommendation.
 * @param {Object} props - React props.
 * @param {Object} props.tip - The tip detail object.
 * @param {string} props.tip.title - The title of the tip.
 * @param {string} props.tip.description - The detail description of the tip.
 * @param {number} props.tip.estimatedSaving - Estimated savings in kg CO2/year.
 * @param {string} props.tip.category - Category (e.g. Energy, Transport).
 * @param {string} props.tip.difficulty - Difficulty rating (e.g. Easy, Medium).
 * @returns {React.ReactElement} The card component.
 */
export default function AITipCard({ tip }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
      className="glass-panel p-6 rounded-2xl border border-accent/10 flex flex-col justify-between hover:border-accent/30 transition-all duration-300"
    >
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getCategoryColor(tip.category)}`}>
            {tip.category}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getDifficultyColor(tip.difficulty)}`}>
            {tip.difficulty}
          </span>
        </div>
        <h3 className="font-heading text-lg font-bold text-text mb-2 line-clamp-1">{tip.title}</h3>
        <p className="text-xs text-textMuted font-body leading-relaxed line-clamp-4">{tip.description}</p>
      </div>
      <div className="border-t border-accent/5 pt-4 mt-4 flex justify-between items-center">
        <span className="text-[10px] text-textMuted uppercase font-bold tracking-wider">Estimated Savings</span>
        <span className="text-sm font-heading font-extrabold text-accent">-{tip.estimatedSaving.toLocaleString()} kg CO₂/yr</span>
      </div>
    </motion.div>
  );
}
