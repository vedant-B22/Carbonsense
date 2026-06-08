"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "./GlobalContext";
import NavLink from "./NavLink";

/**
 * Navbar component.
 * Renders the top navigation header with desktop and mobile drop down items.
 * @returns {React.ReactElement} The styled navigation bar.
 */
export default function Navbar() {
  const pathname = usePathname();
  const { isCalculated } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Calculator", path: "/calculator" },
    { name: "Dashboard", path: "/dashboard", disabled: !isCalculated },
    { name: "Tracker", path: "/tracker" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-accent/10 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
      <Link href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-accent rounded-md p-1" aria-label="CarbonSense Home">
        <svg className="w-8 h-8 text-accent animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
        <span className="font-heading text-xl font-bold tracking-tight text-text hover:text-accent transition-colors duration-200">
          Carbon<span className="text-accent">Sense</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            href={item.path}
            name={item.name}
            isActive={pathname === item.path}
            disabled={item.disabled}
          />
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-text hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded-md p-1"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        aria-controls="mobile-menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div id="mobile-menu" className="absolute top-16 left-0 right-0 glass-panel border-b border-accent/10 py-4 flex flex-col items-center space-y-4 md:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            if (item.disabled) {
              return <span key={item.path} className="text-textMuted/40 font-body text-base py-2">{item.name} (Calculated first)</span>;
            }
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`font-body text-base font-medium transition-all duration-200 w-full text-center py-2 ${
                  isActive ? "text-accent bg-accent/5 font-semibold" : "text-textMuted hover:text-text"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
