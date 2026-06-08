"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext(null);

const DEFAULT_FOOTPRINT = {
  transport: 0,
  energy: 0,
  food: 0,
  lifestyle: 0,
  total: 0,
  inputs: {
    transport: { carKmPerWeek: 0, publicHoursPerWeek: 0, flightsPerYear: 0, flightClass: "economy" },
    energy: { electricityKwhPerMonth: 0, gasM3PerMonth: 0, renewablePercentage: 0, houseSizeM2: 0 },
    food: { dietType: "average", wasteLevel: "medium", localPercentage: 0 },
    lifestyle: { onlineOrdersPerMonth: 0, streamingHoursPerDay: 0, clothingPurchasesPerYear: 0, recyclingHabit: "partially" }
  }
};

export function GlobalProvider({ children }) {
  const [footprint, setFootprint] = useState(DEFAULT_FOOTPRINT);
  const [completedActions, setCompletedActions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFootprint = localStorage.getItem("carbonsense_footprint");
      const storedActions = localStorage.getItem("carbonsense_actions");

      if (storedFootprint) {
        try {
          setFootprint(JSON.parse(storedFootprint));
        } catch (e) {
          console.error("Error parsing stored footprint", e);
        }
      }
      
      if (storedActions) {
        try {
          setCompletedActions(JSON.parse(storedActions));
        } catch (e) {
          console.error("Error parsing stored actions", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save footprint to localStorage
  const updateFootprint = (newFootprint) => {
    setFootprint(newFootprint);
    if (typeof window !== "undefined") {
      localStorage.setItem("carbonsense_footprint", JSON.stringify(newFootprint));
    }
  };

  // Save completed actions to localStorage
  const updateCompletedActions = (newActions) => {
    setCompletedActions(newActions);
    if (typeof window !== "undefined") {
      localStorage.setItem("carbonsense_actions", JSON.stringify(newActions));
    }
  };

  // Reset all data
  const resetData = () => {
    updateFootprint(DEFAULT_FOOTPRINT);
    updateCompletedActions([]);
  };

  const isCalculated = footprint.total > 0;

  return (
    <GlobalContext.Provider
      value={{
        footprint,
        updateFootprint,
        completedActions,
        updateCompletedActions,
        isCalculated,
        isLoaded,
        resetData
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}
