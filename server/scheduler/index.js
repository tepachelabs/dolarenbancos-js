const logger = require('../logger');
const schedule = require('node-schedule');
const fetcher = require('../fetcher');

// second | minute | hour | day-of-month | month | day of week
// https://crontab.guru/#0_*/1_*_*_*
const job = schedule.scheduleJob('0 */1 * * *', function () {
  logger.info('> Running scheduled fetch');
  fetcher.fetchAll(undefined, data => data.save());
});

if (job) {
  logger.info('* Scheduler [ONLINE]');
}
