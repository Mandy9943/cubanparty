import { createSessionClient } from "@/lib/server/appwrite";
import { DATABASE_ID, EVENTS_COLLECTION_ID } from "@/lib/server/consts";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
export const revalidate = 0;

export async function GET(_req: NextRequest) {
  try {
    const { databases } = await createSessionClient();
    const res = await databases.listDocuments(
      DATABASE_ID,
      EVENTS_COLLECTION_ID,
      [Query.orderDesc("date"), Query.limit(100)]
    );
    return NextResponse.json(res);
  } catch (err: any) {
    console.error("[api/events] GET error", err?.message || err);
    return NextResponse.json(
      { error: "Failed to load events" },
      { status: 500 }
    );
  }
}
