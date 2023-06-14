/**
 * @file Login API endpoint
 */
import { getUserData } from "../../../lib/auth/account";
import { refreshToken } from "../../../lib/auth/token";
import { withSessionRoute } from "../../../lib/session/withSession";

/** Wrap login route so we can read session cookie */
export default withSessionRoute(login);

/**
 * Login route handler.
 * @param {Request} req The incoming HTTP request object
 * @param {Response} res The outgoing HTTP response object
 * @returns {Promise<Response>} The response object
 */
async function login(req, res) {
  // Extract request body
  const { body } = req;

  // Guard: incorrect method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Guard: missing fields
  if (!body.username || !body.password) {
    return res
      .status(400)
      .json({ message: "Missing required fields, please try again." });
  }

  // Validate credentials
  let userData = {};
  try {
    userData = await getUserData(body.username, body.password);
  } catch (error) {
    // Something went wrong when validating credentials
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }

  if (!userData) {
    // User not found or credentials incorrect
    return res
      .status(401)
      .json({ message: "Wrong username or password, please try again." });
  } else {
    // The credentials are correct; commence login
    // Generate new token
    const newToken = await refreshToken(userData.userId.S);

    // Guard: token generation failed
    if (!newToken) {
      return res.status(500).json({ message: "Internal server error" });
    }

    // Create session cookie
    req.session.user = {
      userId: userData.userId.S,
      token: newToken,
      username: userData.username.S,
      name: userData.name.S,
      roles: userData.roles.SS,
    };
    await req.session.save();

    // Tell the frontend that we're logged in (cookie set)
    return res.status(200).json({ message: "Login successful" });
  }
}
