import { getIronSession } from "iron-session/edge";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const res = NextResponse.next();
  // You just have to mannually setup the session here because
  // it's the middleware and a bit spooky (you can't use anything in /lib/withSession)
  const session = await getIronSession(req, res, {
    cookieName: "DTE-TEST_SESSION_COOKIE",
    password: process.env.SESSION_SECRET,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });

  // Read user from session
  const { user } = session;

  // If unauthenticated, prevent from accessing dashboard
  if (!user && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If authenticated, prevent from accessing login page
  if (user && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
};
