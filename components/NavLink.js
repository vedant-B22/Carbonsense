import React from "react";
import Link from "next/link";

/**
 * NavLink component.
 * Renders an active-aware navigation menu link element.
 * @param {Object} props - React props.
 * @param {string} props.href - Destination path URL.
 * @param {string} props.name - Text label name.
 * @param {boolean} props.isActive - True if pathname matches href destination.
 * @param {boolean} [props.disabled] - Optional parameter to restrict interactions.
 * @returns {React.ReactElement} The styled link or disabled span element.
 */
export default function NavLink({ href, name, isActive, disabled = false }) {
  if (disabled) {
    return (
      <span
        className="text-textMuted/40 font-body text-sm font-medium cursor-not-allowed select-none"
        title="Calculate your footprint first to view the dashboard"
      >
        {name}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`font-body text-sm font-medium transition-all duration-200 relative py-1 focus:outline-none focus:ring-2 focus:ring-accent rounded-md px-2 ${
        isActive ? "text-accent font-semibold" : "text-textMuted hover:text-text"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {name}
      {isActive && (
        <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent rounded-full" />
      )}
    </Link>
  );
}
