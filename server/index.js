require('./tracking');

const fetcher = require('./fetcher');

const sysRun = new Promise(function (resolve) {
  console.log('=== Starting DOLLAR-BOT suite ===');
  console.log('> Starting initial fetch');

  fetcher.fetchAll().then(() => {
    console.log('> Initial fetch done');
    resolve();
  });
});

sysRun.then(() => {
  console.log('> Starting services');
  require('./web');
  require('./discord');
  require('./scheduler');
});
