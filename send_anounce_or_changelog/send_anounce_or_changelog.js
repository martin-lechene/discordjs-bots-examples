const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'; // Le préfixe que vous voulez utiliser pour les commandes

client.once('ready', () => {
    console.log('Le bot est prêt !');
});

client.on('message', message => {
    // Vérifiez si le message commence par le préfixe et qu'il ne provient pas du bot lui-même
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Séparez la commande et les arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Commande pour créer une annonce ou un changelog
    if (command === 'createmessage') {
        // Vérifiez les autorisations de l'utilisateur pour créer l'annonce/changelog (vérifiez les rôles, les permissions, etc.)

        // Vérifiez si le type de message est spécifié (annonce ou changelog)
        const messageType = args[0].toLowerCase();
        if (!['annonce', 'changelog'].includes(messageType)) {
            return message.channel.send('Veuillez spécifier le type de message : annonce ou changelog.');
        }

        // Exemple de création d'un message avec titre, image et contenu
        const title = args[1];
        const imageUrl = args[2];
        const content = args.slice(3).join(' ');

        // Récupérez le channel où vous souhaitez publier le message en fonction du type choisi
        let targetChannel;
        if (messageType === 'annonce') {
            targetChannel = message.guild.channels.cache.get('ID_DU_SALON_ANNONCE');
        } else if (messageType === 'changelog') {
            targetChannel = message.guild.channels.cache.get('ID_DU_SALON_CHANGELOG');
        }

        // Vérifiez si le salon cible existe
        if (!targetChannel) {
            return message.channel.send('Le salon cible n\'existe pas.');
        }

        // Créez le message dans le salon cible
        targetChannel.send(`**${title}**\n${content}`, { files: [imageUrl] })
            .then(sentMessage => console.log(`Message envoyé : ${sentMessage.content}`))
            .catch(err => console.error('Erreur lors de l\'envoi du message :', err));
    }
});

// Remplacez "TOKEN_DU_BOT" par le token de votre bot
client.login('TOKEN_DU_BOT');
