/**
 * CarbonSense Emission Factors
 * Based on IPCC, Our World in Data, and international standards.
 */
export const EMISSION_FACTORS = {
  // Transport
  car: 0.21, // kg CO2 per km
  publicTransportHour: 1.2, // kg CO2 per hour (assumes avg speed & occupancy)
  flightKm: 0.255, // kg CO2 per km (economy)
  flightAvgDistance: 1000, // km per flight (assumed average)
  flightClassMultiplier: {
    economy: 1.0,
    business: 1.5,
    first: 2.0
  },

  // Home Energy
  electricityIndia: 0.82, // kg CO2 per kWh
  gas: 2.04, // kg CO2 per m3
  houseSizeFactor: 5.0, // kg CO2 per m2 per year (heating/cooling overhead)

  // Food & Diet (kg CO2 per year)
  diet: {
    "meat-heavy": 3300,
    average: 2500,
    vegetarian: 1700,
    vegan: 1500
  },
  foodWasteMultiplier: {
    low: 0.9,
    medium: 1.0,
    high: 1.2
  },

  // Lifestyle
  onlineShoppingOrder: 3.5, // kg CO2 per order
  streamingHour: 0.036, // kg CO2 per hour
  clothingItem: 14.5, // kg CO2 per purchase
  recyclingDiscount: {
    yes: 250, // kg CO2 saved per year
    partially: 100,
    no: 0
  }
};

/**
 * Calculates annual transportation carbon emissions.
 * @param {number} carKmPerWeek - Weekly driving distance in km.
 * @param {number} publicHoursPerWeek - Weekly public transport usage in hours.
 * @param {number} flightsPerYear - Number of flights per year.
 * @param {string} flightClass - Seat class: 'economy', 'business', or 'first'.
 * @returns {number} Annual transportation emissions in kg CO2.
 */
export function calculateTransport(carKmPerWeek, publicHoursPerWeek, flightsPerYear, flightClass) {
  const carEmissions = (carKmPerWeek || 0) * 52 * EMISSION_FACTORS.car;
  const publicEmissions = (publicHoursPerWeek || 0) * 52 * EMISSION_FACTORS.publicTransportHour;
  
  const multiplier = EMISSION_FACTORS.flightClassMultiplier[flightClass] || 1.0;
  const flightEmissions = (flightsPerYear || 0) * EMISSION_FACTORS.flightAvgDistance * EMISSION_FACTORS.flightKm * multiplier;
  
  return Math.round(carEmissions + publicEmissions + flightEmissions);
}

/**
 * Calculates annual home energy carbon emissions.
 * @param {number} electricityKwhPerMonth - Monthly electricity usage in kWh.
 * @param {number} gasM3PerMonth - Monthly gas usage in m3.
 * @param {number} renewablePercentage - Renewable energy percentage (0 to 100).
 * @param {number} houseSizeM2 - Size of the house in m2.
 * @returns {number} Annual home energy emissions in kg CO2.
 */
export function calculateEnergy(electricityKwhPerMonth, gasM3PerMonth, renewablePercentage, houseSizeM2) {
  const renewFactor = 1 - (renewablePercentage || 0) / 100;
  const electricityEmissions = (electricityKwhPerMonth || 0) * 12 * EMISSION_FACTORS.electricityIndia * renewFactor;
  const gasEmissions = (gasM3PerMonth || 0) * 12 * EMISSION_FACTORS.gas;
  const houseSizeEmissions = (houseSizeM2 || 0) * EMISSION_FACTORS.houseSizeFactor;
  
  return Math.round(electricityEmissions + gasEmissions + houseSizeEmissions);
}

/**
 * Calculates annual food carbon emissions based on diet and waste.
 * @param {string} dietType - Diet type: 'meat-heavy', 'average', 'vegetarian', or 'vegan'.
 * @param {string} wasteLevel - Waste level: 'low', 'medium', or 'high'.
 * @param {number} localPercentage - Local produce percentage (0 to 100).
 * @returns {number} Annual food emissions in kg CO2.
 */
export function calculateFood(dietType, wasteLevel, localPercentage) {
  const baseDietEmissions = EMISSION_FACTORS.diet[dietType] || EMISSION_FACTORS.diet.average;
  const wasteMultiplier = EMISSION_FACTORS.foodWasteMultiplier[wasteLevel] || 1.0;
  
  // Local produce gives up to a 10% discount on food emissions due to reduced transportation
  const localDiscountFactor = 1 - 0.1 * ((localPercentage || 0) / 100);
  
  return Math.round(baseDietEmissions * wasteMultiplier * localDiscountFactor);
}

/**
 * Calculates annual lifestyle carbon emissions.
 * @param {number} onlineOrdersPerMonth - Monthly online shopping orders.
 * @param {number} streamingHoursPerDay - Daily hours of video streaming.
 * @param {number} clothingPurchasesPerYear - Annual clothing item purchases.
 * @param {string} recyclingHabit - Recycling habit: 'yes', 'partially', or 'no'.
 * @returns {number} Annual lifestyle emissions in kg CO2.
 */
export function calculateLifestyle(onlineOrdersPerMonth, streamingHoursPerDay, clothingPurchasesPerYear, recyclingHabit) {
  const shoppingEmissions = (onlineOrdersPerMonth || 0) * 12 * EMISSION_FACTORS.onlineShoppingOrder;
  const streamingEmissions = (streamingHoursPerDay || 0) * 365 * EMISSION_FACTORS.streamingHour;
  const clothingEmissions = (clothingPurchasesPerYear || 0) * EMISSION_FACTORS.clothingItem;
  
  const discount = EMISSION_FACTORS.recyclingDiscount[recyclingHabit] || 0;
  
  const total = shoppingEmissions + streamingEmissions + clothingEmissions - discount;
  return Math.max(0, Math.round(total)); // Ensure lifestyle emissions are not negative
}
