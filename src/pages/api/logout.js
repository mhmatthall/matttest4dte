import { deleteToken } from "../../../lib/auth/token";
import { withSessionRoute } from "../../../lib/session/withSession";

export default withSessionRoute(logout);

async function logout(req, res) {
  // Delete token from db
  deleteToken(req.session.user.userId);

  // Remove authenticated session
  req.session.destroy();

  // Tell the frontend that we're logged out (cookie removed)
  return res.status(200).json({ message: "Logout successful" });
}
