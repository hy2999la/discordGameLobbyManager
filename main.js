require('dotenv').config();

const Lobby = require('./src/commands/apex/lobby');
const { createStockMessageEmbed } = require('./src/commands/stocks');

const Discord = require('discord.js');
const client = new Discord.Client();

let lobby;

/// Client

client.once('ready', () => {
  console.log('Bot is ready');
});

client.on('message', async (message) => {
  const startLobbyMentions = Lobby.getMentions();
  if (message.mentions.roles.some(r => startLobbyMentions.indexOf(r.name) >= 0) || message.content === '!start') {
    const user = message.member;

    Lobby.initLobby(message, user);
    
    return;
  } else if (message.content.startsWith('!stocks') || message.content.startsWith('!stock') || message.content.startsWith('!stonks') || message.content.startsWith('!stonk')) {
    const args = message.content.split(" ");

    const ticker = args[1];
    const tickerData = await createStockMessageEmbed(ticker);

    message.channel.send(tickerData);
  }
});

client.login(process.env.DISCORD_TOKEN);