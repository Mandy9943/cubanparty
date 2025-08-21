import { createSessionClient } from "@/lib/server/appwrite";
import { DATABASE_ID, SPONSORS_COLLECTION_ID } from "@/lib/server/consts";
import { NextResponse } from "next/server";
export const revalidate = 0;

export async function GET() {
  try {
    const { databases } = await createSessionClient();
    const res = await databases.listDocuments(
      DATABASE_ID,
      SPONSORS_COLLECTION_ID
    );
    return NextResponse.json(res);
  } catch (error) {
    console.error("[api/sponsors] GET error", error);
    return NextResponse.json(
      { error: "Failed to fetch sponsors" },
      { status: 500 }
    );
  }
}
