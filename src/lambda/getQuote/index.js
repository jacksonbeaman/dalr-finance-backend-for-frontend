const getQuote = require('../utils/getQuote');
const response = require('../utils/response');

exports.handler = async (event, context) => {
  try {
    const symbol = event.queryStringParameters?.symbol;

    if (!symbol) {
      console.log(`help: ${symbol}`);
      const error = new Error('Incorrectly formatted query string');
      error.statusCode = 400;
      throw error;
    }
    const iexToken =
      process.env.NODE_ENV === 'development'
        ? process.env.IEX_TOKEN
        : process.env.IEX_TOKEN_PROD;

    const data = await getQuote.getQuote(symbol, iexToken);

    const body = JSON.stringify(data);

    return response.generate(200, body);
  } catch (error) {
    const errorCode = error.response?.status
      ? error.response?.status
      : error.statusCode
      ? error.statusCode
      : 400;
    const errorBody = error.response?.data
      ? error.response?.data
      : error.message
      ? error.message
      : error;
    return response.generate(errorCode, errorBody);
  }
};
