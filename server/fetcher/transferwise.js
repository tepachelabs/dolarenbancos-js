const axios = require('axios');

const USER_AGENT = process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0';
const TRANSFERWISE_CURRENCY_URL = 'https://transferwise.com/gateway/v2/quotes/';
const POST_DATA = {
  guaranteedTargetAmount: false,
  preferredPayIn: null,
  sourceAmount: 1,
  sourceCurrency: 'USD',
  targetCurrency: 'MXN'
}

module.exports = () => axios.post(TRANSFERWISE_CURRENCY_URL,
  POST_DATA,
  {
    headers: {
      'User-Agent': USER_AGENT,
      'Cache-Control': 'no-cache',
}
  })
  .then(function ({data}) {
    // handle success
    return {
      key: 'transferwise',
      buy: data['rate'] - 0,
      sell: data['rate'] - 0,
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
