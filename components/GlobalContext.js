"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_FOOTPRINT } from "@/lib/constants";

const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [footprint, setFootprint] = useState(DEFAULT_FOOTPRINT);
  const [completedActions, setCompletedActions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedFootprint = localStorage.getItem("carbonsense_footprint");
        if (storedFootprint) {
          setFootprint(JSON.parse(storedFootprint));
        }
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error("Error loading footprint from localStorage:", e);
      }

      try {
        const storedActions = localStorage.getItem("carbonsense_actions");
        if (storedActions) {
          setCompletedActions(JSON.parse(storedActions));
        }
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error("Error loading actions from localStorage:", e);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save footprint to localStorage
  const updateFootprint = (newFootprint) => {
    setFootprint(newFootprint);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("carbonsense_footprint", JSON.stringify(newFootprint));
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error("Error saving footprint to localStorage:", e);
      }
    }
  };

  // Save completed actions to localStorage
  const updateCompletedActions = (newActions) => {
    setCompletedActions(newActions);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("carbonsense_actions", JSON.stringify(newActions));
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error("Error saving actions to localStorage:", e);
      }
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
