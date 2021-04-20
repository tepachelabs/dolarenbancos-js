const axios = require('axios');
const cheerio = require('cheerio');

const BANORTE_DOLLAR = 'https://www.banorte.com/indicadores/dolar';

async function getInfo () {
  return await axios.get(BANORTE_DOLLAR)
}

module.exports = () => getInfo()
  .then(function (response) {
    // Banorte is a dirty page. It returns an html of this request, hence the usage of cheerio
    const $ = cheerio.load(response.data);
    const buy = Number($('row').first().attr('compra')).toFixed(2)
    const sell = Number($('row').first().attr("venta")).toFixed(2)

    return {
      key: 'banorte',
      buy: buy,
      sell: sell,
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
