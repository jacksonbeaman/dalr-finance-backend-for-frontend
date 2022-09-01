const axios = require('axios');
const getUser = require('../../dynamodb/getUser');
exports.handler = async (event, context) => {
  // console.log(event);
  try {
    const user = event.queryStringParameters.user;

    const { transactions } = await getUser(user);

    return { statusCode: 200, body: JSON.stringify(transactions) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.statusCode ? error.statusCode : 400,
      body: JSON.stringify(error.message ? error.message : error),
    };
  }
};
