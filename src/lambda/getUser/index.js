const getUser = require('../../dynamodb/getUser');
const response = require('../utils/response');

exports.handler = async (event, context) => {
  try {
    const user = event.queryStringParameters.user;

    const userData = await getUser(user);

    return response.generate(200, JSON.stringify(userData));
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode ? error.statusCode : 400,
      body: JSON.stringify(error.message ? error.message : error),
    };
  }
};
