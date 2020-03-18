const { default: axios } = require('axios');

const BANAMEX_DOLLAR = 'https://api.banamex.com/mx-gcgapi/ext/api/v1/consumer-services/catalogs/currencies/summary';
const TOKEN_URL = 'https://api.banamex.com/mx-gcgapi/ext/api/v1/oauth/token?grant_type=client_credentials&scope=/api/v1';
// Get user agent from env.
const USER_AGENT = process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0';
// ¿Hardcoded? view-source https://www.banamex.com/assets/js/w-finanzas.js
const TOKEN_AUTH = 'Njk4MjYwMmItMjNkNS00YzliLWJmMDktODA2MjY5OGUzYWQ3OlQ0cUE4bUEzb08ycVIya1gxbU04bUUweEY1ckwxZVY4YkYweFgzbkE2eFM3alMwcVI0';
const CLIENT_ID = '6982602b-23d5-4c9b-bf09-8062698e3ad7';

async function getToken() {
  const response = await axios.post(TOKEN_URL, {}, {
    headers: {
      'User-Agent': USER_AGENT,
      'Content-type': 'text/plain',
      'Authorization': 'Basic ' + TOKEN_AUTH,
      'Cache-Control': 'no-cache'
    }
  });
  return response.data;
}

async function getInfo(data) {
  const response = await axios.get(BANAMEX_DOLLAR, {
    headers: {
      'Authorization': 'Bearer ' + data.access_token,
      'client_id': CLIENT_ID,
      'Accept': 'application/json',
      'countryCode': 'MX',
      'ChannelId': 'PBMX'
    }
  });

  return response;
}

module.exports = () => getToken()
  .then(getInfo)
  .then(function (response) {
    // handle success
    const { currency } = response.data;
    const data = currency.filter(obj => obj['countryName'] === 'USA')[0];
    return {
      key: 'banamex',
      buy: data.buyPrice,
      sell: data.salePrice
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
