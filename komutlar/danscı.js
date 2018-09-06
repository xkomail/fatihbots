const Discord = require('discord.js');
const ascii = require('figlet');

exports.run = function(client, message, args) {

  var yazi = args.slice(0).join(' ');
  if (yazi.length < 1) return message.reply("Dans ascii şeklinde yazılmasını istediğiniz yazıyı yazınız!")
  if (yazi.length > 8) return message.reply("8 karakterden uzun yazıyı dans ascii yapamam!")
  
   ascii(yazi, {
        font: 'Dancing Font',
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
      },
      function(err, data) {
        if (err) {
          message.reply('Bir Hata Oluştu! \n**Hata:** `'+ err +'`')
          console.error(err)
        }
     
     message.channel.send('```css\n' + data + '\n```');

     
      })
  
};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["dans-ascii"],
  permLevel: "Yetki gerekmiyor."
};

exports.help = {
  name: 'dans',
  category: 'eğlence',
  description: 'Yazdığınız yazıyı dans🎉 ascii şekline çevirir.',
  usage: 'dans <yazı>'
};