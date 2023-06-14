import { getIronSession } from "iron-session/edge";
import { NextResponse } from "next/server";
import { validateToken } from "../lib/auth/token";

export const middleware = async (req) => {
  // Get NextResponse object to pass into iron-session
  const res = NextResponse.next();

  // If the client is prefetching (only happens in production) then skip the middleware
  if (req.headers.get("x-middleware-prefetch")) {
    return res;
  }

  // We have to manually get the session cookie here rather than use our withSession wrapper
  // because we need the iron-session/edge implementation for the middleware
  const session = await getIronSession(req, res, {
    cookieName: "DTE-TEST_SESSION_COOKIE",
    password: process.env.DTE_TEST_SESSION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });

  // Get user object from local session
  const { user } = session;

  // If user wants /login
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

  // If user wants /dashboard
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
