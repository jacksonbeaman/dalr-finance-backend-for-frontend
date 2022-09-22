const getUser = require('../../dynamodb/getUser');
const response = require('../utils/response');

exports.handler = async (event, context) => {
  try {
    const user = event.queryStringParameters.user;

    const userData = await getUser(user);

    return response.generate(200, JSON.stringify(userData));
  } catch (error) {
    console.error(error);

    const errorCode = error.statusCode ? error.statusCode : 400;
    const errorBody = JSON.stringify(error.message ? error.message : error);
    return response.generate(errorCode, errorBody);
  }
};
