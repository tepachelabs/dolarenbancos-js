const Rollbar = require('rollbar')

const rollbarAccessToken = process.env.ROLLBAR_PROJECT_ID

const rollbar = new Rollbar({
  accessToken: rollbarAccessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

module.exports = rollbar;
