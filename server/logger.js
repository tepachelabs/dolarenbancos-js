require('./rollbar');
const Sentry = require('@sentry/node');
const pino = require('pino');

const sentryUrl = process.env.SENTRY_URL;

let logger;

if (process.env.NODE_ENV === 'production') {
  if (sentryUrl) {
    Sentry.init({ dsn: sentryUrl });
  }
  logger = pino({ level: 'info' });
} else {
  logger = pino({ level: 'debug' });
}

module.exports = logger;

