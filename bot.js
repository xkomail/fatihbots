const Discord = require('discord.js');
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
    msg.reply('  ツ Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden   ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Sa') {
    msg.reply(' Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sA') {
    msg.reply(' Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden  ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'SA') {
    msg.reply(' Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden   ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 's.a') {
    msg.reply(' Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden  ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 's.a.') {
    msg.reply('   Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden   ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa.') {
    msg.reply(' Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden  ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'S.a') {
    msg.reply('   Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'S.A') {
    msg.reply(' Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden  ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'S.A.') {
    msg.reply('  Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden    ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sea') {
    msg.reply('  Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden  ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Sea') {
    msg.reply('  Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden  ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selam') {
    msg.reply('  Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden  ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Selam') {
    msg.reply('  Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden  ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selamun aleyküm') {
    msg.reply(' Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden  ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Selamun aleyküm') {
    msg.reply(' Aleyküm Selam Hoş Geldin, Geç Otur. Çaylar Bizden  ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Selamun Aleyküm') {
    msg.reply('  Aleyküm Selam Hoş Geldin, Geç Otur Çaylar Bizden  ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hayırsız bot') {
    msg.reply('**Küstüm :sob: :sob:** ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'amk') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'aq') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'piç') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'pic') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'orosbu') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sikiyim') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ananı sikiyim') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'anan') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'babanı') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'babanı sikiyim') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'eben') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ebeni sikiyim') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'orosbu çocuğu') {
    msg.reply('Küfür Mü? Kardeş Niye Küfür Ediyorsun, Küfür İle Nereya Kadar Varabilirsin Ki!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bot') {
    msg.reply('**Efendim?**');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bot! sg') {
    msg.reply('Bak :sob: :sob: :sob: gidiyorum **Gelmemem Bir Daha!** :sob:');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bot sg') {
    msg.reply('Bak :sob: :sob: :sob: gidiyorum **Gelmem Bir Daha!** :sob:');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bot siktir') {
    msg.reply('Bak :sob: :sob: :sob: gidiyorum **Gelmem Bir Daha!** :sob:');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bot siktir git') {
    msg.reply('Bak :sob: :sob: :sob: gidiyorum **Gelmem Bir Daha!** :sob:');
  }
  if (msg.content.toLowerCase() === prefix + 'sigara') {
    msg.send('Sigara İçiyorum!');
    msg.edit(' :smoking: :cloud: :cloud: :cloud: ');
    msg.edit(' :smoking: :cloud: :cloud: ');
    msg.edit(' :smoking: :cloud:  ');
    msg.edit(' :smoking:  ');
    msg.edit(' Sigaram Bitti! Bot İçsin Ama Siz İçmeyin!');
  }
});
client.on('message', msg => {
  if (msg.content.prefix === 'kralyap') {
    msg.reply('**Artık yeni Kral Sensin!**' + 'https://media.giphy.com/media/gf6iP1NIcDk7S/giphy.gif');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'naber') {
    msg.reply('**İyi Kamki senden naber?**');
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

client.login(ayarlar.token);
