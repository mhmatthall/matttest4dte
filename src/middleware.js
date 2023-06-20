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

  /*
   * Retrieve session data from incoming client request.
   * We can't use our `withSession.js` functions here because we're in an `edge` environment,
   * so we have to use the edge-specific `iron-session` functions.
   */
  const session = await getIronSession(req, res, {
    cookieName: "DTE-TEST_SESSION_COOKIE",
    password: process.env.DTE_TEST_SESSION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

  // Extract user object from session
  const { user } = session;

  /*
   * Deny access to /api routes if user is not logged in
   * (except /api/login, so they can still log in)
   */
  if (
    req.nextUrl.pathname.startsWith("/api") &&
    req.nextUrl.pathname !== "/api/login"
  ) {
    if (
      !user ||
      !user.userId ||
      !user.token ||
      !(await validateToken(user.userId, user.token))
    ) {
      // If user is not logged in, then deny request
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } else {
      // If user is logged in, then do nothing and continue to whatever API route
      return res;
    }
  }

  /*
   * Deny access to /login route if user is already logged in
   */
  if (req.nextUrl.pathname === "/login") {
    if (
      user &&
      user.userId &&
      user.token &&
      (await validateToken(user.userId, user.token))
    ) {
      // If user is already logged in, then skip login and go straight to dashboard
      // 1. Clone request but change pathname to /dashboard
      const dashboardUrl = req.nextUrl.clone();
      dashboardUrl.pathname = "/dashboard";

      // 2. Redirect to /dashboard
      return NextResponse.redirect(dashboardUrl);
    } else {
      // If user is not logged in, then do nothing and continue to /login
      return res;
    }
  }

  /*
   * Deny access to /dashboard route if user is not logged in
   */
  if (req.nextUrl.pathname === "/dashboard") {
    if (
      !user ||
      !user.userId ||
      !user.token ||
      !(await validateToken(user.userId, user.token))
    ) {
      // If user is not logged in, then redirect to login
      // 1. Delete token from session user object (if exists), which prevents further validateToken() calls (and thus DB requests)
      if (user?.token) {
        delete user.token;
        session.save();
      }

      // 2. Clone incoming request but change pathname to /login
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";

      // 3. Redirect to /login
      return NextResponse.redirect(loginUrl);
    } else {
      // If user is logged in, then do nothing and continue to /dashboard
      return res;
    }
  }

  // If request is not caught by any of the above, then do nothing and continue to whatever route
  return res;
};

/**
 * Middleware config.
 * Currently only used to specify which routes to apply the middleware to.
 */
export const config = {
  matcher: [
    /*
     * Run on all request paths but IGNORE the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - img (static image files)
     * - favicon.ico (favicon file)
     * - manifest.json (PWA manifest file)
     */
    "/((?!_next/static|_next/image|img|favicon.ico|manifest.json).*)",
  ],
};
