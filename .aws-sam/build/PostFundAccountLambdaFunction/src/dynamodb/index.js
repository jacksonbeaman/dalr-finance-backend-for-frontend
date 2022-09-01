const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const ddbConfig = {
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const ddbClient = new DynamoDBClient({ ...ddbConfig });
const ddb = DynamoDBDocumentClient.from(ddbClient);

// export { ddb };
module.exports = ddb;
