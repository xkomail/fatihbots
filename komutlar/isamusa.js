const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor(message.author.username + ' Kafa Dansı Yaptı İsa Musa Sen Bizi Kutsa!')
    .setColor(3447003)
    .setTimestamp()
    .setDescription('')
		.setImage(`https://cdn.discordapp.com/attachments/486835126118907905/486899273133326350/415586162783289350.gif`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'isamusa',
  description: 'Kafa Dansı Yapar.',
  usage: 'isamusa'
};
