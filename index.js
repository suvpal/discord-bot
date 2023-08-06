const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./private.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}
client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
  
	const command = client.commands.get(interaction.commandName);
  
	if (!command) return;
  
	try {
	  await command.execute(interaction);
	} catch (e) {
		console.log()
	  return;
	}

  });

client.login(token);

const names = [];
const tasks = [];
let n;

client.on(Events.InteractionCreate, async interaction => {
	if(!interaction.isModalSubmit()) return;

	if(interaction.customId === 'modal') {
		await interaction.reply({content: "Your modal has been submitted", ephemeral: true})
	}

	const name = interaction.fields.getTextInputValue('name');	
	const task = interaction.fields.getTextInputValue('task');
	
	names.push(name)
	tasks.push(task)

	n = names.join("\n");
	console.log(n)

});
module.exports = {
	n,
};