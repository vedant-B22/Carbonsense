import React from "react";
import { INPUT_LIMITS } from "@/lib/constants";

/**
 * LifestyleStep component.
 * Renders the lifestyle habits parameters section of the calculator form.
 * @param {Object} props - React props.
 * @param {Object} props.inputs - The lifestyle inputs state values.
 * @param {Function} props.onChange - Handles changes for input fields.
 * @returns {React.ReactElement} The lifestyle fields layout.
 */
export default function LifestyleStep({ inputs, onChange }) {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold text-text">Step 4: Lifestyle Habits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="onlineOrders" className="block text-sm text-textMuted mb-2 font-medium">Online Orders (orders / month)</label>
          <input
            type="number"
            id="onlineOrders"
            min={INPUT_LIMITS.lifestyle.onlineOrders.min}
            max={INPUT_LIMITS.lifestyle.onlineOrders.max}
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.onlineOrdersPerMonth || ""}
            onChange={(e) => onChange("lifestyle", "onlineOrdersPerMonth", Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="streaming" className="block text-sm text-textMuted mb-2 font-medium">Video Streaming (hours / day)</label>
          <input
            type="number"
            id="streaming"
            min={INPUT_LIMITS.lifestyle.streaming.min}
            max={INPUT_LIMITS.lifestyle.streaming.max}
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.lifestyle.streamingHoursPerDay || ""}
            onChange={(e) => onChange("lifestyle", "streamingHoursPerDay", Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="clothing" className="block text-sm text-textMuted mb-2 font-medium">Clothing Purchases (items / year)</label>
          <input
            type="number"
            id="clothing"
            min={INPUT_LIMITS.lifestyle.clothing.min}
            max={INPUT_LIMITS.lifestyle.clothing.max}
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.clothingPurchasesPerYear || ""}
            onChange={(e) => onChange("lifestyle", "clothingPurchasesPerYear", Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="recycling" className="block text-sm text-textMuted mb-2 font-medium">Recycling Habit</label>
          <select
            id="recycling"
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.recyclingHabit}
            onChange={(e) => onChange("lifestyle", "recyclingHabit", e.target.value)}
          >
            <option value="yes">Yes (Recycle consistently)</option>
            <option value="partially">Partially (Recycle sometimes)</option>
            <option value="no">No (Do not recycle)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
