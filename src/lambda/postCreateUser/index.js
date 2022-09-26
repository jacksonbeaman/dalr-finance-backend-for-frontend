const { PutItemCommand } = require('@aws-sdk/client-dynamodb');
const ddb = require('../../dynamodb');
const response = require('../utils/response');

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

    return response.generate(200, JSON.stringify(res));
  } catch (error) {
    const errorCode = 400;
    const errorBody = error;
    return response.generate(errorCode, JSON.stringify(errorBody));
  }
};
