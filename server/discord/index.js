const Discord = require('discord.js');
const auth = require('../auth.json');
const data = require('../data');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('* Discord bot [ONLINE]');
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

client.login(auth['token-discord']);
