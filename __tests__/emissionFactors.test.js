import {
  calculateTransport,
  calculateEnergy,
  calculateFood,
  calculateLifestyle
} from "../lib/emissionFactors";

describe("Emission Factors Unit Tests", () => {
  // 1. Transport Calculations
  describe("calculateTransport", () => {
    test("calculates standard economy transport emissions correctly", () => {
      // 100 km/wk car, 5 hrs/wk public, 2 economy flights/yr
      // Car: 100 * 52 * 0.21 = 1092
      // Public: 5 * 52 * 1.2 = 312
      // Flights: 2 * 1000 * 0.255 * 1.0 = 510
      // Total: 1092 + 312 + 510 = 1914
      const result = calculateTransport(100, 5, 2, "economy");
      expect(result).toBe(1914);
    });

    test("applies business class multiplier correctly", () => {
      // 0 car, 0 public, 1 business flight/yr
      // Flights: 1 * 1000 * 0.255 * 1.5 = 382.5 -> 383
      const result = calculateTransport(0, 0, 1, "business");
      expect(result).toBe(383);
    });

    test("applies first class multiplier correctly", () => {
      // 0 car, 0 public, 1 first class flight/yr
      // Flights: 1 * 1000 * 0.255 * 2.0 = 510
      const result = calculateTransport(0, 0, 1, "first");
      expect(result).toBe(510);
    });
  });

  // 2. Energy Calculations
  describe("calculateEnergy", () => {
    test("calculates energy emissions with renewable energy and house size overhead", () => {
      // 250 kWh/mo electricity, 20 m3/mo gas, 50% renewable, 120 m2 house size
      // Electricity: 250 * 12 * 0.82 * (1 - 0.5) = 1230
      // Gas: 20 * 12 * 2.04 = 489.6
      // House: 120 * 5 = 600
      // Total: 1230 + 489.6 + 600 = 2319.6 -> 2320
      const result = calculateEnergy(250, 20, 50, 120);
      expect(result).toBe(2320);
    });

    test("calculates zero energy emissions when inputs are zero", () => {
      const result = calculateEnergy(0, 0, 0, 0);
      expect(result).toBe(0);
    });
  });

  // 3. Food Calculations
  describe("calculateFood", () => {
    test("calculates food emissions for average diet, medium waste, and local produce percentage", () => {
      // average diet base = 2500
      // medium waste multiplier = 1.0
      // local produce discount: 30% -> discount is 3% -> multiplier is 0.97
      // Total: 2500 * 1.0 * 0.97 = 2425
      const result = calculateFood("average", "medium", 30);
      expect(result).toBe(2425);
    });

    test("calculates vegan diet with low waste and 100% local produce discount", () => {
      // vegan diet base = 1500
      // low waste multiplier = 0.9
      // local produce discount: 100% -> discount is 10% -> multiplier is 0.9
      // Total: 1500 * 0.9 * 0.9 = 1215
      const result = calculateFood("vegan", "low", 100);
      expect(result).toBe(1215);
    });

    test("calculates meat-heavy diet with high waste and no local produce", () => {
      // meat-heavy base = 3300
      // high waste multiplier = 1.2
      // local produce discount: 0% -> multiplier is 1.0
      // Total: 3300 * 1.2 * 1.0 = 3960
      const result = calculateFood("meat-heavy", "high", 0);
      expect(result).toBe(3960);
    });
  });

  // 4. Lifestyle Calculations
  describe("calculateLifestyle", () => {
    test("calculates lifestyle emissions with online shopping, streaming, clothing, and recycling discount", () => {
      // 4 orders/mo, 3 hrs/day streaming, 10 clothes/yr, recycling partially (-100 kg)
      // Shopping: 4 * 12 * 3.5 = 168
      // Streaming: 3 * 365 * 0.036 = 39.42
      // Clothing: 10 * 14.5 = 145
      // Recycling: -100
      // Total: 168 + 39.42 + 145 - 100 = 252.42 -> 252
      const result = calculateLifestyle(4, 3, 10, "partially");
      expect(result).toBe(252);
    });

    test("ensures lifestyle emissions do not go below zero with high recycling discount", () => {
      // 0 shopping, 0 streaming, 0 clothing, recycling yes (-250 kg)
      // Total: -250 -> should be floored at 0
      const result = calculateLifestyle(0, 0, 0, "yes");
      expect(result).toBe(0);
    });
  });
});
