import { NextResponse, type NextRequest } from "next/server";
import { getOrCreateSharedCollection, ensureAllToolIdsExist } from "../../../../lib/queries";
import { collectionUpdateSchema } from "../../../../lib/validation";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = collectionUpdateSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { toolIds } = parsed.data;

    // Verify all tools exist
    const check = await ensureAllToolIdsExist(toolIds);
    if (!check.ok) {
      return NextResponse.json(
        { error: "Some tools do not exist", missing: check.missing },
        { status: 400 }
      );
    }

    const { collection, cached } = await getOrCreateSharedCollection(toolIds);

    return NextResponse.json({
      id: collection.id,
      url: `${new URL(request.url).origin}/collection/${collection.id}`,
      cached,
    });
  } catch (error) {
    console.error("Failed to create shared collection:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
