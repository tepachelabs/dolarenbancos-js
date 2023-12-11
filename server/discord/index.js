const Discord = require('discord.js');
const Collection = Discord.Collection;
const REST = Discord.REST;
const Routes = Discord.Routes;
const Events = Discord.Events;
const GatewayIntentBits = Discord.GatewayIntentBits;

const logger = require('../logger');

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
});

// Commands
const dollarCommand = require('./commands/dollar')

client.commands = new Collection();
client.commands.set(dollarCommand.data.name, dollarCommand);

client.once(Events.ClientReady, readyClient => {
  logger.info(`* Discord bot [READY]! [ONLINE] as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    logger.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
    } else {
      await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
  }
});

const tokenDiscord = process.env['TOKEN_DISCORD'];
const discordAppId = process.env['DISCORD_APP_ID'];

if (tokenDiscord) {
  client.login(tokenDiscord);
  const rest = new REST().setToken(tokenDiscord);

  if (discordAppId) {
    (async () => {
      try {
        logger.info(`Started refreshing application (/) commands.`);

        const data = await rest.put(
          Routes.applicationCommands(discordAppId),
          {body: [dollarCommand.data.toJSON()]},
        );

        logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
      } catch (error) {
        // And of course, make sure you catch and log any errors!
        logger.error(error);
      }
    })();
  }
} else {
  logger.error('TOKEN_DISCORD not available');
}
