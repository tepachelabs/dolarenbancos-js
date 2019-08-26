const fetchBanamex = require('./banamex');
const fetchBanxico = require('./banxico');
const fetchInbursa = require('./inbursa');
const fetchBbva = require('./bbva');

const data = require('../data');

const fetcher = {
  fetchAll: () => Promise.all([
    fetchBanxico(),
    fetchBanamex(),
    fetchInbursa(),
    fetchBbva()
  ]).then(values => {
    data.banxico = values[0].buy.toFixed(2);
    data.banks.banamex = {
      buy: values[1].buy.toFixed(2),
      sell: values[1].sell.toFixed(2)
    };
    data.banks.inbursa = {
      buy: values[2].buy.toFixed(2),
      sell: values[2].sell.toFixed(2)
    };
    data.banks.bbva = {
      buy: values[3].buy.toFixed(2),
      sell: values[3].sell.toFixed(2)
    };
  }).catch(err => console.error(err))
};

module.exports = fetcher;
