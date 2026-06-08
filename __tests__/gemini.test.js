import { POST } from "../app/api/gemini/route";
import { getPersonalizedTips } from "../lib/geminiClient";

// Mock the getPersonalizedTips client function
jest.mock("../lib/geminiClient", () => ({
  getPersonalizedTips: jest.fn(),
}));

describe("Gemini API Route Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns correct JSON structure on valid input", async () => {
    const mockTips = [
      { title: "Switch to LED", description: "Save power", estimatedSaving: 150, category: "Energy", difficulty: "Easy" },
      { title: "Carpool", description: "Save fuel", estimatedSaving: 300, category: "Transport", difficulty: "Easy" }
    ];
    getPersonalizedTips.mockResolvedValue(mockTips);

    const requestBody = {
      transport: 1200,
      energy: 1500,
      food: 2000,
      lifestyle: 800,
      total: 5500
    };

    const req = new Request("http://localhost/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toEqual(mockTips);
    expect(getPersonalizedTips).toHaveBeenCalledWith(requestBody);
  });

  test("handles missing fields gracefully by returning 400", async () => {
    const requestBody = {
      transport: 1200,
      energy: 1500
      // missing food, lifestyle, total fields
    };

    const req = new Request("http://localhost/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toContain("Invalid carbon footprint data");
    expect(getPersonalizedTips).not.toHaveBeenCalled();
  });

  test("returns 500 when Gemini client throws an error", async () => {
    getPersonalizedTips.mockRejectedValue(new Error("Gemini quota exceeded"));

    const requestBody = {
      transport: 1200,
      energy: 1500,
      food: 2000,
      lifestyle: 800,
      total: 5500
    };

    const req = new Request("http://localhost/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const res = await POST(req);
    expect(res.status).toBe(500);

    const json = await res.json();
    expect(json.error).toBe("Gemini quota exceeded");
  });
});
