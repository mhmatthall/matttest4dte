import { v4 as uuidv4 } from "uuid";
import { editUserToken, getUserById } from "../db/dynamo";

// Compare given token with token stored on db for given user
export async function validateToken(userId, token) {
  // Guard: user/token missing
  if (!userId || !token) {
    return false;
  }

  // Get user from db
  const userData = await getUserById(userId);

  // Guard: user doesn't exist
  if (!userData) {
    return false;
  }

  // Compare token values
  return token === userData.token.S;
}

// Create a new token and give it to the db
// Return the new token if successful, false otherwise
export async function refreshToken(userId) {
  // Guard: user missing
  if (!userId) {
    return false;
  }

  // Generate new token
  const token = generateToken();

  // Update token in db and return the token if successful
  if (!(await editUserToken(userId, token))) {
    return false;
  } else {
    return token;
  }
}

// Delete a token from the db
export async function deleteToken(userId) {
  // Guard: user missing
  if (!userId) {
    return false;
  }

  // Update token in db and return true/false if successful
  return await editUserToken(userId, "");
}

// Generate a 128-bit UUID as a token
function generateToken() {
  return uuidv4();
}
