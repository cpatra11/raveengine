import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Get token with user data
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ["/sign-in", "/register", "/pricing", "/"];
  const isPublicPath = publicPaths.some((path) => pathname === path);

  if (isPublicPath) {
    // If user is logged in and tries to access public path, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Allow access to public paths for non-authenticated users
    return NextResponse.next();
  }

  // Protected routes - require authentication
  if (!token) {
    // Redirect to login if trying to access protected route
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow access to protected routes for authenticated users
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Add routes you want middleware to run on
    "/",
    "/sign-in",
    "/dashboard/:path*",
    "/profile/:path*",
    "/bhalus/:path*",
    "/payment",
  ],
};
