const getUser = require('../../dynamodb/getUser');
const recordTransaction = require('../../dynamodb/recordTransaction');
const response = require('../utils/response');

exports.handler = async (event, context) => {
  try {
    const data = event.body;

    const { user, cashToWithdraw } =
      typeof data === 'string' ? JSON.parse(data) : data;

    if (cashToWithdraw >= 0) {
      const error = new Error('Improperly formatted cash value');
      error.statusCode = 420;
      throw error;
    }

    const { username, cash: currentUserCash } = await getUser(user);

    if (currentUserCash < -cashToWithdraw) {
      const error = new Error('Insufficient funds to complete withdrawal');
      error.statusCode = 421;
      throw error;
    }

    const res = await recordTransaction(username, cashToWithdraw, 'withdrawal');

    const updatedUserData = await getUser(user);

    return response.generate(200, JSON.stringify({ ...res, updatedUserData }));
  } catch (error) {
    const errorCode = error.statusCode ? error.statusCode : 400;
    const errorBody = error.message ? error.message : error;
    return response.generate(errorCode, errorBody);
  }
};
