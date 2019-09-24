const axios = require('axios');

const SANTANDER_DOLLAR = 'https://finanzasenlinea.infosel.com/Santanderfeed/Feed.asmx/Divisas';

module.exports = () => axios.get(SANTANDER_DOLLAR)
  .then(function (response) {
    // handle success
    const data = response.data.filter(obj => obj['Instrumento'] === 'MXNUS')[0];
    return {
      key: 'santander',
      buy: data['Compra'] - 0,
      sell: data['Venta'] - 0
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
