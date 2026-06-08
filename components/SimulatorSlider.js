import React from "react";

/**
 * SimulatorSlider component.
 * Renders a labeled range slider for the What-If carbon emissions simulator.
 * @param {Object} props - React props.
 * @param {string} props.id - HTML element ID of the input range.
 * @param {string} props.label - Friendly slider label names.
 * @param {number} props.min - Lower range boundary.
 * @param {number} props.max - Upper range boundary.
 * @param {number} props.value - Active range value.
 * @param {Function} props.onChange - Handler called on range value adjustments.
 * @param {string} props.displayValue - Formatted string showing details of the current reduction value.
 * @param {string} props.currentText - Help indicator showing original calculated base value.
 * @returns {React.ReactElement} The labeled range slider item.
 */
export default function SimulatorSlider({
  id,
  label,
  min,
  max,
  value,
  onChange,
  displayValue,
  currentText
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs font-semibold">
        <label htmlFor={id} className="text-textMuted">
          {label}
        </label>
        <span className="text-text font-mono">{displayValue}</span>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        className="w-full accent-accent bg-forestMuted cursor-pointer"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="text-[10px] text-textMuted/60 block">{currentText}</span>
    </div>
  );
}
