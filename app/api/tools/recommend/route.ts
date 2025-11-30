import { NextResponse } from "next/server";
import { toolRecommendationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = toolRecommendationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // TODO: Save recommendation to database or send email notification
    console.log("New Tool Recommendation:", result.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing recommendation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
