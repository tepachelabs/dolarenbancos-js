const fetchBanamex = require('./banamex');
const fetchBanxico = require('./banxico');
const fetchInbursa = require('./inbursa');
const fetchBbva = require('./bbva');
const fetchMonex = require('./monex');
const fetchBanorte = require('./banorte');

const data = require('../data');

const fetcher = {
  fetchAll: () => Promise.all([
    fetchBanxico(),
    fetchBanamex(),
    fetchInbursa(),
    fetchBbva(),
    fetchMonex(),
    fetchBanorte(),
  ]).then(values => {
    const banxico = values.shift();
    data.banxico = banxico.buy.toFixed(2);

    values.forEach(value => {
      data.banks[value.key] = {
        buy: value.buy,
        sell: value.sell,
      };
    });

    data.meta = Object.keys(data.banks).reduce((acc, bank) => {
      acc.lowestSell = !acc.lowestSell || data.banks[bank].sell < acc.lowestSell ? data.banks[bank].sell : acc.lowestSell;
      acc.lowestBuy = !acc.lowestBuy || data.banks[bank].buy < acc.lowestBuy ? data.banks[bank].buy : acc.lowestBuy;
      acc.highestSell = !acc.highestSell || data.banks[bank].sell > acc.highestSell ? data.banks[bank].sell : acc.highestSell;
      acc.highestBuy = !acc.highestBuy || data.banks[bank].buy > acc.highestBuy ? data.banks[bank].buy : acc.highestBuy;
      return acc;
    }, {});
  }).catch(err => console.error(err))
};

module.exports = fetcher;
