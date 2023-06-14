/**
 * @file Handlers for authenticated account management
 */
import { getUserByUsername } from "../db/dynamo";
import { AuthenticationError } from "./errors";
const bcrypt = require("bcrypt");

/**
 * Try to get user data with a set of credentials.
 * Only correct credentials will return any user data.
 * @async
 * @param {string} username A username
 * @param {string} password A password
 * @returns {Promise<false|Record<string, AttributeValue>}
 *   If given credentials are correct, will return a Record of user data from the server.
 *   If incorrect, will return false.
 * @throws {AuthenticationError} Database error
 */
export async function getUserData(username, password) {
  /*
   * The reason we combine the credential validation with the retrieval of user data is
   * due to trying to maximise the efficiency of our AWS database requests, which cost the
   * same regardless of the size of the response.
   * So, use this function for both checking credentials and retrieving user data.
   */
  let userData = false;
  try {
    // Get user data from database
    userData = await getUserByUsername(username);
  } catch (error) {
    throw new AuthenticationError(
      "Couldn't access database for authentication",
      { cause: error }
    );
  }

  // Guard: user doesn't exist
  if (!userData) {
    return false;
  }

  // Compare password hashes
  if (await bcrypt.compare(password, userData.password.S)) {
    return userData;
  } else {
    return false;
  }
}
