import { SCORE_LABELS } from "./constants";

/**
 * Formats a carbon footprint weight in kg to a localized display string.
 * @param {number} kg - The carbon footprint in kg CO2/year.
 * @returns {string} The formatted display string.
 * @throws {TypeError} If the input kg is not a number.
 * @example
 * formatCO2(4500) // Returns "4,500 kg"
 */
export function formatCO2(kg) {
  if (typeof kg !== "number") {
    throw new TypeError("Parameter 'kg' must be a number.");
  }
  return `${kg.toLocaleString()} kg`;
}

/**
 * Resolves the score rating text and styling information for a given annual carbon score.
 * @param {number} score - Total footprint score in kg CO2/year.
 * @returns {Object} Rating object containing label and custom CSS color classes.
 * @throws {TypeError} If the score is not a number.
 * @example
 * getEmissionLabel(1800) // Returns { label: "Excellent (Paris Compliant)", color: "text-emerald-400..." }
 */
export function getEmissionLabel(score) {
  if (typeof score !== "number") {
    throw new TypeError("Parameter 'score' must be a number.");
  }
  if (score < 2000) return SCORE_LABELS.excellent;
  if (score < 4000) return SCORE_LABELS.good;
  if (score < 6000) return SCORE_LABELS.aboveAverage;
  if (score < 9000) return SCORE_LABELS.high;
  return SCORE_LABELS.veryHigh;
}

/**
 * Calculates the total annual carbon footprint from all subcategories.
 * @param {Object} breakdown - Category breakdown data object.
 * @param {number} breakdown.transport - Transport emissions in kg CO2/year.
 * @param {number} breakdown.energy - Home energy emissions in kg CO2/year.
 * @param {number} breakdown.food - Diet emissions in kg CO2/year.
 * @param {number} breakdown.lifestyle - Lifestyle emissions in kg CO2/year.
 * @returns {number} Sum of all emissions.
 * @throws {Error} If categories values are missing or not numbers.
 * @example
 * calculateTotal({ transport: 1200, energy: 1500, food: 2000, lifestyle: 800 }) // Returns 5500
 */
export function calculateTotal(breakdown) {
  if (
    typeof breakdown?.transport !== "number" ||
    typeof breakdown?.energy !== "number" ||
    typeof breakdown?.food !== "number" ||
    typeof breakdown?.lifestyle !== "number"
  ) {
    throw new Error("Breakdown object must contain transport, energy, food, and lifestyle numbers.");
  }
  return breakdown.transport + breakdown.energy + breakdown.food + breakdown.lifestyle;
}

/**
 * Converts form input data to a category breakdown object.
 * @param {Object} formData - Form input categories.
 * @param {number} transport - Transport score.
 * @param {number} energy - Energy score.
 * @param {number} food - Food score.
 * @param {number} lifestyle - Lifestyle score.
 * @returns {Object} Formatted breakdown object containing category totals.
 * @throws {Error} If fields are missing.
 * @example
 * getCategoryBreakdown({ transport: 500, energy: 300, food: 400, lifestyle: 100 })
 */
export function getCategoryBreakdown(formData) {
  if (!formData) {
    throw new Error("Form data cannot be empty.");
  }
  return {
    transport: formData.transport || 0,
    energy: formData.energy || 0,
    food: formData.food || 0,
    lifestyle: formData.lifestyle || 0
  };
}
