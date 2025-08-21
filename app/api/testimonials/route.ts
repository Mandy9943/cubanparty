import { createSessionClient } from "@/lib/server/appwrite";
import { DATABASE_ID, TESTIMONIALS_COLLECTION_ID } from "@/lib/server/consts";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";
export const revalidate = 0;

export async function GET() {
  try {
    const { databases } = await createSessionClient();
    const res = await databases.listDocuments(
      DATABASE_ID,
      TESTIMONIALS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(100)]
    );
    return NextResponse.json(res);
  } catch (error) {
    console.error("[api/testimonials] GET error", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
