const getUser = require('../../dynamodb/getUser/index.js');
const recordTransaction = require('../../dynamodb/recordTransaction/index.js');
const response = require('../utils/response');

exports.handler = async (event, context) => {
  try {
    const data = event.body;

    const { user, cashToDeposit } =
      typeof data === 'string' ? JSON.parse(data) : data;

    if (cashToDeposit <= 0) {
      const error = new Error('Improperly formatted cash value');
      error.statusCode = 420;
      throw error;
    }

    const { username } = await getUser(user);

    const res = await recordTransaction(username, cashToDeposit, 'deposit');

    const updatedUserData = await getUser(user);

    return response.generate(200, JSON.stringify({ ...res, updatedUserData }));
  } catch (error) {
    const errorCode = error.statusCode ? error.statusCode : 400;
    const errorBody = error.message ? error.message : error;
    return response.generate(errorCode, errorBody);
  }
};
