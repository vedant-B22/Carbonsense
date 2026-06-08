"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "./GlobalContext";
import { calculateTransport, calculateEnergy, calculateFood, calculateLifestyle } from "@/lib/emissionFactors";
import TransportStep from "./TransportStep";
import EnergyStep from "./EnergyStep";
import FoodStep from "./FoodStep";
import LifestyleStep from "./LifestyleStep";

export default function CarbonForm() {
  const router = useRouter();
  const { footprint, updateFootprint } = useGlobalContext();
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState(footprint.inputs);

  const handleInputChange = (category, field, value) => {
    setInputs((prev) => ({ ...prev, [category]: { ...prev[category], [field]: value } }));
  };

  const transportVal = calculateTransport(
    inputs.transport.carKmPerWeek, inputs.transport.publicHoursPerWeek,
    inputs.transport.flightsPerYear, inputs.transport.flightClass
  );
  
  const energyVal = calculateEnergy(
    inputs.energy.electricityKwhPerMonth, inputs.energy.gasM3PerMonth,
    inputs.energy.renewablePercentage, inputs.energy.houseSizeM2
  );
  
  const foodVal = calculateFood(inputs.food.dietType, inputs.food.wasteLevel, inputs.food.localPercentage);
  const lifestyleVal = calculateLifestyle(
    inputs.lifestyle.onlineOrdersPerMonth, inputs.lifestyle.streamingHoursPerDay,
    inputs.lifestyle.clothingPurchasesPerYear, inputs.lifestyle.recyclingHabit
  );

  const partialScores = { 1: transportVal, 2: energyVal, 3: foodVal, 4: lifestyleVal };
  const totalVal = transportVal + energyVal + foodVal + lifestyleVal;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFootprint({
      transport: transportVal, energy: energyVal, food: foodVal, lifestyle: lifestyleVal, total: totalVal, inputs
    });
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-accent/15">
      <div className="mb-8">
        <div className="flex justify-between text-xs text-textMuted font-bold uppercase tracking-wider mb-2">
          <span>Step {step} of 4</span>
          <span>Running Total: <span className="text-accent font-mono">{totalVal.toLocaleString()} kg CO₂/yr</span></span>
        </div>
        <div className="w-full h-1 bg-forestMuted rounded-full overflow-hidden">
          <motion.div className="h-full bg-accent" animate={{ width: `${(step / 4) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <div className="min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && <TransportStep inputs={inputs.transport} onChange={handleInputChange} />}
            {step === 2 && <EnergyStep inputs={inputs.energy} onChange={handleInputChange} />}
            {step === 3 && <FoodStep inputs={inputs.food} onChange={handleInputChange} />}
            {step === 4 && <LifestyleStep inputs={inputs.lifestyle} onChange={handleInputChange} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-accent/10 pt-6 mt-8 gap-4">
        <span className="text-xs text-textMuted">
          Category Score: <span className="text-text font-bold font-mono">{partialScores[step].toLocaleString()} kg</span>
        </span>
        <div className="flex space-x-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-5 py-2 rounded-lg bg-forestMuted text-text hover:bg-forestMuted/80 text-sm font-semibold transition"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 rounded-lg bg-accent text-background hover:opacity-90 text-sm font-bold transition"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-accent text-background hover:scale-105 active:scale-95 text-sm font-bold transition shadow-[0_0_15px_rgba(168,255,62,0.2)]"
            >
              Complete Analysis
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
