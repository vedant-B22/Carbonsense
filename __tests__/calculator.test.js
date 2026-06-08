import {
  calculateTransport,
  calculateEnergy,
  calculateFood,
  calculateLifestyle
} from "../lib/emissionFactors";

describe("Calculator Edge Cases and Diet/Flight Variations", () => {
  // 1. Zero values
  describe("Zero Inputs", () => {
    test("handles all zero values correctly across categories", () => {
      expect(calculateTransport(0, 0, 0, "economy")).toBe(0);
      expect(calculateEnergy(0, 0, 0, 0)).toBe(0);
      
      // Note: food baseline emissions are non-zero even with zero waste and 100% local produce
      // vegan baseline = 1500, waste Low = 0.9, local 100% = 0.9 -> 1500 * 0.9 * 0.9 = 1215
      expect(calculateFood("vegan", "low", 100)).toBe(1215);
      
      expect(calculateLifestyle(0, 0, 0, "no")).toBe(0);
    });
  });

  // 2. Maximum values (large boundary values)
  describe("Maximum / Extremely Large Inputs", () => {
    test("handles very high values without crashing or returning NaN", () => {
      const hugeTransport = calculateTransport(100000, 168, 100, "first");
      const hugeEnergy = calculateEnergy(100000, 50000, 100, 10000);
      const hugeFood = calculateFood("meat-heavy", "high", 100);
      const hugeLifestyle = calculateLifestyle(1000, 24, 1000, "no");

      expect(hugeTransport).toBeGreaterThan(0);
      expect(hugeEnergy).toBeGreaterThan(0);
      expect(hugeFood).toBeGreaterThan(0);
      expect(hugeLifestyle).toBeGreaterThan(0);

      expect(Number.isFinite(hugeTransport)).toBe(true);
      expect(Number.isFinite(hugeEnergy)).toBe(true);
      expect(Number.isFinite(hugeFood)).toBe(true);
      expect(Number.isFinite(hugeLifestyle)).toBe(true);
    });
  });

  // 3. Each diet type
  describe("Diet Type Comparisons", () => {
    test("verifies that diet type carbon scale ranks: vegan < vegetarian < average < meat-heavy", () => {
      const veganVal = calculateFood("vegan", "medium", 0);
      const vegVal = calculateFood("vegetarian", "medium", 0);
      const avgVal = calculateFood("average", "medium", 0);
      const meatVal = calculateFood("meat-heavy", "medium", 0);

      expect(veganVal).toBeLessThan(vegVal);
      expect(vegVal).toBeLessThan(avgVal);
      expect(avgVal).toBeLessThan(meatVal);
    });
  });

  // 4. Each flight class
  describe("Flight Class Comparisons", () => {
    test("verifies that flight class carbon scale ranks: economy < business < first", () => {
      const ecoVal = calculateTransport(0, 0, 5, "economy");
      const busVal = calculateTransport(0, 0, 5, "business");
      const firstVal = calculateTransport(0, 0, 5, "first");

      expect(ecoVal).toBeLessThan(busVal);
      expect(busVal).toBeLessThan(firstVal);
    });
  });
});
