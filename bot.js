const Discord = require('discord.js');
const superagent = require("superagent");
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam');
  }
});

client.on('message', msg => {
  if (msg.content.startsWith(prefix + "çekiliş")) {
    msg.channel.send(`Çekilişi Kazanan: ${msg.guild.members.random().displayName}`);
  }
});

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(ayarlar.prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'topla') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'çıkar') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'çarp') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'böl') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);
    message.channel.sendMessage(`${total}`);
  }
});

client.on('message', message => {
if (message.content.toLowerCase() === prefix + "zekam") {
    var sans = ["11", "15", "20", "24", "28", "32", "39", "45", "49", "54", "58", "63", "67", "77", "73", "84", "80", "83", "96", "94", "99", "Albert Einstein mısın krdşm"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Zekan___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
}
});

client.on('message', message => {
if (message.content.toLowerCase() === prefix + "espriyap") {
    var sans = ["Geçen gün geçmiş günlerimi aradım ama meşguldü.", "Yağmur yağmış kar peynir", "Dünya dönermiş ay da köfte…", "Bu erikson başka erik yok.", "Yıkanan Ton a ne denir Washington", "Hadi oyun oynayalım. Vazgeçtim oymadan oynayalım!", "Geçen gün kamyonu sürdüm Leonardo da Vinci.", "Doğumdan sonra çok kilo aldım. Doğduğumda 2 kiloydum şimdi 62.", "Adam 7 gün boyunca nezle olmuş. Sıkılmış bugün de Petek le olayım demiş.", "Yarasa yararlı bir hayvandır. Yararlı bir hayvan olmasaydı yaramasa derlerdi.", " Benim neden kardeşim yok baba  Seni görünce ikincisine cesaret edemedik.", "Tatlı yiyip, tatlı konuşuluyorsa bundan sonra mantı yiyip mantıklı konuşacağız.", "Babamı sahura kaldırmayı unuttuk anneme masada ne eksik diyorum tuzluk mu diyor.", "+Okeyde kıza elin nasıl dedim. Ojeli dedi. Ben Şoka girdim. O Migrosa.", "Canım sıkkın kanka sonra gel"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Espri___***`, `${sonuc}`)
    .setColor("RANDOM")
    return message.channel.sendEmbed(embed);
}
});

client.on('message', message => {
if (message.content.toLowerCase() === prefix + "söz") {
    var sans = ["Belki hiç bir şey yolunda gitmedi ama hiçbir şey de beni yolumdan etmedi!.", "Gül biraz; bunca keder, bunca gözyaşı dinsin, gül biraz; şu gök kubbe kahkahanı işitsin. Her gidenin ardından koşmaya değmez hayat, gelecekleri bekle, gidecek varsın gitsin", "Herkes kendi kaderinin demircisidir", "Eğer aç ve kimsesiz bir köpeği alıp bakar ve rahata kavuşturursanız sizi ısırmaz. İnsan ve köpek arasındaki temel fark budur.", "Yalnızca kültürlü insanlar öğrenmeyi sever cahiller ders vermeyi tercih eder", "Tek başına hayatı öğrenen insanı kimse yokluğuyla korkutamaz!", "Farklı değilim ama, kimseye de benzemem..", "Hayatımda virgüle ve noktaya çok dikkat ederim.. Virgül gibi nerde duracağımı, nokta nibi nerde bitireceğimi iyi bilirim.", "Bazı insanlar hep “kaptan” olurlar; Söz konusu dümen çevirmek olunca!..."];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Söz___***`, `${sonuc}`)
    .setColor("RANDOM")
    return message.channel.sendEmbed(embed);
}
});

client.on('message', msg => {
if (msg.content.toLowerCase() === prefix + "sigara") {
msg.channel.send(':smoking: :cloud::cloud::cloud:')
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit('**Sigaram bitti** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır**'));
}
});

client.on("message", message => {
    if (message.content.toLowerCase() === prefix + "sunucubilgi") {
        const embed = new Discord.RichEmbed()
    .setTimestamp()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .addField('Sunucu Adı:', message.guild.name)
    .addField('Sunucu ID:', message.guild.id)
    .addField('Ana kanal:', message.guild.defaultChannel)
    .addField('Sunucu Bölgesi:', message.guild.region)
    .addField('Üye sayısı:', message.guild.memberCount)
    .addField('Sahibi:', message.guild.owner + ' (' + message.guild.ownerID + ')')
    .addField('Kanal sayısı:', message.guild.channels.size)
    .addField('Oluşturulma tarihi:', message.guild.createdAt)
            .setColor("RANDOM")

        return message.channel.sendEmbed(embed)
    }
    
    if (message.content.toLowerCase() === prefix + "botbilgi") {
        const embed = new Discord.RichEmbed()
            .addField("Bot Sahibi", `<@311234210264514562>`, true)
            .addField("Version", "2", true)
            .addField("Toplam Sunucu Sayısı", client.guilds.size, true)
            .addField("Toplam Kullanıcı Sayısı", client.users.size, true)
            .addField("Toplam Kanal Sayısı", client.channels.size, true)
            .setColor("RANDOM")
        return message.channel.sendEmbed(embed)
    }
});

client.on('message', async message => {
    if (message.content.toLowerCase() === prefix + 'döviz') {
var request = require('request');
request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error); 
    else if (!error) { 
        var euro = JSON.parse(body);
      message.channel.send(`Dolar satış: ${info.selling} \nDolar alış: ${info.buying} \n\nEuro satış: ${euro.selling}TL \nEuro alış: ${euro.buying}TL`)    }
})
    }
})
    }
});

