const logger = require('./logger');
const fetcher = require('./fetcher');

logger.info("YOLO");
logger.info(process.env);
logger.info(process.env.PORT);
logger.info("YOLO 2");

// const sysRun = new Promise(function (resolve) {
//   logger.info('=== Starting DOLLAR-BOT suite ===');
//   logger.info('> Starting initial fetch');
//
//   fetcher.fetchAll().then(() => {
//     logger.info('> Initial fetch done');
//     resolve();
//   });
// });
//
// sysRun.then(() => {
//   logger.info('> Starting services');
//   require('./web');
//   require('./discord');
//   require('./scheduler');
// });
