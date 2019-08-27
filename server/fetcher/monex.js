const axios = require('axios');
const cheerio = require('cheerio');

const MONEX_DOLLAR = 'https://www.monex.com.mx/portal/';

module.exports = () => axios.get(MONEX_DOLLAR)
  .then(function (response) {
    // handle success
    const $ = cheerio.load(response.data);
    const data = [];

    $('.indicadores').first().find('.row.mb10').first().find('em').each((index, item) => {
      const value = $(item).text().replace('$', '').trim();
      data.push(value - 0);
    });
    return {
      key: 'monex',
      buy: data[0],
      sell: data[1],
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
