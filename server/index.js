const logger = require('./logger');
const fetcher = require('./fetcher');

const isProd = process.env.NODE_ENV === 'production';
console.log('# IS PROD? ', isProd);
process.env.TZ = 'America/Hermosillo';

const sysRun = new Promise(function (resolve) {
  logger.info('=== Starting DOLLAR-BOT suite ===');
  logger.info('> Starting initial fetch');

  fetcher.fetchAll().then(() => {
    logger.info('> Initial fetch done');
    resolve();
  });
});

sysRun.then(() => {
  logger.info('> Starting services');
  require('./web');
  require('./scheduler');
  if (isProd) {
    // require('./discord');
    // require('./telegram');
    logger.info("> Bots should be disabled now.")
  }
});
