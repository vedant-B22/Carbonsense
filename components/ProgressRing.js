import React from "react";

/**
 * ProgressRing component.
 * Renders an animated SVG progress circle detailing percent completion.
 * @param {Object} props - React props.
 * @param {number} props.percent - Percentage completed (0 to 100).
 * @returns {React.ReactElement} The SVG circle layout.
 */
export default function ProgressRing({ percent }) {
  const radius = 62;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-36 h-36 flex items-center justify-center mb-6">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="72"
          cy="72"
          r={normalizedRadius}
          stroke="#122315"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx="72"
          cy="72"
          r={normalizedRadius}
          stroke="#a8ff3e"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference + " " + circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute font-heading text-3xl font-extrabold text-text">
        {percent}%
      </div>
    </div>
  );
}
