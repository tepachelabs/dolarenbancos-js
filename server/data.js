const firebase = require('firebase/app');
require('firebase/firestore');

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;

let db;

if (FIREBASE_API_KEY && FIREBASE_PROJECT_ID) {
  const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: FIREBASE_PROJECT_ID,
    appID: FIREBASE_PROJECT_ID,
  };

  firebase.initializeApp(firebaseConfig);

  db = firebase.firestore();
}

const store = {
  banxico: {
    fix: 0
  },
  banks: {
    inbursa: { buy: 0, sell: 0 },
    banamex: { buy: 0, sell: 0 },
    bbva: { buy: 0, sell: 0 },
    banorte: { buy: 0, sell: 0 },
    santander: { buy: 0, sell: 0 },
    billdotcom: { buy: 0, sell: 0 },
    transferwise: { buy: 0, sell: 0 },
  },
  meta: {}
};

module.exports = {
  save: () => {
    if (!db) return;

    const record = {
      ...store,
      created_at: Date.now().toString().slice(0, -5) + '00000' - 0
    };
    return db.collection('historic').add(record);
  },
  load: () => {
    const historicRef = db.collection('historic');

    const day = 86400000;
    const currentTime = new Date();
    const today = new Date(`${currentTime.getMonth() + 1}/${currentTime.getDate()}/${currentTime.getFullYear()} 12:00`).getTime();

    return Promise.all([0, 1, 2, 3, 4, 5, 6, 7].map(date => historicRef.where('created_at', '==', today - (day * date)).get()));
  },
  getBotMessage: (dollars = 1) => {
    const lines = Object.keys(store.banks).map(bank =>
      `* ${bank.toUpperCase()}\t Compra: ${(store.banks[bank]['buy'] * dollars).toFixed(2)}\t Venta: ${(store.banks[bank]['sell'] * dollars).toFixed(2)}\t`);

    lines.unshift('---');
    lines.unshift(`\nPrecio al dia BANXICO: ${(store.banxico.fix * dollars).toFixed(2)} MXN`);

    lines.push('---');
    lines.push('Source: https://dolarenbancos.com');

    return lines.join('\n');
  },
  ...store
};
