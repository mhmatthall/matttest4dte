/**
 * @file App-specific database interface methods for AWS DynamoDB.
 */
import {
  DynamoDBClient,
  GetItemCommand,
  InternalServerError,
  QueryCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

/**
 * Configures a connection request to the database.
 * @private
 * @returns {DynamoDBClient} A database client object
 */
function getConnection() {
  // Create DynamoDB client
  return new DynamoDBClient({
    region: "eu-west-2",
    credentials: {
      accessKeyId: process.env.DTE_TEST_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.DTE_TEST_AWS_SECRET_ACCESS_KEY,
    },
  });
}

/**
 * Fetch a user from the database by `username`
 * @async
 * @param {string} username
 * @returns {Promise<Record<string, AttributeValue>} A user record
 * @throws {InternalServerError} Database error
 */
export async function getUserByUsername(username) {
  const dbClient = getConnection();

  // Create and send get request on secondary index `username-index`
  try {
    const dbResults = await dbClient.send(
      new QueryCommand({
        TableName: "user",
        IndexName: "username-index",
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
          ":username": { S: username },
        },
      })
    );

    // Guard: no results
    if (dbResults.Count === 0) {
      return false;
    }

    // Return first result
    return dbResults.Items[0];
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Database error");
  } finally {
    dbClient.destroy();
  }
}

/**
 * Fetch a user from the database by `userId`
 * @param {string} userId A valid database `userId`
 * @returns {Promise<Record<string, AttributeValue>} A user record
 * @throws {InternalServerError} Database error
 */
export async function getUserById(userId) {
  const dbClient = getConnection();

  // Create and send get request
  try {
    const dbResults = await dbClient.send(
      new GetItemCommand({
        TableName: "user",
        Key: {
          userId: { S: userId },
        },
      })
    );

    // Guard: no results
    if (!dbResults.Item) {
      return false;
    }

    // Return result
    return dbResults.Item;
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Database error");
  } finally {
    dbClient.destroy();
  }
}

/**
 * Update a given user's user data.
 * It does not update the `session` property.
 * @param {object} user The user object from the session
 * @returns {Promise<boolean>} true if operation was successful (HTTP 200)
 * @throws {InternalServerError} Database error
 */
export async function updateUserData(user) {
  const dbClient = getConnection();

  // Create and send post request
  try {
    const dbResults = await dbClient.send(
      new UpdateItemCommand({
        TableName: "user",
        Key: {
          userId: { S: user.userId },
        },
        UpdateExpression:
          "SET #username = :username, #name = :name, #roles = :roles, #updated = :updated",
        ExpressionAttributeNames: {
          "#username": "username",
          "#name": "name",
          "#roles": "roles",
          "#updated": "updated",
        },
        ExpressionAttributeValues: {
          ":username": { S: user.username },
          ":name": { S: user.name },
          ":roles": { SS: user.roles },
          ":updated": { S: new Date().toISOString() },
        },
        ReturnValues: "NONE",
      })
    );
    return dbResults.$metadata.httpStatusCode === 200;
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Database error");
  } finally {
    dbClient.destroy();
  }
}

/**
 * Replace the token property for a given user
 * @param {string} userId A valid database `userId`
 * @param {string} token A new token; either a valid UUID string or the empty string ""
 * @returns {Promise<boolean>} true if operation was successful (HTTP 200)
 * @throws {InternalServerError} Database error
 */
export async function editUserToken(userId, token) {
  const dbClient = getConnection();

  // Create and send post request
  try {
    const dbResults = await dbClient.send(
      new UpdateItemCommand({
        TableName: "user",
        Key: {
          userId: { S: userId },
        },
        UpdateExpression: "SET #token = :token, #updated = :updated",
        ExpressionAttributeNames: {
          "#token": "token",
          "#updated": "updated",
        },
        ExpressionAttributeValues: {
          ":token": { S: token },
          ":updated": { S: new Date().toISOString() },
        },
        ReturnValues: "NONE",
      })
    );

    return dbResults.$metadata.httpStatusCode === 200;
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Database error");
  } finally {
    dbClient.destroy();
  }
}
