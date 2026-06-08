"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CO2Molecule from "./CO2Molecule";
import StatsStrip from "./StatsStrip";

/**
 * HeroSection component.
 * Renders the landing page content, tagline, live CO2 counter, and stats strip.
 * @returns {React.ReactElement} The hero section layout.
 */
export default function HeroSection() {
  const [co2Counter, setCo2Counter] = useState(0);

  useEffect(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diffInSeconds = (now.getTime() - startOfYear.getTime()) / 1000;
    
    // Emissions count rate: ~1,176,432 kg/second
    const baseEmissions = diffInSeconds * 1176432.38;
    setCo2Counter(baseEmissions);

    const interval = setInterval(() => {
      const increment = 58821.6 + (Math.random() - 0.5) * 10000;
      setCo2Counter((prev) => prev + increment);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden py-12 md:py-24 text-center">
      {/* Background Animated Molecules */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-25">
        <CO2Molecule className="top-[15%] left-[10%] w-32 h-32 animate-molecule" />
        <CO2Molecule className="bottom-[20%] right-[12%] w-48 h-48 animate-molecule-slow" opacity="opacity-20" />
        <CO2Molecule className="top-[40%] right-[20%] w-20 h-20 animate-molecule-fast" opacity="opacity-15" />
      </div>

      <div className="z-10 flex flex-col items-center justify-center max-w-4xl px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-text leading-tight tracking-tighter">
            Know your impact.<br />
            <span className="text-accent">Own your future.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.0 }}
          className="mt-12 glass-panel p-6 sm:p-8 rounded-2xl w-full max-w-xl border border-accent/20"
        >
          <h2 className="text-xs uppercase tracking-widest text-textMuted font-body font-bold mb-2">
            Estimated Global CO₂ Emitted in {new Date().getFullYear()}
          </h2>
          <div className="font-heading text-2xl sm:text-3xl font-bold text-accent font-mono py-2 tracking-tight">
            {co2Counter ? Math.round(co2Counter).toLocaleString() : "Calculating..."}{" "}
            <span className="text-text text-lg sm:text-xl font-body font-medium">kg</span>
          </div>
          <p className="text-xs text-textMuted/70 font-body mt-2">
            Increasing by approximately 1,176,432 kg every second.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-12">
          <Link
            href="/calculator"
            className="group relative inline-flex items-center justify-center bg-accent text-background font-heading font-extrabold text-base uppercase tracking-wider px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-accent/50 shadow-[0_0_20px_rgba(168,255,62,0.3)]"
          >
            Calculate My Footprint
            <svg className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1.0 }} className="mt-16 w-full border-t border-accent/15 pt-8">
          <StatsStrip />
        </motion.div>
      </div>
    </section>
  );
}
