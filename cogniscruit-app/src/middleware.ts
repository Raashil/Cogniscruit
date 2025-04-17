import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  // If trying to access dashboard without auth, redirect to login
  if (isDashboardPage && !authToken) {
    console.log('Middleware: No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If already authenticated and trying to access login, redirect to dashboard
  if (isLoginPage && authToken) {
    console.log('Middleware: Token found, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};