/**
 * Gemini API client helper.
 * Communicates with Gemini 2.0 Flash to generate structured carbon reduction recommendations.
 */

/**
 * Calls the Gemini 2.0 Flash API to generate 6 personalized carbon reduction recommendations.
 * @param {Object} data - The user's annual carbon footprint breakdown.
 * @param {number} data.transport - Transport emissions in kg CO2/year.
 * @param {number} data.energy - Home energy emissions in kg CO2/year.
 * @param {number} data.food - Diet/food emissions in kg CO2/year.
 * @param {number} data.lifestyle - Lifestyle/consumer emissions in kg CO2/year.
 * @param {number} data.total - Total emissions in kg CO2/year.
 * @returns {Promise<Array>} A promise resolving to an array of 6 tip objects.
 */
export async function getPersonalizedTips(data) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not defined.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const prompt = `
Analyze this carbon footprint profile:
- Transportation: ${data.transport} kg CO2/year
- Home Energy: ${data.energy} kg CO2/year
- Food & Diet: ${data.food} kg CO2/year
- Lifestyle: ${data.lifestyle} kg CO2/year
- Total: ${data.total} kg CO2/year

Provide exactly 6 personalized, highly actionable tips to reduce this carbon footprint. 
The tips must target their highest emission categories. Estimate realistic, positive numbers for 'estimatedSaving' in kg CO2/year.
`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
    systemInstruction: {
      parts: [
        {
          text: "You are an expert environmental scientist and personal carbon footprint reduction advisor. Your job is to analyze the user's detailed carbon emissions and return exactly 6 tailored recommendations. The recommendations should cover their highest emission categories. Each tip must include a clear, catchy title, a persuasive description, a realistic estimate of the annual CO2 savings in kg, the category (Transport, Energy, Food, or Lifestyle), and a difficulty rating (Easy, Medium, or Hard)."
        }
      ]
    },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string", description: "Clear, actionable title of the recommendation." },
            description: { type: "string", description: "Brief explanation of how to do this action and why it helps." },
            estimatedSaving: { type: "number", description: "Estimated carbon savings per year in kg CO2." },
            category: { type: "string", description: "Must be one of: Transport, Energy, Food, or Lifestyle." },
            difficulty: { type: "string", description: "Must be one of: Easy, Medium, or Hard." }
          },
          required: ["title", "description", "estimatedSaving", "category", "difficulty"]
        }
      }
    }
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  
  try {
    const textResponse = result.candidates[0].content.parts[0].text;
    const jsonParsed = JSON.parse(textResponse);
    if (!Array.isArray(jsonParsed)) {
      throw new Error("Returned content is not a valid array.");
    }
    return jsonParsed;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error("Failed to parse Gemini JSON output:", error, result);
    throw new Error("Invalid structure returned by Gemini API.");
  }
}
