const fetchBanamex = require('./banamex');
const fetchBanxico = require('./banxico');
const fetchInbursa = require('./inbursa');
const fetchBbva = require('./bbva');
const fetchBillDotCom = require('./billdotcom');
const fetchTransferwise = require('./transferwise');

const data = require('../data');
const noop = () => {
};

const fetcher = {
  fetchAll: (before = noop, after = noop) => Promise.all([
    fetchBanxico(),
    fetchBanamex(),
    fetchInbursa(),
    fetchBbva(),
    // fetchBillDotCom(), // TODO failing
    fetchTransferwise(),
  ]).then(values => {
    before(data);

    const banxico = values.shift();
    data.banxico.fix = banxico && banxico.buy ? banxico.buy : 0;

    values.forEach(value => {
      data.banks[value.key] = {
        buy: value.buy,
        sell: value.sell,
      };
    });

    data.meta = Object.keys(data.banks).reduce((acc, bank) => {
      if (data.banks[bank].sell === 0 || data.banks[bank].buy === 0) {
        return acc;
      }

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
