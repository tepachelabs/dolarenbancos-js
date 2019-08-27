const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://b1f48cd0c85a4bf6b951bcb0f780cc55@sentry.io/1542244' });

const winston = require('winston');
require('winston-papertrail').Papertrail;
// const { Loggly } = require('winston-loggly-bulk');
var winstonPapertrail = new winston.transports.Papertrail({
  host: 'logs4.papertrailapp.com',
  port: 48158
});
// winston.add(new Loggly({
//   token: "4bf0d95f-66c3-46b1-886f-6ab1e2b32026",
//   subdomain: "tonymtz",
//   tags: ["Winston-NodeJS"],
//   json: true
// }));

const logger = new winston.Logger({
  transports: [winstonPapertrail]
});

// const logger = {
//   info: message => winston.log('info', message)
// };

module.exports = logger;
