const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, channelId, intervalInMinutes } = require('./config.json');

client.once('ready', () => {
    console.log('Le bot est en ligne !');
    sendMessageInterval();
});

async function sendMessageInterval() {
    try {
        const channel = await client.channels.fetch(channelId);
        setInterval(() => {
            channel.send('Ceci est un message envoyé à intervalle de temps souhaité !');
        }, intervalInMinutes * 60 * 1000);
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

client.login(token);
