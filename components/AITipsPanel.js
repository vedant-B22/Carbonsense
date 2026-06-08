"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AITipCard from "./AITipCard";

/**
 * AITipsPanel component.
 * Invokes and displays personalized AI carbon-reduction tips from Gemini.
 * @param {Object} props - React props.
 * @param {Object} props.footprint - The carbon calculation state data.
 * @returns {React.ReactElement} The AI insights layout block.
 */
export default function AITipsPanel({ footprint }) {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAITips = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(footprint)
      });
      if (!res.ok) throw new Error("Failed to generate tips. Please try again.");
      const data = await res.json();
      setTips(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-12 border-t border-accent/15 pt-12">
      <div className="text-center max-w-lg mb-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3">Personalized Carbon Reduction Plan</h2>
        <p className="text-sm text-textMuted font-body leading-relaxed">
          Leverage our Gemini 2.0 carbon model to generate an optimized, personalized savings plan based on your calculation.
        </p>
      </div>

      {tips.length === 0 && !loading && (
        <button
          onClick={fetchAITips}
          className="px-8 py-3 rounded-full bg-accent text-background font-heading font-extrabold text-sm uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(168,255,62,0.2)] focus:outline-none"
        >
          Get AI Insights
        </button>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-accent/5 h-[200px] animate-pulse flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-4 bg-forestMuted rounded w-1/3" />
                <div className="h-6 bg-forestMuted rounded w-3/4" />
                <div className="h-12 bg-forestMuted rounded w-full" />
              </div>
              <div className="h-4 bg-forestMuted rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-rose-400 font-body text-sm bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-lg mt-4">{error}</p>}

      {tips.length > 0 && !loading && (
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"
        >
          {tips.map((tip, idx) => (
            <AITipCard key={idx} tip={tip} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
