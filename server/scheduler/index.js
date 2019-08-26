const logger = require('../logger');
const schedule = require('node-schedule');
const fetcher = require('../fetcher');

// second | minute | hour | day-of-month | month | day of week
const job = schedule.scheduleJob('* 10 * * *', function () {
  logger.info('> Running scheduled fetch');
  fetcher.fetchAll();
});

if (job) {
  logger.info('* Scheduler [ONLINE]');
}
