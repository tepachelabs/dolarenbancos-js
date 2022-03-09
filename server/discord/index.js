const Discord = require('discord.js');
const logger = require('../logger');
const data = require('../data');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
const prefixes = [
  'dolar',
  'dollar',
  'dólar',
  '/dolar',
  '/dollar',
  '/dólar',
];

client.on('ready', () => {
  logger.info('* Discord bot [ONLINE]');
});

client.on('message', msg => {
  prefixes.forEach(prefix => {
    if (msg.content.startsWith(prefix)) {
      const split = msg.content.split(' ');
      const dollars = parseInt(split[1], 10);

      msg.reply(data.getBotMessage(isNaN(dollars) ? 1 : dollars));
    }
  });
});

const tokenDiscord = process.env['TOKEN_DISCORD'];

if (tokenDiscord) {
  client.login(tokenDiscord);
} else {
  logger.error('TOKEN_DISCORD not available');
}
