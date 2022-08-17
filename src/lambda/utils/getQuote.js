const axios = require('axios');

const getQuote = async (symbol, iexToken) => {
  try {
    const settings = {
      url: `/${symbol}/quote?token=${iexToken}`,
      baseURL:
        process.env.NODE_ENV === 'development'
          ? `https://sandbox.iexapis.com/stable/stock`
          : `https://cloud.iexapis.com/stable/stock`,
      method: 'get',
      timeout: 0,
    };

    console.log(process.env);
    console.log(iexToken);
    const { data } = await axios(settings);

    return data;
  } catch (error) {
    throw error;
  }
};

// below syntax generates error: getQuote is not a function when using postman and serverless
// module.exports = { getQuote };

// below syntax works with postman and servless, but unrecongnized in getQuote.test.js
// module.exports = getQuote;

// below syntax must be destructered when imported for use in lambda - e.g.  { getQuote}
exports.getQuote = getQuote;

// exports = { getQuote };
