require('./rollbar');
const Sentry = require('@sentry/node');
const morgan = require('morgan');

const sentryUrl = process.env.SENTRY_URL;

let logger;

if (process.env.NODE_ENV === 'production') {
  if (sentryUrl) {
    Sentry.init({ dsn: sentryUrl });
  }
  logger = morgan('combined');
} else {
  logger = morgan('dev');
}

module.exports = logger;

