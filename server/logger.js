const Sentry = require('@sentry/node');
const winston = require('winston');

const sentryUrl = process.env.SENTRY_URL;
const papertrailUrl = process.env.PAPERTRAIL_URL;
const papertrailPort = process.env.PAPERTRAIL_PORT;

let logger;

if (process.env.NODE_ENV === 'production') {
  if (!sentryUrl || !papertrailUrl || !papertrailPort) {
    console.error('Logger cannot start');
  }

  Sentry.init({ dsn: sentryUrl });

  require('winston-papertrail').Papertrail;

  const winstonPapertrail = new winston.transports.Papertrail({
    host: papertrailUrl,
    port: papertrailPort
  });

  const winstonLogger = winston.createLogger({
    transports: [winstonPapertrail]
  });

  logger = {
    info: message => winstonLogger.log('info', message),
    error: message => winstonLogger.log('info', message),
  }
} else {
  logger = {
    info: console.log,
    error: console.error,
  }
}

module.exports = logger;
