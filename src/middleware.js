/**
 * @file Middleware for all routes to handle authentication and authorisation.
 */
import { getIronSession } from "iron-session/edge";
import { NextResponse } from "next/server";
import { validateToken } from "../lib/auth/token";

/**
 * Middleware logic for all matching routes.
 * @param {NextRequest} req The incoming request object
 * @returns {NextResponse} The response object
 */
export const middleware = async (req) => {
  // Get NextResponse object to pass into iron-session
  const res = NextResponse.next();

  // If the client is prefetching then skip the middleware (this only happens in production)
  if (req.headers.get("x-middleware-prefetch")) {
    return res;
  }

  // Edge-specific iron-session import required on middleware (we can't use our `withSession.js` functions here)
  const session = await getIronSession(req, res, {
    cookieName: "DTE-TEST_SESSION_COOKIE",
    password: process.env.DTE_TEST_SESSION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });

  // Get user object from local session
  const { user } = session;

  // Deny access to /api routes if user is not logged in (except /api/login, so they can log in)
  if (
    req.nextUrl.pathname.startsWith("/api") &&
    req.nextUrl.pathname !== "/api/login"
  ) {
    if (
      !user ||
      !user.userId ||
      !user.token ||
      !validateToken(user.userId, user.token)
    ) {
      // If user is not logged in, then deny request
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } else {
      // If user is logged in, then continue to route
      return res;
    }
  }

  // Deny access to /login route if user is already logged in
  if (req.nextUrl.pathname === "/login") {
    if (
      user &&
      user.userId &&
      user.token &&
      validateToken(user.userId, user.token)
    ) {
      // If user is already logged in, then redirect to dashboard
      // Clone request but change pathname to /dashboard
      const dashboardUrl = req.nextUrl.clone();
      dashboardUrl.pathname = "/dashboard";
      return NextResponse.redirect(dashboardUrl);
    } else {
      // If user is not logged in, then continue to route
      return res;
    }
  }

  // Deny access to /dashboard route if user is not logged in
  if (req.nextUrl.pathname === "/dashboard") {
    if (
      !user ||
      !user.userId ||
      !user.token ||
      !validateToken(user.userId, user.token)
    ) {
      // If user is not logged in, then redirect to login
      // Clone request but change pathname to /login
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    } else {
      // If user is logged in, then continue to route
      return res;
    }
  }

  // If nextUrl is undefined, continue anyway
  return res;
};

/**
 * Configuration for the middleware that stops it running on routes it shouldn't.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
