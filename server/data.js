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
    monex: { buy: 0, sell: 0 },
    banorte: { buy: 0, sell: 0 },
  },
  meta: {}
};

module.exports = {
  save: () => {
    if (!db) return;

    const record = {
      ...store,
      created_at: Date.now()
    };
    return db.collection('historic').add(record);
  },
  ...store
};
