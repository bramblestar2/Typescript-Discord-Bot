// Require the necessary discord.js classes
import fs from 'node:fs';
import path from 'node:path';
import { Client, Events, GatewayIntentBits, REST, Routes, Collection, ActivityType } from 'discord.js';
import { token, clientId } from './config.json';


declare module 'discord.js' {
	export interface Client {
		commands: Collection<any, any>;
	}
}

export { }

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const rest = new REST({ version: '10' }).setToken(token);

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	client.user.setPresence({
		activities: [{ name: 'my creators suffering', type: ActivityType.Watching }],
		status: 'online'
	});
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

});

//setInterval(() => {
//	const guilds = client.guilds.cache;
//	console.log("Guilds: (Size: " + guilds.size + ", [" + guilds.map(guild => guild.name).join(", ") + "])");
//}, 100000);

// Log in to Discord with your client's token
client.login(token);