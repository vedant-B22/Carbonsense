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
      total === undefined
    ) {
      return NextResponse.json(
        { error: "Invalid carbon footprint data provided. Make sure all categories are present." },
        { status: 400 }
      );
    }

    const tips = await getPersonalizedTips({ transport, energy, food, lifestyle, total });
    return NextResponse.json(tips);
  } catch (error) {
    console.error("Gemini API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate personal AI recommendations." },
      { status: 500 }
    );
  }
}
