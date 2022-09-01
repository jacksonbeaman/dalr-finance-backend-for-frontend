const { GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const ddb = require('..');

const getUser = async (user) => {
  try {
    const params = { TableName: 'usersTable', Key: { username: { S: user } } };
    const command = new GetItemCommand(params);

    const { Item } = await ddb.send(command);

    if (!Item) {
      const error = new Error('Username not found');
      error.statusCode = 404;
      throw error;
    }

    return unmarshall(Item);
  } catch (error) {
    throw error;
  }
};

module.exports = getUser;
