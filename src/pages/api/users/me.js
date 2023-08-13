import { withSessionRoute } from "@/lib/auth/withSession";

/** Wrap login route so we can read session cookie */
export default withSessionRoute(handler);

/**
 * Handler for getting user's own data
 * @param {Request} req The incoming HTTP request object
 * @param {Response} res The outgoing HTTP response object
 * @returns {Response} A modified HTTP response object
 */
function handler(req, res) {
  // Guard: incorrect method
  if (req.method === "POST" || req.method === "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method === "GET") {
    // Return a selective subset of the user data, as not to leak sensitive info (e.g. session token)
    return res.status(200).json({
      username: req.session.user.username,
      name: req.session.user.name,
      roles: req.session.user.roles,
    });
  }

  if (req.method === "DELETE") {
    return res.status(501).json({ message: "DELETE not implemented" });
  }

  // If we get here then something is wrong
  return res.status(500).json({ message: "Internal server error" });
}
