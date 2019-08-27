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
      const lines = Object.keys(data.banks).map(bank =>
        `* ${bank.toUpperCase()}\t Compra: ${data.banks[bank]['buy'].toFixed(2)}\t Venta: ${data.banks[bank]['sell'].toFixed(2)}\t`);

      lines.unshift('---');
      lines.unshift(`\nPrecio al dia BANXICO: ${data.banxico} MXN`);

      lines.push('---');
      lines.push('Source: https://dolarenbancos.com');

      msg.reply(lines.join('\n'));
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
