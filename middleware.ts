// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "./app/actions/auth.action";
import { SESSION_COOKIE_NAME } from "./lib/server/consts";

export const protectedRoutes = ["/dashboard"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isProtectedRoute) {
    const user = await getLoggedInUser();
    if (!user) {
      req.cookies.delete(SESSION_COOKIE_NAME);
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
