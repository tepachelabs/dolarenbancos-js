const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://b1f48cd0c85a4bf6b951bcb0f780cc55@sentry.io/1542244' });

var winston = require('winston');
require('winston-papertrail').Papertrail;

var winstonPapertrail = new winston.transports.Papertrail({
  host: 'logs4.papertrailapp.com',
  port: 48158
});

winstonPapertrail.on('error', function (err) {
  // Handle, report, or silently ignore connection errors and failures
});

var winstonLogger = winston.createLogger({
  transports: [winstonPapertrail]
});

const logger = {
  info: message => winstonLogger.log('info', message),
  error: message => winstonLogger.log('info', message),
};

module.exports = logger;
