const Sentry = require('@sentry/node');
const sentryDsn = process.env.SENTRY_URL;
const isProd = process.env.NODE_ENV === 'production';

let enableSentry = isProd && sentryDsn;

if (enableSentry) {
  Sentry.init({dsn: sentryDsn });
}

const sentryRequests = enableSentry
  ? {
    requestHandler: () => Sentry.Handlers.requestHandler(),
    errorHandler: () => Sentry.Handlers.errorHandler(),
  }
  : {
    requestHandler: () => {},
    errorHandler: () => {},
  }

module.exports = {
  sentryRequests,
};
