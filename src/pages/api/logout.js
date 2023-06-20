import { deleteToken } from "../../../lib/auth/token";
import { withSessionRoute } from "../../../lib/session/withSession";

export default withSessionRoute(logout);

async function logout(req, res) {
  // Try to delete token from db
  try {
    deleteToken(req.session.user.userId);
  } catch (error) {
    return res.status(500).json({ message: "Server error:" + error.message });
  }

  // Remove authenticated session
  req.session.destroy();

  // Tell the frontend that we're logged out (cookie removed)
  return res.status(200).json({ message: "Logout successful" });
}
