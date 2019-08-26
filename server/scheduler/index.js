const schedule = require('node-schedule');
const fetcher = require('../fetcher');

// second | minute | hour | day-of-month | month | day of week
const job = schedule.scheduleJob('* * 1 * *', function(){
  console.log('> Running scheduled fetch');
  fetcher.fetchAll();
});

// console.log(job);
if (job) {
  console.log('* Scheduler [ONLINE]');
}
