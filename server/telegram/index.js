const Telegraf = require('telegraf');
const logger = require('../logger');
const data = require('../data');

const tokenTelegram = process.env.TELEGRAM_TOKEN;

if (tokenTelegram) {
  const bot = new Telegraf(tokenTelegram);

  bot.command('dolar', ({ reply }) => reply(data.getBotMessage()));
  bot.command('dólar', ({ reply }) => reply(data.getBotMessage()));
  bot.command('dollar', ({ reply }) => reply(data.getBotMessage()));
  bot.command('/dolar', ({ reply }) => reply(data.getBotMessage()));
  bot.command('/dollar', ({ reply }) => reply(data.getBotMessage()));
  bot.command('/dólar', ({ reply }) => reply(data.getBotMessage()));
  bot.command('about', ({ reply }) => reply('Dolarenbancos bot. More info at https://dolarenbancos.com.'));

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
