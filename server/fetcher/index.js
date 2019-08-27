const fetchBanamex = require('./banamex');
const fetchBanxico = require('./banxico');
const fetchInbursa = require('./inbursa');
const fetchBbva = require('./bbva');
const fetchMonex = require('./monex');

const data = require('../data');

const fetcher = {
  fetchAll: () => Promise.all([
    fetchBanxico(),
    fetchBanamex(),
    fetchInbursa(),
    fetchBbva(),
    fetchMonex(),
  ]).then(values => {
    const banxico = values.shift();
    data.banxico = banxico.buy.toFixed(2);

    values.forEach(value => {
      data.banks[value.key] = {
        buy: value.buy.toFixed(2),
        sell: value.sell.toFixed(2),
      };
    });
  }).catch(err => console.error(err))
};

module.exports = fetcher;
