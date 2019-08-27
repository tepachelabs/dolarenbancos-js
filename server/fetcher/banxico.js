const axios = require('axios');
const tokenBmx = process.env['TOKEN_BMX'];

if (!tokenBmx) {
  logger.error('TOKEN_BMX not available');
}

const BANXICO_DOLLAR = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno';

module.exports = () => axios.get(BANXICO_DOLLAR, {
  headers: {
    "Bmx-Token": tokenBmx
  }
})
  .then(function (response) {
    // handle success
    const data = response.data['bmx']['series'][0]['datos'][0];
    return {
      key: 'banxico',
      buy: data['dato'] - 0,
      sell: data['dato'] - 0,
    };
  })
  .catch(function (error) {
    // handle error
    console.error(error);
  });
