const Discord = require('discord.js');
exports.run = (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply(' :x: Tokat atacağın birisini etiketlemelisin! :x: ');
    const embed = new Discord.RichEmbed()
    .setAuthor('')
    .setColor("RANDOM")
    .setDescription(` ${mesaj} ` + message.author.username + ' Tarafından Tokat Manyağı Yapıldı')
    .setImage("https://media.giphy.com/media/l2YOqzhYD066fAd56/giphy.gif");
    return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tokat'],
  permLevel: 0
};

exports.help = {
  name: 'tokat',
  description: 'İstediğiniz Kişiye tokat Atarsınız.',
  usage: 'tokat'
};