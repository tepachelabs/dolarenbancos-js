const Discord = require('discord.js')
const data = require("../../data");
const SlashCommandBuilder = Discord.SlashCommandBuilder

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dolar')
    .setDescription('Verificar precio del dolar en diferentes bancos')
    .addIntegerOption(option => option.setName('cantidad').setDescription('Cantidad de dolares')
      .setRequired(false)),
  async execute(interaction) {
    const dollars = interaction.options.getInteger('cantidad')
    await interaction.reply(data.getBotMessage(dollars === null || isNaN(dollars) ? 1 : dollars))
  }
}
