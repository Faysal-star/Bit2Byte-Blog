import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = [
  '/auth',
  '/blogs',
  '/about',
  '/',
  '/pub/about',
  '/pub/blog',
  '/pub/syllabus',
  '/pub/contact',
  '/quiz',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for the backend's access_token cookie (set by the backend as HTTP-only)
  const token = request.cookies.get('access_token')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If no access token, redirect to auth page
  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 