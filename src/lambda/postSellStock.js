const getUser = require('../dynamodb/getUser');
const recordTransaction = require('../dynamodb/recordTransaction');
const getQuote = require('./utils/getQuote');

exports.handler = async (event, context) => {
  try {
    const data = event?.body;

    if (!data) {
      const error = new Error('No data in body');
      error.statusCode = 400;
      throw error;
    }

    const { user, symbol, shares } =
      typeof data === 'string' ? JSON.parse(data) : data;

    const iexToken = process.env.IEX_TOKEN;

    const { latestPrice: sharePrice, companyName } = await getQuote.getQuote(
      symbol,
      iexToken
    );

    const amount = (
      Math.floor(100 * parseInt(shares) * parseFloat(sharePrice)) / 100
    ).toFixed(2);

    const userData = await getUser(user);

    let currentSharesOwned = 0;

    if (Object.keys(userData.positions).find((elt) => elt === symbol)) {
      currentSharesOwned = userData.positions[symbol];
    } else {
      const error = new Error('No current position corresponding to symbol');
      error.statusCode = 400;
      throw error;
    }

    const updatedPositions = userData.positions;

    if (currentSharesOwned < shares) {
      const error = new Error(
        `Cannot sell more shares than shares owned - attemping to sell ${shares} shares of ${symbol}, while only ${currentSharesOwned} shares owned`
      );
      error.statusCode = 400;
      throw error;
    } else if (currentSharesOwned > shares) {
      updatedPositions[symbol] = currentSharesOwned - parseInt(shares);
    } else {
      // catch errors above
      // currentSharesOwned === shares
      delete updatedPositions[symbol];
    }

    const stockTransactionData = {
      symbol,
      companyName,
      shares: -shares,
      sharePrice,
    };

    const res = await recordTransaction(
      user,
      amount,
      'stock sale',
      stockTransactionData,
      updatedPositions
    );

    const updatedUserData = await getUser(user);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...stockTransactionData,
        amount,
        updatedUserData,
      }),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status
        ? error.response?.status
        : error.statusCode
        ? error.statusCode
        : 500,
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
