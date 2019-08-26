const axios = require('axios');
const cheerio = require('cheerio');

const INBURSA_DOLLAR = 'https://www.inbursa.com/portal/';

module.exports = () => axios.get(INBURSA_DOLLAR)
  .then(function (response) {
    // handle success
    const $ = cheerio.load(response.data);
    const data = [];
    $('#Divisas tbody tr').first().find('td').each((index, item) => {
      if (index === 0) return;
      const value = $(item).text().replace('$', '').trim();
      data.push(value - 0);
    });
    return {
      key: 'inbursa',
      buy: data[0],
      sell: data[1],
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
