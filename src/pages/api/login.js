import { validateCredentials } from "../../../lib/auth/password";
import { refreshToken } from "../../../lib/auth/token";
import { withSessionRoute } from "../../../lib/session/withSession";

export default withSessionRoute(login);

async function login(req, res) {
  // Extract request body
  const { body } = req;

  // Guard: incorrect method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Guard: missing fields
  if (!body.username || !body.password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate credentials
  const userData = await validateCredentials(body.username, body.password);

  if (!userData) {
    // User not found or password incorrect
    return res.status(401).json({ message: "Invalid credentials" });
  } else {
    // The password matches; commence login
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
