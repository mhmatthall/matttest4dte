// Wrapper functions for checking session auth
import { ironOptions } from "@/lib/auth/iron-config";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, ironOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, ironOptions);
}
