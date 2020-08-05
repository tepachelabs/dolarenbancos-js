const fetchBanamex = require('./banamex');
const fetchBanxico = require('./banxico');
const fetchInbursa = require('./inbursa');
const fetchBbva = require('./bbva');
const fetchBanorte = require('./banorte');
const fetchSantander = require('./santander');
const fetchBillDotCom = require('./billdotcom');

const data = require('../data');
const noop = () => {
};

const fetcher = {
  fetchAll: (before = noop, after = noop) => Promise.all([
    fetchBanxico(),
    fetchBanamex(),
    fetchInbursa(),
    fetchBbva(),
    fetchBanorte(),
    fetchSantander(),
    fetchBillDotCom(),
  ]).then(values => {
    before(data);

    const banxico = values.shift();
    data.banxico.fix = banxico.buy;

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
    console.log(data);
    after(data);
  }).catch(err => console.error(err))
};

module.exports = fetcher;
