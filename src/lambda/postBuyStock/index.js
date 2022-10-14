const getUser = require('../../dynamodb/getUser');
const recordTransaction = require('../../dynamodb/recordTransaction');
const getQuote = require('../utils/getQuote');
const response = require('../utils/response');

exports.handler = async (event, context) => {
  try {
    const data = event?.body;

    if (!data) {
      const error = new Error('No data in body');
      error.statusCode = 400;
      throw error;
    }

    const { user, shares } = typeof data === 'string' ? JSON.parse(data) : data;

    let { symbol } = typeof data === 'string' ? JSON.parse(data) : data;

    const iexToken = process.env.IEX_TOKEN;

    const {
      latestPrice: sharePrice,
      companyName,
      symbol: iexFormattedSymbol,
    } = await getQuote.getQuote(symbol, iexToken);

    symbol = iexFormattedSymbol.trim().toUpperCase();

    const amount = -(
      Math.floor(100 * parseInt(shares) * parseFloat(sharePrice)) / 100
    ).toFixed(2);

    const userData = await getUser(user);

    if (userData.cash < -amount) {
      const error = new Error('Insufficient funds to complete transaction');
      error.statusCode = 400;
      throw error;
    }

    let currentSharesOwned = 0;

    if (Object.keys(userData.positions).find((elt) => elt === symbol)) {
      currentSharesOwned = userData.positions[symbol];
    } else {
      console.log('symbol not owned');
    }

    const updatedPositions = userData.positions;

    updatedPositions[symbol] = parseInt(shares) + currentSharesOwned;

    const stockTransactionData = {
      symbol,
      companyName,
      shares,
      sharePrice,
    };

    const res = await recordTransaction(
      user,
      amount,
      'stock purchase',
      stockTransactionData,
      updatedPositions
    );

    const updatedUserData = await getUser(user);

    return response.generate(
      200,
      JSON.stringify({
        ...stockTransactionData,
        amount,
        updatedUserData,
      })
    );
  } catch (error) {
    const errorCode = error.response?.status
      ? error.response?.status
      : error.statusCode
      ? error.statusCode
      : 500;
    const errorBody = error.response?.data
      ? error.response?.data
      : error.message
      ? error.message
      : error;
    return response.generate(errorCode, errorBody);
  }
};
