const Discord = require('discord.js');
const client = new Discord.Client();

// Remplacez 'VOTRE_TOKEN_DISCORD' par le vrai token de votre bot Discord
const token = 'VOTRE_TOKEN_DISCORD';

// ID de la personne à qui vous souhaitez envoyer un message privé
const recipientId = 'ID_DU_UTILISATEUR';

// Intervalle en millisecondes (par exemple, 1 heure = 3600000 ms)
const interval = 3600000; // 1 heure

// Fonction pour envoyer un message privé à l'utilisateur spécifié
function sendMessage() {
  const user = client.users.cache.get(recipientId);
  if (user) {
    user.send("Ceci est un message privé envoyé à intervalle régulier !");
  } else {
    console.log("Utilisateur introuvable !");
  }
}

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
  // Démarrez l'envoi des messages à intervalle régulier
  setInterval(sendMessage, interval);
});

client.login(token);
