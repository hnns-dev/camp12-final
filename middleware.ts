import { NextRequest, NextResponse } from "next/server";
import { isProtected } from "./lib/auth";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // pathname
  const getPathname = request.nextUrl.pathname;

  if (isProtected) {
    response.cookies.set("location", getPathname, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // Optional: one week expiration
      sameSite: "lax",
    });
  }
  return response;
}

//matcher checks only routes that matches specific calls

export const config = {
  matcher: [
    "/settings",
    "/profile/me",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*|/login)",
  ],
};
