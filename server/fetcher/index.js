const fetchBanamex = require('./banamex');
const fetchBanxico = require('./banxico');
const fetchInbursa = require('./inbursa');
const fetchBbva = require('./bbva');
const fetchBillDotCom = require('./billdotcom');
const fetchTransferwise = require('./transferwise');

const data = require('../data');
const noop = () => {
};

const BANKS= {
  banxico: {
    fetch: fetchBanxico,
    enabled: true,
  },
  banamex: {
    fetch: fetchBanamex,
    enabled: true,
  },
  inbursa: {
    fetch: fetchInbursa,
    enabled: true,
  },
  bbva: {
    fetch: fetchBbva,
    enabled: true,
  },
  billdotcom: {
    fetch: fetchBillDotCom,
    enabled: false,
  },
  transferwise: {
    fetch: fetchTransferwise,
    enabled: true,
  },
};

const ENABLED_BANKS = Object.entries(BANKS)
  .filter(([_key, bank]) => bank.enabled)
  .reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

const fetcher = {
  fetchAll: (before = noop, after = noop) => Promise.all(
    Object.entries(ENABLED_BANKS).map(([_k, bank]) => bank.fetch)
  ).then(values => {
    before(data);

    const banxico = values.shift();
    data.banxico.fix = banxico && banxico.buy ? banxico.buy : 0;

    values.forEach(value => {
      if (value && value.key) {
        data.banks[value.key] = {
          buy: value.buy,
          sell: value.sell,
        };
      }
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
