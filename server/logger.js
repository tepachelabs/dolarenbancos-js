require('./rollbar');
const Sentry = require('@sentry/node');
const pino = require('pino');

const sentryUrl = process.env.SENTRY_URL;
const logtailToken = process.env.LOGTAIL_TOKEN;

let logger;

if (process.env.NODE_ENV === 'production') {
  if (sentryUrl) {
    Sentry.init({ dsn: sentryUrl });
  }

  if (logtailToken) {
    const transport = pino.transport({
      target: "@logtail/pino",
      options: {sourceToken: logtailToken}
    });
    logger = pino(transport);
  } else {
    logger = pino({ level: 'info' })
  }
} else {
  logger = pino({ level: 'debug' });
}

module.exports = logger;

