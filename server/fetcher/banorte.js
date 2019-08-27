const axios = require('axios');
const cheerio = require('cheerio');

const BANORTE_DOLLAR = 'https://www.banorte.com/wps/portal/ixe/Home/indicadores/tipo-de-cambio';

module.exports = () => axios.get(BANORTE_DOLLAR)
  .then(function (response) {
    // handle success
    const $ = cheerio.load(response.data);

    let script = $('#indicadores_financieros_wrapper script').last().get()[0].children[0].data;
    script = /var\svalor\s\=\s\'\{.*\}\'/g.exec(script);
    script = script[0].replace('var valor = \'', '').replace(/\'$/, '');

    const values = JSON.parse(script);

    return {
      key: 'banorte',
      buy: values.tablaDolar[0].compra - 0,
      sell: values.tablaDolar[0].venta - 0,
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
