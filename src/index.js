const tmi = require('tmi.js');
const urlRegex = require("url-regex");

const isCommand = require('./utils/isCommand');
const checkRole = require('./utils/checkRole');

const client = new tmi.Client({
	options: { debug: true },
	connection: {
		secure: true,
		reconnect: true
	},
	identity: {
    username: 'racoby',
    password: 'oauth:pxacrdkcag9s7jfw1zl7s4ofdu1mdu'
  },
	channels: [ 'cliffenight' ]
});

client.connect();

client.on('message', async (channel, tags, message, self) => {
  if(self) return;
  const command = isCommand(message);
  familyFriendlyTests(channel, tags, message);
  
  if(command === '!say'){
    if(checkRole(tags) === false) return client.say(channel, `@${tags.username}, você não tem permissão para usar este comando.`);
    return client.say(channel, message.substr(4));
  }
  if(command === '!discord') return client.say(channel, `@${tags.username}, https://discord.gg/RPFtukm`);
});

async function familyFriendlyTests(channel, tags, message){
  if(message.length >= 295){
    await client.deletemessage(channel, tags.id);
    client.say(channel, `@${tags.username}, não flode o chat.`);
  }

  var blockWords = ['mongol', 'mongoloide', 'shit', 'merda', 'bitch', 'puta', 'pau no cu', 'vai toma no cu', 'caralho'];

  blockWords.forEach(async (word) => {
    if(message.toLowerCase().includes(word)){
      await client.deletemessage(channel, tags.id);
      client.say(channel, `@${tags.username}, você disse uma palavra proibida.`);
    }
  });

  if (urlRegex({ strict: false }).test(message)) {
    await client.deletemessage(channel, tags.id);
    client.say(channel, `@${tags.username}, você não pode enviar links.`);
  }
}