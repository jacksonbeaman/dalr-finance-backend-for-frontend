const chai = require('chai');
const { afterEach, beforeEach, describe, it } = require('mocha');
const Sinon = require('sinon');
const {
  eventGenerator,
  iexErrorUnkownSymbol,
  iexErrorInvalidApiKey,
  iex200ResponseXom,
} = require('../utils/constants');
const { handler: getQuoteLambda } = require('../../../src/lambda/getQuote');
const getQuote = require('../../../src/lambda/utils/getQuote');

describe('getQuoteTest1', () => {
  // const OLD_ENV = Object.assign({}, process.env);q
  const OLD_ENV = { ...process.env };
  let sandbox;
  let iexStub;
  before(() => {
    sandbox = Sinon.createSandbox();
    iexStub = sandbox.stub(getQuote, 'getQuote');
  });

  afterEach(() => {
    process.env = { ...OLD_ENV };
    console.log('restored');
  });

  it('Unsucessfully returns 403 and "Invalid api key"', async () => {
    delete process.env.IEX_TOKEN;
    iexStub.throws(iexErrorInvalidApiKey);
    console.log('awaiting getQuoteLambda...');
    const res = await getQuoteLambda(
      eventGenerator('GET', '/quote', { symbol: 'xom' })
    );
    console.log(res);

    console.log('catching error...');

    chai.expect(res.statusCode).to.equal(403);
    chai.expect(res.body).to.equal('"The API key provided is not valid."');
  });

  it('Unsuccessfully returns statusCode 404 and "Unknown symbol"', async () => {
    console.log('awaiting getQuoteLambda...');

    iexStub.throws(iexErrorUnkownSymbol);
    const res = await getQuoteLambda(
      eventGenerator('GET', '/quote', { symbol: 'xo' })
    );

    console.log(res);

    console.log('catching error...');

    chai.expect(res.statusCode).to.equal(404);
    chai.expect(res.body).to.equal('"Unknown symbol"');
  });

  it('Unsuccessfully returns statusCode 400 and "no query string"', async () => {
    console.log('awaiting getQuoteLambda...');
    const res = await getQuoteLambda(eventGenerator('GET', '/quote'));
    console.log(res);

    console.log('catching error...');

    chai.expect(res.statusCode).to.equal(400);
    chai
      .expect(JSON.parse(res.body))
      .to.equal('Incorrectly formatted query string');
  });

  it('Successfully returns 200 and "Exxon Mobil Corp."', async () => {
    iexStub.returns(iex200ResponseXom);
    console.log('awaiting getQuoteLambda...');
    const res = await getQuoteLambda(
      eventGenerator('GET', '/quote', { symbol: 'xom' })
    );
    console.log('catching error...');
    const {
      body: { companyName },
    } = JSON.parse(res.body);

    chai.expect(res.statusCode).to.equal(200);
    chai.expect(companyName).to.equal('Exxon Mobil Corp.');
  });

  // add it / test cases
  // unit testing - js works in its own components - not connected to other functions - stubbing returns from other functions not being tested
  // integration tests are run after deployment
  // e2e - end to end as the user would

  // integrations test
});
