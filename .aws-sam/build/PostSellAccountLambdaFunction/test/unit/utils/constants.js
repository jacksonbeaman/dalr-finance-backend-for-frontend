const eventGenerator = (httpMethod, path, queryString, body) => ({
  resource: '/',
  path,
  httpMethod,
  requestContext: {
    resourcePath: path,
    httpMethod,
    path: '/',
  },
  headers: {
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    Host: '70ixmpl4fl.execute-api.us-east-2.amazonaws.com',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
    'X-Amzn-Trace-Id': 'Root=1-5e66d96f-7491f09xmpl79d18acf3d050',
  },
  multiValueHeaders: {
    accept: [
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    ],
    'accept-encoding': ['gzip, deflate, br'],
  },
  queryStringParameters: queryString ?? null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  body: body ?? null,
  isBase64Encoded: false,
});

// pathParameters vs. query strings
// pathParameters - good for dealing with folder structure dynamically
// pathParameters to be used sparingly

const iexErrorUnkownSymbol = {
  response: {
    message: 'Request failed with status code 404',
    name: 'Error',
    stack:
      'Error: Request failed with status code 404\n    at createError (C:\\Users\\Tamino\\dev\\web\\dalr-finance-backend-for-frontend\\node_modules\\axios\\lib\\core\\createError.js:16:15)\n    at settle (C:\\Users\\Tamino\\dev\\web\\dalr-finance-backend-for-frontend\\node_modules\\axios\\lib\\core\\settle.js:17:12)\n    at IncomingMessage.handleStreamEnd (C:\\Users\\Tamino\\dev\\web\\dalr-finance-backend-for-frontend\\node_modules\\axios\\lib\\adapters\\http.js:322:11)\n    at IncomingMessage.emit (events.js:327:22)\n    at IncomingMessage.EventEmitter.emit (domain.js:467:12)\n    at endReadableNT (internal/streams/readable.js:1327:12)\n    at processTicksAndRejections (internal/process/task_queues.js:80:21)',
    config: {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false,
      },
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': 'axios/0.26.0',
        server: 'nginx',
        date: 'Fri, 08 Jul 2022 01:48:15 GMT',
        'transfer-encoding': 'chunked',
        connection: 'close',
        'strict-transport-security': 'max-age=15768000',
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
        'access-control-allow-methods': 'GET, OPTIONS',
        'access-control-allow-headers':
          'Origin, X-Requested-With, Content-Type, Accept, Request-Source',
      },
      url: '/xo/quote?token=Tpk_4120a800c2054d06ac06e68db942b93b',
      baseURL: 'https://sandbox.iexapis.com/stable/stock',
      method: 'get',
    },
    status: 404,
    statusText: 'Unknown symbol',
    data: 'Unknown symbol',
  },
  isAxiosError: true,
};

const iexErrorInvalidApiKey = {
  response: {
    message: 'Request failed with status code 403',
    name: 'Error',
    stack:
      'Error: Request failed with status code 403\n    at createError (C:\\Users\\Tamino\\dev\\web\\dalr-finance-backend-for-frontend\\node_modules\\axios\\lib\\core\\createError.js:16:15)\n    at settle (C:\\Users\\Tamino\\dev\\web\\dalr-finance-backend-for-frontend\\node_modules\\axios\\lib\\core\\settle.js:17:12)\n    at IncomingMessage.handleStreamEnd (C:\\Users\\Tamino\\dev\\web\\dalr-finance-backend-for-frontend\\node_modules\\axios\\lib\\adapters\\http.js:322:11)\n    at IncomingMessage.emit (events.js:327:22)\n    at endReadableNT (internal/streams/readable.js:1327:12)\n    at processTicksAndRejections (internal/process/task_queues.js:80:21)',
    config: {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false,
      },
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      url: '/xom/quote?token=undefined',
      baseURL: 'https://sandbox.iexapis.com/stable/stock',
      method: 'get',
    },
    status: 403,
    statusText: 'The API key provided is not valid.',
    data: 'The API key provided is not valid.',
  },
  isAxiosError: true,
};

const iex200ResponseXom = {
  statusCode: 200,
  headers: {
    contentType: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: {
    avgTotalVolume: 32530045,
    calculationPrice: 'close',
    change: -1.19,
    changePercent: -0.01386,
    close: 86.8,
    closeSource: 'iicaffol',
    closeTime: 1660936145152,
    companyName: 'Exxon Mobil Corp.',
    currency: 'USD',
    delayedPrice: 88.17,
    delayedPriceTime: 1688611446419,
    extendedChange: -0.5,
    extendedChangePercent: -0.00596,
    extendedPrice: 88,
    extendedPriceTime: 1709786285717,
    high: 86.8,
    highSource: 'cn5 dl iraeuepdet1meyi ',
    highTime: 1714036328768,
    iexAskPrice: 0,
    iexAskSize: 0,
    iexBidPrice: 0,
    iexBidSize: 0,
    iexClose: 85.73,
    iexCloseTime: 1685473834607,
    iexLastUpdated: 1699285528494,
    iexMarketPercent: 0.020149817284353576,
    iexOpen: 87.32,
    iexOpenTime: 1711176216548,
    iexRealtimePrice: 85.99,
    iexRealtimeSize: 307,
    iexVolume: 434933,
    lastTradeTime: 1659586974022,
    latestPrice: 85.8,
    latestSource: 'Close',
    latestTime: 'July 12, 2022',
    latestUpdate: 1714413083338,
    latestVolume: 21335186,
    low: 84.61,
    lowSource: 'd n t ecuipmyadeierel15',
    lowTime: 1659533708376,
    marketCap: 358689719184,
    oddLotDelayedPrice: 86.41,
    oddLotDelayedPriceTime: 1665414506927,
    open: 86.51,
    openTime: 1735828662866,
    openSource: 'filcfiao',
    peRatio: 14.05,
    previousClose: 89.53,
    previousVolume: 16308497,
    primaryExchange: 'NX   SIAHR.EWKCOEC NKTGNYCOE',
    symbol: 'XOM',
    volume: 21622478,
    week52High: 110.54,
    week52Low: 51.03,
    ytdChange: 0.4305718604591006,
    isUSMarketOpen: false,
  },
};

// module.exports = { eventGenerator, iexError };

exports.eventGenerator = eventGenerator;
exports.iexErrorUnkownSymbol = iexErrorUnkownSymbol;
exports.iexErrorInvalidApiKey = iexErrorInvalidApiKey;
exports.iex200ResponseXom = iex200ResponseXom;
