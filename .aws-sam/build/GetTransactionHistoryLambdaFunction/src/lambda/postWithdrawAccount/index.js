const getUser = require('../../dynamodb/getUser');
const recordTransaction = require('../../dynamodb/recordTransaction');

exports.handler = async (event, context) => {
  try {
    const data = event.body;

    const { user, cashToWithdraw } =
      typeof data === 'string' ? JSON.parse(data) : data;

    const { username, cash: currentUserCash } = await getUser(user);

    if (currentUserCash < -cashToWithdraw) {
      const error = new Error('Insufficient funds to complete withdrawal');
      error.statusCode = 420;
      throw error;
    }

    const res = await recordTransaction(username, cashToWithdraw, 'withdrawal');

    return { statusCode: 200, body: JSON.stringify(res) };
  } catch (error) {
    return {
      statusCode: error.statusCode ? error.statusCode : 400,
      body: JSON.stringify(error.message ? error.message : error),
    };
  }
};
