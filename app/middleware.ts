// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { account, client } from './appwrite';
import { cookies } from 'next/headers';

export const protectedRoutes = ['/dashboard'];
export const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const appwriteCookieName = `a_session_${projectId}`;

  const allCookies = await cookies();
  const appwriteCookie = allCookies.get(appwriteCookieName)?.value;

  let user = null;
  if (appwriteCookie) {
    client.setSession(appwriteCookie);
    try {
      user = await account.get();
      console.log('user from cookie:',user);
    } catch (error) {
      console.error('Error verifying session:', error);
    }
  }

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isPublicRoute && user && !path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
