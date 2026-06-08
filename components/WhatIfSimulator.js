"use client";

import React, { useState, useEffect } from "react";
import { calculateTransport, calculateEnergy, calculateLifestyle } from "@/lib/emissionFactors";

export default function WhatIfSimulator({ footprint }) {
  const inputs = footprint.inputs;
  
  // Slider states
  const [carReduction, setCarReduction] = useState(0); // km/week reduction
  const [renewablePercent, setRenewablePercent] = useState(inputs.energy.renewablePercentage);
  const [onlineReduction, setOnlineReduction] = useState(0); // orders/month reduction
  
  // Max ranges based on user inputs
  const maxCar = inputs.transport.carKmPerWeek || 0;
  const maxOnline = inputs.lifestyle.onlineOrdersPerMonth || 0;

  // Recalculate based on simulation
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
        {/* Slider 1 */}
        {maxCar > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <label htmlFor="simCar" className="text-textMuted">Reduce Driving</label>
              <span className="text-text font-mono">-{carReduction} km/wk</span>
            </div>
            <input
              type="range"
              id="simCar"
              min="0"
              max={maxCar}
              className="w-full accent-accent bg-forestMuted cursor-pointer"
              value={carReduction}
              onChange={(e) => setCarReduction(Number(e.target.value))}
            />
            <span className="text-[10px] text-textMuted/60 block">Current: {maxCar} km/week</span>
          </div>
        )}

        {/* Slider 2 */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-semibold">
            <label htmlFor="simRenewable" className="text-textMuted font-medium">Renewable Energy</label>
            <span className="text-accent font-mono">{renewablePercent}%</span>
          </div>
          <input
            type="range"
            id="simRenewable"
            min={inputs.energy.renewablePercentage}
            max="100"
            className="w-full accent-accent bg-forestMuted cursor-pointer"
            value={renewablePercent}
            onChange={(e) => setRenewablePercent(Number(e.target.value))}
          />
          <span className="text-[10px] text-textMuted/60 block">Current: {inputs.energy.renewablePercentage}%</span>
        </div>

        {/* Slider 3 */}
        {maxOnline > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <label htmlFor="simOnline" className="text-textMuted font-medium">Reduce Online Shopping</label>
              <span className="text-text font-mono">-{onlineReduction} orders/mo</span>
            </div>
            <input
              type="range"
              id="simOnline"
              min="0"
              max={maxOnline}
              className="w-full accent-accent bg-forestMuted cursor-pointer"
              value={onlineReduction}
              onChange={(e) => setOnlineReduction(Number(e.target.value))}
            />
            <span className="text-[10px] text-textMuted/60 block">Current: {maxOnline} orders/month</span>
          </div>
        )}
      </div>
    </div>
  );
}
