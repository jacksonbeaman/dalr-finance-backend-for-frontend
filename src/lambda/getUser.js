const getUser = require('../dynamodb/getUser');

exports.handler = async (event, context) => {
  try {
    const user = event.queryStringParameters.user;

    const userData = await getUser(user);

    return { statusCode: 200, body: JSON.stringify(userData) };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode ? error.statusCode : 400,
      body: JSON.stringify(error.message ? error.message : error),
    };
  }
};
