import { createSessionClient } from "@/lib/server/appwrite";
import { DATABASE_ID, STAFF_COLLECTION_ID } from "@/lib/server/consts";

export async function GET() {
  try {
    const { databases } = await createSessionClient();

    const staff = await databases.listDocuments(
      DATABASE_ID,
      STAFF_COLLECTION_ID
    );

    return Response.json(staff);
  } catch (error) {
    console.error("Error fetching staff:", error);
    return Response.json(
      { error: "Failed to fetch staff data" },
      { status: 500 }
    );
  }
}
