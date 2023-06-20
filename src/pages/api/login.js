/**
 * @file Login API endpoint
 */
import { refreshToken } from "../../../lib/auth/token";
import { getUserByUsername } from "../../../lib/db/dynamo";
import { ClientError, ServerError } from "../../../lib/errors";
import { withSessionRoute } from "../../../lib/session/withSession";
const bcrypt = require("bcrypt");

/** Wrap login route so we can read session cookie */
export default withSessionRoute(login);

/**
 * Login route handler.
 * @async
 * @param {Request} req The incoming HTTP request object
 * @param {Response} res The outgoing HTTP response object
 * @returns {Promise<Response>} A modified HTTP response object
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

  // Try to load user data with given credentials
  let userData = {};
  try {
    userData = await loadUserData(body.username, body.password);
  } catch (error) {
    if (error instanceof ClientError) {
      // If the error was caused by the user, then return a 401
      return res
        .status(401)
        .json({ message: "Wrong username or password, please try again." });
    } else if (error instanceof ServerError) {
      // If the error was caused by the server, then return a 500
      return res.status(500).json({ message: "Server error:" + error.message });
    } else {
      // If the error was caused by something else, then return a 500
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // The credentials are correct, so try to create a new session
  try {
    await createSession(req, userData);
  } catch (error) {
    if (error instanceof ServerError) {
      // If the error was caused by the server, then return a 500
      return res.status(500).json({ message: "Server error:" + error.message });
    } else {
      // If the error was caused by something else, then return a 500
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // If nothing failed, then return success!
  return res.status(200).json({ message: "Login successful" });
}

/**
 * Retrieve user data from the database.
 * @async
 * @param {string} username A username string
 * @param {string} password A password string
 * @returns {Promise<Record<string, AttributeValue>}
 *   If given credentials are correct, will return a Record of user data from the server.
 * @throws {ServerError} If there was an error accessing the database
 * @throws {ClientError} If the user doesn't exist or the password is incorrect
 */
async function loadUserData(username, password) {
  /*
   * The reason we combine the credential validation with the retrieval of user data is
   * due to trying to maximise the efficiency of our AWS database requests, which cost the
   * same regardless of the size of the response.
   * So, use this function for both checking credentials and retrieving user data.
   */
  // Try to get user data from database
  let userData = {};
  try {
    userData = await getUserByUsername(username);
  } catch (error) {
    throw new ServerError("Couldn't access database for authentication", {
      cause: error,
    });
  }

  // Guard: user doesn't exist
  if (!userData) {
    throw new ClientError("User doesn't exist");
  }

  // Guard: invalid password
  if (!(await bcrypt.compare(password, userData.password.S))) {
    throw new ClientError("Invalid password");
  }

  return userData;
}

/**
 * Create a local session cookie for the given user.
 * @async
 * @param {Request} req The incoming HTTP request object
 * @param {Record<string, AttributeValue>} userData A user data object
 * @throws {ServerError} If there was an error generating the token
 */
async function createSession(req, userData) {
  // Generate new token
  let newToken = {};
  try {
    newToken = await refreshToken(userData.userId.S);
  } catch (error) {
    throw new ServerError("Error generating token", { cause: error });
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
}
