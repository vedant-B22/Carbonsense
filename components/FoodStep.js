import React from "react";

export default function FoodStep({ inputs, onChange }) {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold text-text">Step 3: Food & Diet</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="dietType" className="block text-sm text-textMuted mb-2 font-medium">Diet Type</label>
          <select
            id="dietType"
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.dietType}
            onChange={(e) => onChange("food", "dietType", e.target.value)}
          >
            <option value="meat-heavy">Meat-heavy (Daily meat)</option>
            <option value="average">Average (Balanced diet)</option>
            <option value="vegetarian">Vegetarian (No meat/fish)</option>
            <option value="vegan">Vegan (Plant-based only)</option>
          </select>
        </div>
        <div>
          <label htmlFor="wasteLevel" className="block text-sm text-textMuted mb-2 font-medium">Food Waste Level</label>
          <select
            id="wasteLevel"
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.wasteLevel}
            onChange={(e) => onChange("food", "wasteLevel", e.target.value)}
          >
            <option value="low">Low (Rarely waste food)</option>
            <option value="medium">Medium (Average waste)</option>
            <option value="high">High (Frequently discard leftovers)</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="localProduce" className="block text-sm text-textMuted mb-2 font-medium">Local Produce percentage (%)</label>
          <input
            type="range"
            id="localProduce"
            min="0"
            max="100"
            className="w-full accent-accent bg-forestMuted cursor-pointer"
            value={inputs.localPercentage}
            onChange={(e) => onChange("food", "localPercentage", Number(e.target.value))}
          />
          <div className="text-right text-xs text-accent font-semibold mt-1">{inputs.localPercentage}% Local</div>
        </div>
      </div>
    </div>
  );
}
