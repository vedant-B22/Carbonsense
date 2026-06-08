import { NextResponse } from "next/server";
import { getPersonalizedTips } from "@/lib/geminiClient";

/**
 * POST endpoint to receive carbon footprint breakdown and query Gemini API for personalized reduction tips.
 * @param {Request} request - The standard Next.js request object containing the JSON payload.
 * @returns {NextResponse} The JSON response containing the array of tips or error details.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { transport, energy, food, lifestyle, total } = body;

    // Validate inputs
    if (
      transport === undefined ||
      energy === undefined ||
      food === undefined ||
      lifestyle === undefined ||
      total === undefined ||
      typeof transport !== "number" ||
      typeof energy !== "number" ||
      typeof food !== "number" ||
      typeof lifestyle !== "number" ||
      typeof total !== "number" ||
      transport < 0 ||
      energy < 0 ||
      food < 0 ||
      lifestyle < 0 ||
      total < 0
    ) {
      return NextResponse.json(
        { error: "Invalid carbon footprint data provided. Make sure all categories are present and valid positive numbers." },
        { status: 400 }
      );
    }

    const tips = await getPersonalizedTips({ transport, energy, food, lifestyle, total });
    return NextResponse.json(tips);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error("Gemini API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to generate personal AI recommendations." },
      { status: 500 }
    );
  }
}
