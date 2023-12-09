const Sentry = require('@sentry/node');
const winston = require('winston');

const papertrailUrl = process.env.PAPERTRAIL_URL;
const papertrailPort = process.env.PAPERTRAIL_PORT;

let logger;

if (process.env.NODE_ENV === 'production') {
  if (!papertrailUrl || !papertrailPort) {
    console.error('Logger cannot start');
  }

  require('winston-papertrail').Papertrail;

  const winstonPapertrail = new winston.transports.Papertrail({
    host: papertrailUrl,
    port: papertrailPort,
    hostname: process.env.NODE_ENV === 'production' ? 'dolarenbancos.prod' : 'dolarenbancos.dev',
    program: 'dolarenbancos'
  });

  const winstonLogger = winston.createLogger({
    transports: [winstonPapertrail]
  });

  logger = {
    postControllers: {
      requestHandler: () => Sentry.Handlers.requestHandler(),
    },
    info: message => winstonLogger.log('info', message),
    error: message => winstonLogger.log('info', message),
  }
} else {
  logger = {
    postControllers: {
      requestHandler: () => {},
    },
    info: console.log,
    error: console.error,
  }
}

module.exports = logger;
