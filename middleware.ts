// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export const protectedRoutes = ['/dashboard'];
export const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  console.log(req.cookies);
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const appwriteCookieName = `a_session_${projectId}`;
  console.log(appwriteCookieName);
  const appwriteCookie = req.cookies.get(appwriteCookieName);
  console.log(appwriteCookie);

  if (isProtectedRoute && !appwriteCookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && appwriteCookie) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
