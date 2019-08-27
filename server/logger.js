const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://b1f48cd0c85a4bf6b951bcb0f780cc55@sentry.io/1542244' });

// const winston = require('winston');
// require('winston-papertrail').Papertrail;
//
// const winstonLogger = new winston.transports.Papertrail({
//   host: 'logs4.papertrailapp.com',
//   port: 48158,
//   handleExceptions: true
// });
//
const logger = {
  // info: message => winstonLogger.log('info', message),
  // error: message => winstonLogger.log('error', message)
  info: message => console.log(message),
  error: message => console.log(message)
};

module.exports = logger;
