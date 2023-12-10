const Telegraf = require('telegraf').Telegraf;
const logger = require('../logger');
const data = require('../data');

const tokenTelegram = process.env.TELEGRAM_TOKEN;

if (tokenTelegram) {
  /** @type {Telegraf} */
  const bot = new Telegraf(tokenTelegram);
  const response = (ctx) => {
    const split = ctx.message.text.split(' ');
    const dollars = parseInt(split[1], 10);

    ctx.reply(data.getBotMessage(isNaN(dollars) ? 1 : dollars));
  };

  bot.command('dolar', response);
  bot.command('dólar', response);
  bot.command('dollar', response);
  bot.command('about', (ctx) => ctx.reply('Dolarenbancos bot. More info at https://dolarenbancos.com.'));

  bot.catch((err) => {
    logger.error(err);
  });

  bot.start((ctx) => ctx.reply('STARTED'));

  bot.launch()
    .then(() => {
      logger.info('* Telegram bot [ONLINE]');
    })
    .catch((err) => {
      logger.info('* Telegram bot couldn\'t run');
      logger.error(err);
    });
} else {
  logger.error('TELEGRAM_TOKEN not available');
}
