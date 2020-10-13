const { default: axios } = require('axios');
const cheerio = require('cheerio');

// Get user agent from env.
const USER_AGENT = process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0';

// Banco Azteca URL
const BANCOAZTECA_URL = 'https://web.bancoazteca.com.mx/eBanking/tcDivisas.do';

async function getInfo() {
  const response = await axios.get(BANCOAZTECA_URL, {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'text/html',
    }
  });

  return response;
}

module.exports = () => getInfo()
  .then(function (response) {
    // handle success
    const $ = cheerio.load(response.data);
    const buyPrice = Number($('#cusa').text().slice(1));
    const sellPrice = Number($('#vusa').text().slice(1));
    return {
      key: 'bancoazteca',
      buy: buyPrice,
      sell: sellPrice
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
