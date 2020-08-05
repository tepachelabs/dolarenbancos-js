const axios = require('axios');

const USER_AGENT = process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0';
const BILL_CURRENCY_URL = 'https://app.bill.com/api/v2/ExternalCurrencyConverter.json';
const POST_DATA = 'data={"fundingAmount" : 1, "localCurrency" : "MXN", "partnerType" : "0"}';

module.exports = () => axios.post(BILL_CURRENCY_URL,
  POST_DATA,
  {
    headers: {
      'User-Agent': USER_AGENT,
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cache-Control': 'no-cache'
    }
  })
  .then(function (response) {
    // handle success
    const data = response.data['response_data'];
    return {
      key: 'billdotcom',
      buy: data['exchangeRate'] - 0,
      sell: data['disburseAmount'] - 0,
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
