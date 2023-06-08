import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { withSessionRoute } from "../../../lib/withSession";
const bcrypt = require("bcrypt");

export default withSessionRoute(login);

async function login(req, res) {
  // Extract body
  const { body } = req;

  // Guard: incorrect method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Guard: missing fields
  if (!body.username || !body.password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Get user data from database
  const userData = await getUserByUsername(body.username);

  // Validation: user doesn't exist
  if (!userData) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Validation: password
  bcrypt.compare(
    body.password,
    userData.password.S,
    async function (err, result) {
      if (result) {
        // The password matches; create session cookie
        req.session.user = {
          id: userData.userId.S,
          username: userData.username.S,
          name: userData.name.S,
        };

        await req.session.save();

        // Tell the frontend that we're logged in (cookie set)
        res.send({ ok: true });
      } else {
        // The password doesn't match
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
}

async function getUserByUsername(username) {
  // Create DynamoDB client
  const dbClient = new DynamoDBClient({
    region: "eu-west-2",
    credentials: {
      accessKeyId: process.env.DTE_TEST_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.DTE_TEST_AWS_SECRET_ACCESS_KEY,
    },
  });

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

    // Guard for missing user
    if (dbResults.Count === 0) {
      return false;
    } else {
      // Return user data
      return dbResults.Items[0];
    }
  } catch (error) {
    console.log("Database error:", error);
    return false;
  }
}
