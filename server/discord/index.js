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
      const banks = Object.keys(data.banks).map(bank =>
        `* ${bank.toUpperCase()}; Compra: ${data.banks[bank]['buy']}; Venta: ${data.banks[bank]['sell']}`);
      const message = `Precio al dia de hoy\n* BANXICO: ${data.banxico} MXN\n\n${banks.join('\n')}`;
      msg.reply(message);
      break;
    default:
      break
  }
});

const tokenDiscord = process.env['TOKEN_DISCORD'];

if (!tokenDiscord) {
  logger.error('TOKEN_DISCORD not available');
}

client.login(tokenDiscord);
