const getUser = require('../../dynamodb/getUser/index.js');
const recordTransaction = require('../../dynamodb/recordTransaction/index.js');
const response = require('../utils/response');

exports.handler = async (event, context) => {
  try {
    const data = event.body;

    const { user, cashToDeposit } =
      typeof data === 'string' ? JSON.parse(data) : data;

    const { username } = await getUser(user);

    const res = await recordTransaction(username, cashToDeposit, 'deposit');

    return response.generate(200, JSON.stringify(res));
  } catch (error) {
    const errorCode = error.statusCode ? error.statusCode : 400;
    const errorBody = error.message ? error.message : error;
    return response.generate(errorCode, errorBody);
  }
};
