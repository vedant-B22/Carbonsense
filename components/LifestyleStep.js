import React from "react";

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
            min="0"
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
            min="0"
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.streamingHoursPerDay || ""}
            onChange={(e) => onChange("lifestyle", "streamingHoursPerDay", Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="clothing" className="block text-sm text-textMuted mb-2 font-medium">Clothing Purchases (items / year)</label>
          <input
            type="number"
            id="clothing"
            min="0"
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
