import React from "react";

export default function EnergyStep({ inputs, onChange }) {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold text-text">Step 2: Home Energy</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="electricity" className="block text-sm text-textMuted mb-2 font-medium">Electricity (kWh / month)</label>
          <input
            type="number"
            id="electricity"
            min="0"
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.electricityKwhPerMonth || ""}
            onChange={(e) => onChange("energy", "electricityKwhPerMonth", Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="gas" className="block text-sm text-textMuted mb-2 font-medium">Gas Usage (m³ / month)</label>
          <input
            type="number"
            id="gas"
            min="0"
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.gasM3PerMonth || ""}
            onChange={(e) => onChange("energy", "gasM3PerMonth", Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="renewable" className="block text-sm text-textMuted mb-2 font-medium">Renewable Energy percentage (%)</label>
          <input
            type="number"
            id="renewable"
            min="0"
            max="100"
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.renewablePercentage || ""}
            onChange={(e) => onChange("energy", "renewablePercentage", Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="houseSize" className="block text-sm text-textMuted mb-2 font-medium">House Size (m²)</label>
          <input
            type="number"
            id="houseSize"
            min="0"
            className="w-full bg-forestMuted/60 border border-accent/10 focus:border-accent text-text rounded-lg px-4 py-2 focus:outline-none"
            value={inputs.houseSizeM2 || ""}
            onChange={(e) => onChange("energy", "houseSizeM2", Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
