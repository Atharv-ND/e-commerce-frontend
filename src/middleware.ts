import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Protect /admin route
const isAdminRoute = createRouteMatcher(["/admin"]);

export default clerkMiddleware(async (auth, req) => {
  const user = await auth();

  // Check if accessing /admin and not admin
  if (isAdminRoute(req) && user.sessionClaims?.metadata?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Match everything except static files and _next
    "/(api|trpc)(.*)", // Match all API routes
  ],
};
