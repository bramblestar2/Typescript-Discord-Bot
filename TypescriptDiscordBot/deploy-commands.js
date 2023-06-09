const { REST, Routes } = require('discord.js');
const { clientId, devGuildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');


const commands = [];

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);


//// delete for global commands
//rest.put(Routes.applicationCommands(clientId), { body: [] })
//	.then(() => console.log('Successfully deleted all application commands.'))
//	.catch(console.error);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		//// The put method is used to fully refresh all commands in the guild with the current set
		//const data = await rest.put(
		//	Routes.applicationGuildCommands(clientId, devGuildId),
		//	{ body: commands },
		//);

		//Deploys the commands to all guilds
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();