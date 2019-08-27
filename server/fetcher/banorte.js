const axios = require('axios');
const cheerio = require('cheerio');

const MONEX_DOLLAR = 'https://www.monex.com.mx/portal/';

module.exports = () => axios.get(MONEX_DOLLAR)
  .then(function (response) {
    // handle success
    const $ = cheerio.load(response.data);
    const data = [];

    $('#tablaDolar').last().find('td').each((index, item) => {
      console.log(item);
      if (index === 0) return;
      const value = $(item).text().replace('$', '').trim();
      data.push(value - 0);
    });
    console.log($('#tablaDolar'));
    return {
      key: 'banorte',
      buy: data[0],
      sell: data[1],
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
