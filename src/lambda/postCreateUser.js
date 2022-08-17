const { PutItemCommand } = require('@aws-sdk/client-dynamodb');
const ddb = require('../dynamodb');

exports.handler = async (event, context) => {
  try {
    const user = event.queryStringParameters.user;

    const ddbUser = {
      username: { S: user },
      transactions: { L: [] },
      positions: { M: {} },
      cash: { N: '0' },
    };

    const params = { TableName: 'usersTable', Item: ddbUser };

    const command = new PutItemCommand(params);

    const res = await ddb.send(command);

    return { statusCode: 200, body: JSON.stringify(res) };
  } catch (error) {
    console.error(error);
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};
