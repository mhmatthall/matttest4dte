/**
 * @file Custom error definitions.
 */

/** Error occurred in authentication logic */
export class AuthenticationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "AuthenticationError";
  }
}

/** Error occurred during database interface */
export class DatabaseError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "DatabaseError";
  }
}

/** API error caused by the server */
export class ServerError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ServerError";
  }
}

/** API error caused by the client */
export class ClientError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ClientError";
  }
}
