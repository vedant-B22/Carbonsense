import React from "react";

/**
 * CO2Molecule component.
 * Renders a CSS-animated background CO2 molecule SVG representation.
 * @param {Object} props - React props.
 * @param {string} props.className - Custom CSS class names to apply to the molecule wrapper (e.g. animation speed classes).
 * @param {string} props.opacity - Opacity of the molecule.
 * @returns {React.ReactElement} The CO2 molecule component.
 */
export default function CO2Molecule({ className = "", opacity = "opacity-25" }) {
  return (
    <div className={`absolute pointer-events-none ${className} ${opacity}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-accent/30"
        role="img"
        aria-label="Floating CO2 Molecule Animation"
      >
        <circle cx="50" cy="50" r="16" fill="currentColor" />
        <text x="50" y="55" fill="#050f07" fontSize="12" fontWeight="bold" textAnchor="middle">
          C
        </text>

        <circle cx="15" cy="50" r="10" fill="currentColor" />
        <text x="15" y="54" fill="#050f07" fontSize="8" fontWeight="bold" textAnchor="middle">
          O
        </text>

        <circle cx="85" cy="50" r="10" fill="currentColor" />
        <text x="85" y="54" fill="#050f07" fontSize="8" fontWeight="bold" textAnchor="middle">
          O
        </text>

        {/* Double bonds */}
        <line x1="31" y1="47" x2="41" y2="47" stroke="currentColor" strokeWidth="2" />
        <line x1="31" y1="53" x2="41" y2="53" stroke="currentColor" strokeWidth="2" />
        <line x1="59" y1="47" x2="69" y2="47" stroke="currentColor" strokeWidth="2" />
        <line x1="59" y1="53" x2="69" y2="53" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}
