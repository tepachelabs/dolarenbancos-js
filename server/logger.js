const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://b1f48cd0c85a4bf6b951bcb0f780cc55@sentry.io/1542244' });

const winston = require('winston');
require('winston-papertrail').Papertrail;

var logger = new winston.transports.Papertrail({
  host: 'logs4.papertrailapp.com', // you get this from papertrail account
  port: 48158, //you get this from papertrail account
});

const obj = {
  info: message => logger.log('info', message)
};

module.exports = obj;
