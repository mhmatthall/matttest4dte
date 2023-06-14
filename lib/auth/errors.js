/**
 * @file Custom error definitions for authentication issues
 */

/** General error for when authentication fails */
export class AuthenticationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "AuthenticationError";
  }
}
