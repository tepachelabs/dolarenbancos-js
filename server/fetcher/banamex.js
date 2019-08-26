const axios = require('axios');

const BANAMEX_DOLLAR = 'https://finanzasenlinea.infosel.com/banamex/WSFeedJSON/service.asmx/DivisasLast?callback=';

module.exports = () => axios.get(BANAMEX_DOLLAR)
  .then(function (response) {
    // handle success
    const data = response.data.filter(obj => obj['cveInstrumento'] === 'MXNUS')[0];
    return {
      key: 'banamex',
      buy: data['ValorActualCompra'] - 0,
      sell: data['ValorActualVenta'] - 0
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
