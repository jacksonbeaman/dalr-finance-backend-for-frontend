const getQuote = require('../utils/getQuote');

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

    const headers = {
      contentType: 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    const body = JSON.stringify(data);

    return { statusCode: 200, headers, body };
  } catch (error) {
    return {
      statusCode: error.response?.status
        ? error.response?.status
        : error.statusCode
        ? error.statusCode
        : 400,
      body: JSON.stringify(
        error.response?.data
          ? error.response?.data
          : error.message
          ? error.message
          : error
      ),
    };
  }
};
