/**
 * @file Handlers for token management on the database.
 */
import { editUserToken, getUserById } from "@/lib/common/dynamo";
import { AuthenticationError, DatabaseError } from "@/lib/common/errors";
import { v4 as uuidv4 } from "uuid";

/**
 * Compare a given token against the one stored in the database for a given user.
 * @async
 * @param {string} userId A valid database `userId`
 * @param {string} token A valid UUID token string
 * @returns {Promise<boolean>} true if the tokens match, false otherwise
 * @throws {SyntaxError} If any parameters are missing/falsy
 * @throws {DatabaseError} If the database operation fails
 * @throws {AuthenticationError} If the user does not exist on the database
 */
export async function validateToken(userId, token) {
  // Guard: user/token missing
  if (!userId || !token) {
    throw new SyntaxError("Missing userId or token");
  }

  // Get user from db
  let userData = {};
  try {
    userData = await getUserById(userId);
  } catch (error) {
    throw new DatabaseError("Failed to get user data from database", {
      cause: error,
    });
  }

  // Guard: user doesn't exist
  if (!userData) {
    throw new AuthenticationError("User does not exist");
  }

  // Compare token values
  return token === userData.token.S;
}

/**
 * Regenerates the token for a given user.
 * @async
 * @param {string} userId A valid database `userId`
 * @returns {Promise<string>} The new UUID token string
 * @throws {SyntaxError} If any parameters are missing/falsy
 * @throws {DatabaseError} If the database operation fails
 */
export async function refreshToken(userId) {
  // Guard: user missing
  if (!userId) {
    throw new SyntaxError("Missing userId");
  }

  // Generate new token
  const token = generateToken();

  // Update token in db and return the token if successful
  try {
    await editUserToken(userId, token);
  } catch (error) {
    throw new DatabaseError("Failed to update token in database", {
      cause: error,
    });
  }

  // If we got here, the token was updated successfully
  return token;
}

/**
 * Deletes the given user's token from the database.
 * @async
 * @param {string} userId A valid database `userId`
 * @throws {SyntaxError} If any parameters are missing/falsy
 * @throws {DatabaseError} If the database operation fails
 */
export async function deleteToken(userId) {
  // Guard: user missing
  if (!userId) {
    throw new SyntaxError("Missing userId");
  }

  try {
    await editUserToken(userId, "");
  } catch (error) {
    throw new DatabaseError("Failed to delete token from database", {
      cause: error,
    });
  }
}

/**
 * Generate a 128-bit UUID as a token.
 * @private
 * @returns {string} A valid UUID token string
 */
function generateToken() {
  return uuidv4();
}
