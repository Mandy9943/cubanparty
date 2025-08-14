import { getLoggedInUser } from "@/app/actions/auth.action";

export async function GET() {
  const user = await getLoggedInUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  return Response.json(user);
}
