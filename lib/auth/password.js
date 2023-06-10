import { getUserByUsername } from "../db/dynamo";
const bcrypt = require("bcrypt");

// Validate a username/password combination & return user data
export async function validateCredentials(username, password) {
  // Get user data from database
  const userData = await getUserByUsername(username);

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
