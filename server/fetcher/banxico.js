const axios = require('axios');
const auth = require('../../auth.json');

const BANXICO_DOLLAR = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno';

module.exports = () => axios.get(BANXICO_DOLLAR, {
  headers: {
    "Bmx-Token": auth['token-bmx']
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
