/**
 * Global Constants for CarbonSense
 * Holds all hardcoded colors, limits, defaults, benchmarks, and labels.
 */

export const THEME = {
  colors: {
    background: '#050f07',
    accent: '#a8ff3e',
    card: '#1a2e1d',
    text: '#f5f5f0',
    forestMuted: '#122315',
    textMuted: '#a0b3a2'
  }
};

export const BENCHMARKS = {
  worldAvg: 4800,
  indiaAvg: 1900,
  parisTarget: 2000
};

export const CATEGORIES = {
  transport: 'Transport',
  energy: 'Energy',
  food: 'Food',
  lifestyle: 'Lifestyle'
};

export const SCORE_LABELS = {
  excellent: { label: 'Excellent (Paris Compliant)', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' },
  good: { label: 'Good', color: 'text-accent border-accent/20 bg-accent/5' },
  aboveAverage: { label: 'Above Average', color: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5' },
  high: { label: 'High', color: 'text-amber-500 border-amber-500/20 bg-amber-500/5' },
  veryHigh: { label: 'Very High', color: 'text-rose-500 border-rose-500/20 bg-rose-500/5' }
};

export const DEFAULT_FOOTPRINT = {
  transport: 0,
  energy: 0,
  food: 0,
  lifestyle: 0,
  total: 0,
  inputs: {
    transport: { carKmPerWeek: 0, publicHoursPerWeek: 0, flightsPerYear: 0, flightClass: 'economy' },
    energy: { electricityKwhPerMonth: 0, gasM3PerMonth: 0, renewablePercentage: 0, houseSizeM2: 0 },
    food: { dietType: 'average', wasteLevel: 'medium', localPercentage: 0 },
    lifestyle: { onlineOrdersPerMonth: 0, streamingHoursPerDay: 0, clothingPurchasesPerYear: 0, recyclingHabit: 'partially' }
  }
};

export const INPUT_LIMITS = {
  transport: {
    carKm: { min: 0, max: 5000 },
    publicHours: { min: 0, max: 168 },
    flights: { min: 0, max: 200 }
  },
  energy: {
    electricity: { min: 0, max: 20000 },
    gas: { min: 0, max: 10000 },
    renewable: { min: 0, max: 100 },
    houseSize: { min: 0, max: 2000 }
  },
  food: {
    local: { min: 0, max: 100 }
  },
  lifestyle: {
    onlineOrders: { min: 0, max: 500 },
    streaming: { min: 0, max: 24 },
    clothing: { min: 0, max: 1000 }
  }
};
