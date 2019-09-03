const Discord = require('discord.js');
const logger = require('../logger');
const data = require('../data');

const client = new Discord.Client();

client.on('ready', () => {
  logger.info('* Discord bot [ONLINE]');
});

client.on('message', msg => {
  switch (msg.content) {
    case 'dolar':
    case 'dollar':
    case 'dólar':
    case '/dollar':
    case '/dolar':
    case '/dólar':
      msg.reply(data.getBotMessage());
      break;
    default:
      break
  }
});

const tokenDiscord = process.env['TOKEN_DISCORD'];

if (tokenDiscord) {
  client.login(tokenDiscord);
} else {
  logger.error('TOKEN_DISCORD not available');
}