client.on("message", message => {
    if (message.content.toLowerCase() === prefix + "yardım") {
        const embed = new Discord.RichEmbed()
.addField("Tüm Komutlar",`.anakomutlar = Botun Anakomutlarını Gösterir \n.yetkili = Yetkili Kommutlarını Gösterir \n.eğlence = Bot un Eğlence Komutlarını Gösterir \n @`)
            .setColor("RANDOM")
        return message.channel.sendEmbed(embed)
    }
});

client.on("message", message => {
    if (message.content.toLowerCase() === prefix + "eğlence") {
        const embed = new Discord.RichEmbed()
.addField("**Eğlence ve Kullanıcı Komutları:**", `.isamusa = Kafa Dansı Yaparsınız \n.döviz = Dolar Ve Euroyu Gösterir \n.avatarım = Avatarınınızı Gösterir \n.herkesebendençay = Herkese Çay Alırsınız \n.koş = Koşarsınız.\n.çayiç = Çay İçersiniz \n.çekiç = İstediğiniz Kişiye Çekiç Atarsınız \n.çayaşekerat = Çaya Şeker Atarsınız. \n.tokat = İstediğiniz Kişiye tokat Atarsınız \n.yaz = Bota İstediğiniz Şeyi Yazdırırsınız \n.sunucuresmi = BOT Sunucunun Resmini Atar \n.kullanıcıbilgim = Sizin Hakkınızda Bilgi Verir \n.çekiliş = sunucunuzda Bir Çekiliş Yapar \n.espriyap = Espri Yapar \n.zekam = Zekanızı Gösterir \n.sigara = Sigara İcersiniz \n.balıktut = Balık Tutarsınız \n.yazıtura = Yazı mı Turamı :D \n.ördek = Ördek Fotorafları Atar \n.söz = Havalı Sözler Atar \n.düello <@kullanıcı> = İstediğiniz bir kişi ile düello atarsınız  \n.topla / çıkar /çarp / böl / [sayı] [sayı] = Matematik İşlemlerini Yapar \n.havadurumu [şeyir] = Sectiginiz Şeyrin Hava Durmunu Gösterir`)
            .setColor("RANDOM")
        return message.channel.sendEmbed(embed)
    }
});

client.on("message", message => {
    if (message.content.toLowerCase() === prefix + "yetkili") {
        const embed = new Discord.RichEmbed()
.addField("**Yetkili Komutları:**", `.kilit {süre} = Kanalı bir Sürelıne Kilitler \n.sil = Belirtilen Sayı Kadar Mesaj Siler \n.sustur = İstediginiz kisişiyi susturursunuz \n.at = İstediginiz kişiyi Atar Atar \n.ban = Istedıgınız Kısıyı Banlar \n.uyar = Istedıgınız Kısıyı Uyarır \n.oylama = Oylama başlatır  \n.geçicisustur [Kullanıcı] [Süre] = İstediğiniz kişiyi Gecici olarak Yazı yazmasını Engeller \n.sayaç [sayı] = Belırlenen sayıya kac kişi kaldıgını gösterir Ama İlk sayaç adında kanal acın \n.otorol [rol etiketlemeyin] = Otorol Başlar .otorol uye etıketlemeyın calısmaz Bide Bot un Yetkisi Yukarda Olsun \n.giriş-çıkış-ayarla #kanal adı = Giriş Cıkış Mesajları atar`)
            .setColor("RANDOM")
        return message.channel.sendEmbed(embed)
    }
});

client.on("message", message => {
    if (message.content.toLowerCase() === prefix + "anakomutlar") {
        const embed = new Discord.RichEmbed()
.addField("**Ana Komutlar:**", `.sunucubilgi = Sunucunun Bilgilerini Gösterir \n.botbilgi = Botun Bilgilerini Gösterir \n.ping = Botun Pingini Gösterir \n.destek = Botun Yapımcısından Yardım İstemek İcin Ayrıca tavsiye de verebılırsınız \n.davet = Botun Sunucunuza Almak İcin Botun Davet Linkini Atar`)
            .setColor("RANDOM")
        return message.channel.sendEmbed(embed)
    }
});

client.on('message', message => {
if (message.content.toLowerCase() === prefix + "yazıtura") {
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('')
      .setDescription('Tura.')
      .setThumbnail('https://i.imgur.com/iUaWmhg.jpg')
      message.channel.send(embed);
    } else if (result == 2) {
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('')
      .setDescription('Yazı.')
      .setThumbnail('https://i.imgur.com/54JPj7Z.jpg')
      message.channel.send(embed);
    }
}});

client.on('message', async message => {
if (message.content.toLowerCase() === prefix + "ördek") {

    let embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTitle("Vak Vak...")
    .setImage(("https://random-d.uk/api/v1/images/"+ Math.floor(Math.random() * (1 - 20) + 60)+".jpg"))
    message.channel.send(embed)

}});

client.on("message", msg => {
        const reklam = ["discordapp", "discord.gg", "discord.tk", "discordbots.org", "https://discordapp.com", "https://discord.gg", "http://discord.gg", "htpp:/discordapp.com", "https://discordbots.org", "www.google.com", "youtube", "bc.vc", "link.tl", ];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply('Reklam Yapmamalısın :warning:').then(msg => msg.delete(3000));
             }              
          } catch(err) {
            console.log(err);
          }
        }
    });

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.BOT_TOKEN);
