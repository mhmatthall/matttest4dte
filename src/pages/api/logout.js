import { withSessionRoute } from "../../../lib/session/withSession";

export default withSessionRoute(logout);

async function logout(req, res) {
  // Remove authenticated session
  req.session.destroy();

  // Tell the frontend that we're logged out (cookie removed)
  res.send({ ok: true });
}