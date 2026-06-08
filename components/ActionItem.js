import React from "react";

/**
 * ActionItem component.
 * Renders an individual checkbox card representing a green lifestyle action.
 * @param {Object} props - React props.
 * @param {Object} props.action - The action object details.
 * @param {string} props.action.id - Unique ID of the action.
 * @param {string} props.action.title - Short header name.
 * @param {string} props.action.description - Helpful context descriptions.
 * @param {string} props.action.category - Categories (Transport, Energy, Food, Lifestyle).
 * @param {string} props.action.difficulty - Easy, Medium, or Hard level.
 * @param {number} props.action.saving - Emitted savings in kg/year.
 * @param {boolean} props.isDone - True if the action is checked.
 * @param {Function} props.onToggle - Toggles the check state.
 * @returns {React.ReactElement} The list card label and input row.
 */
export default function ActionItem({ action, isDone, onToggle }) {
  return (
    <label
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
        onChange={onToggle}
        className="mt-1 mr-4 accent-accent w-4 h-4 cursor-pointer focus:ring-2 focus:ring-accent"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className={`font-heading font-bold text-sm ${isDone ? "text-accent" : "text-text"}`}>
            {action.title}
          </h4>
          <span className="text-[10px] font-mono text-accent">-{action.saving} kg</span>
        </div>
        <p className="text-xs text-textMuted font-body mt-1">{action.description}</p>
        <div className="flex items-center space-x-2 mt-3">
          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-forestMuted text-textMuted">
            {action.category}
          </span>
          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-forestMuted text-textMuted">
            {action.difficulty}
          </span>
        </div>
      </div>
    </label>
  );
}
