const getUser = require('../../dynamodb/getUser/index.js');
const recordTransaction = require('../../dynamodb/recordTransaction/index.js');

exports.handler = async (event, context) => {
  try {
    const data = event.body;

    const { user, cashToDeposit } =
      typeof data === 'string' ? JSON.parse(data) : data;

    const { username } = await getUser(user);

    const res = await recordTransaction(username, cashToDeposit, 'deposit');

    return { statusCode: 200, body: JSON.stringify(res) };
  } catch (error) {
    console.error(error.statusCode, error.message);
    return {
      statusCode: error.statusCode ? error.statusCode : 400,
      body: JSON.stringify(error.message ? error.message : error),
    };
  }
};
