const axios = require('axios');
const cheerio = require('cheerio');

const BBVA_DOLLAR = 'https://bbv.infosel.com/bancomerindicators/indexv8.aspx';

module.exports = () => axios.get(BBVA_DOLLAR)
  .then(function (response) {
    // handle success
    const $ = cheerio.load(response.data);
    const data = [];
    $('.tbl-info-financiera').last().find('tbody tr').first().find('td').each((index, item) => {
      if (index === 0) return;
      const value = $(item).text().replace('$', '').trim();
      data.push(value - 0);
    });
    return {
      key: 'bbva',
      buy: data[0],
      sell: data[1],
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
