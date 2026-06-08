"use client";

import React, { useState } from "react";
import { calculateTransport, calculateEnergy, calculateLifestyle } from "@/lib/emissionFactors";
import SimulatorSlider from "./SimulatorSlider";

/**
 * WhatIfSimulator component.
 * Allows users to adjust hypotheticals via sliders to see real-time impact reductions.
 * @param {Object} props - React props.
 * @param {Object} props.footprint - Calculated carbon footprint state.
 * @returns {React.ReactElement} The What-If simulation layout.
 */
export default function WhatIfSimulator({ footprint }) {
  const inputs = footprint.inputs;
  const [carReduction, setCarReduction] = useState(0);
  const [renewablePercent, setRenewablePercent] = useState(inputs.energy.renewablePercentage);
  const [onlineReduction, setOnlineReduction] = useState(0);
  
  const maxCar = inputs.transport.carKmPerWeek || 0;
  const maxOnline = inputs.lifestyle.onlineOrdersPerMonth || 0;

  const simCarKm = Math.max(0, maxCar - carReduction);
  const simOnline = Math.max(0, maxOnline - onlineReduction);

  const simTransport = calculateTransport(
    simCarKm, inputs.transport.publicHoursPerWeek,
    inputs.transport.flightsPerYear, inputs.transport.flightClass
  );
  const simEnergy = calculateEnergy(
    inputs.energy.electricityKwhPerMonth, inputs.energy.gasM3PerMonth,
    renewablePercent, inputs.energy.houseSizeM2
  );
  const simLifestyle = calculateLifestyle(
    simOnline, inputs.lifestyle.streamingHoursPerDay,
    inputs.lifestyle.clothingPurchasesPerYear, inputs.lifestyle.recyclingHabit
  );

  const simTotal = simTransport + simEnergy + footprint.food + simLifestyle;
  const totalSaved = Math.max(0, footprint.total - simTotal);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-accent/10 w-full mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-accent/5 pb-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-text">&quot;What-If&quot; Impact Simulator</h3>
          <p className="text-xs text-textMuted font-body mt-1">Adjust the sliders to visualize how lifestyle changes immediately reduce your annual emissions.</p>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 rounded-xl bg-accent/5 border border-accent/20 text-right">
          <span className="text-[10px] text-accent uppercase font-bold tracking-wider block">Potential Annual Savings</span>
          <span className="text-xl font-heading font-extrabold text-accent font-mono">-{totalSaved.toLocaleString()} kg CO₂</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {maxCar > 0 && (
          <SimulatorSlider
            id="simCar" label="Reduce Driving" min={0} max={maxCar} value={carReduction}
            onChange={setCarReduction} displayValue={`-${carReduction} km/wk`}
            currentText={`Current: ${maxCar} km/week`}
          />
        )}
        <SimulatorSlider
          id="simRenewable" label="Renewable Energy" min={inputs.energy.renewablePercentage} max={100}
          value={renewablePercent} onChange={setRenewablePercent} displayValue={`${renewablePercent}%`}
          currentText={`Current: ${inputs.energy.renewablePercentage}%`}
        />
        {maxOnline > 0 && (
          <SimulatorSlider
            id="simOnline" label="Reduce Online Shopping" min={0} max={maxOnline} value={onlineReduction}
            onChange={setOnlineReduction} displayValue={`-${onlineReduction} orders/mo`}
            currentText={`Current: ${maxOnline} orders/month`}
          />
        )}
      </div>
    </div>
  );
}
