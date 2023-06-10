import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

export function getConnection() {
  // Create DynamoDB client
  return new DynamoDBClient({
    region: "eu-west-2",
    credentials: {
      accessKeyId: process.env.DTE_TEST_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.DTE_TEST_AWS_SECRET_ACCESS_KEY,
    },
  });
}

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
    return false;
  }
}

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
    return false;
  }
}

// Replace all user data on the db given a user object
// DOES NOT TOUCH USERID OR SESSION TOKEN
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
    return false;
  }
}

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
    return false;
  }
}
