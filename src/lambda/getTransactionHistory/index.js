const axios = require('axios');
const getUser = require('../../dynamodb/getUser');
const response = require('../utils/response');
exports.handler = async (event, context) => {
  try {
    const user = event.queryStringParameters.user;

    const { transactions } = await getUser(user);

    return response.generate(200, JSON.stringify(transactions));
  } catch (error) {
    const errorCode = error.statusCode ? error.statusCode : 400;
    const errorBody = error.message ? error.message : error;
    return response.generate(errorCode, errorBody);
  }
};
