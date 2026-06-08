"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [co2Counter, setCo2Counter] = useState(0);

  // Set up the live CO2 counter
  useEffect(() => {
    // Current year emissions: ~37,100,000,000 metric tons/year = 37,100,000,000,000 kg/year
    // Per second: ~1,176,432 kg
    // Per 50ms: ~58,821.6 kg
    
    // Estimate base on the current date of the year (2026-06-08 is day 159 of 365)
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diffInSeconds = (now.getTime() - startOfYear.getTime()) / 1000;
    
    const baseEmissions = diffInSeconds * 1176432.38; // base kg emitted since Jan 1st
    setCo2Counter(baseEmissions);

    const interval = setInterval(() => {
      // Increase by a random jitter around the actual avg rate (1,176,432 kg / 20 steps per second)
      const increment = 58821.6 + (Math.random() - 0.5) * 10000;
      setCo2Counter((prev) => prev + increment);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const formatCounter = (num) => {
    return Math.round(num).toLocaleString();
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden py-12 md:py-24 text-center">
      {/* Background Animated Molecules */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-25">
        {/* Molecule 1 */}
        <div className="absolute top-[15%] left-[10%] animate-molecule w-32 h-32">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-accent/30">
            <circle cx="50" cy="50" r="16" fill="currentColor" />
            <text x="50" y="55" fill="#050f07" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>
            
            <circle cx="15" cy="50" r="10" fill="currentColor" />
            <text x="15" y="54" fill="#050f07" fontSize="8" fontWeight="bold" textAnchor="middle">O</text>
            
            <circle cx="85" cy="50" r="10" fill="currentColor" />
            <text x="85" y="54" fill="#050f07" fontSize="8" fontWeight="bold" textAnchor="middle">O</text>

            {/* Double bonds */}
            <line x1="31" y1="47" x2="41" y2="47" stroke="currentColor" strokeWidth="2" />
            <line x1="31" y1="53" x2="41" y2="53" stroke="currentColor" strokeWidth="2" />
            <line x1="59" y1="47" x2="69" y2="47" stroke="currentColor" strokeWidth="2" />
            <line x1="59" y1="53" x2="69" y2="53" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Molecule 2 */}
        <div className="absolute bottom-[20%] right-[12%] animate-molecule-slow w-48 h-48">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-accent/20">
            <circle cx="50" cy="50" r="16" fill="currentColor" />
            <text x="50" y="55" fill="#050f07" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>
            
            <circle cx="20" cy="30" r="10" fill="currentColor" />
            <text x="20" y="34" fill="#050f07" fontSize="8" fontWeight="bold" textAnchor="middle">O</text>
            
            <circle cx="80" cy="70" r="10" fill="currentColor" />
            <text x="80" y="74" fill="#050f07" fontSize="8" fontWeight="bold" textAnchor="middle">O</text>

            {/* Double bonds */}
            <line x1="33" y1="39" x2="40" y2="44" stroke="currentColor" strokeWidth="2" />
            <line x1="30" y1="42" x2="37" y2="47" stroke="currentColor" strokeWidth="2" />
            <line x1="63" y1="58" x2="70" y2="63" stroke="currentColor" strokeWidth="2" />
            <line x1="60" y1="61" x2="67" y2="66" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Molecule 3 */}
        <div className="absolute top-[40%] right-[20%] animate-molecule-fast w-20 h-20">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-accent/15">
            <circle cx="50" cy="50" r="16" fill="currentColor" />
            <circle cx="15" cy="50" r="10" fill="currentColor" />
            <circle cx="85" cy="50" r="10" fill="currentColor" />
            <line x1="31" y1="47" x2="41" y2="47" stroke="currentColor" strokeWidth="2" />
            <line x1="31" y1="53" x2="41" y2="53" stroke="currentColor" strokeWidth="2" />
            <line x1="59" y1="47" x2="69" y2="47" stroke="currentColor" strokeWidth="2" />
            <line x1="59" y1="53" x2="69" y2="53" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="z-10 flex flex-col items-center justify-center max-w-4xl px-4">
        {/* Animated Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-text leading-tight tracking-tighter">
            Know your impact.<br />
            <span className="text-accent">Own your future.</span>
          </h1>
        </motion.div>

        {/* Live CO2 emissions counter container */}
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
            {co2Counter ? formatCounter(co2Counter) : "Calculating..."} <span className="text-text text-lg sm:text-xl font-body font-medium">kg</span>
          </div>
          <p className="text-xs text-textMuted/70 font-body mt-2">
            Increasing by approximately 1,176,432 kg every second.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12"
        >
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

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.0 }}
          className="mt-16 w-full border-t border-accent/15 pt-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center divide-y sm:divide-y-0 sm:divide-x divide-accent/15">
            <div className="flex flex-col items-center py-2 sm:py-0">
              <span className="font-body text-xs text-textMuted uppercase tracking-wider font-semibold">World Average</span>
              <span className="font-heading text-xl font-bold text-text mt-1">4,800 <span className="text-xs font-body text-textMuted font-medium">kg/yr</span></span>
            </div>
            <div className="flex flex-col items-center py-2 sm:py-0">
              <span className="font-body text-xs text-textMuted uppercase tracking-wider font-semibold">India Average</span>
              <span className="font-heading text-xl font-bold text-text mt-1">1,900 <span className="text-xs font-body text-textMuted font-medium">kg/yr</span></span>
            </div>
            <div className="flex flex-col items-center py-2 sm:py-0">
              <span className="font-body text-xs text-accent uppercase tracking-wider font-bold">Paris Target</span>
              <span className="font-heading text-xl font-bold text-accent mt-1">2,000 <span className="text-xs font-body text-accent/70 font-semibold">kg/yr</span></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
