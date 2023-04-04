import { SlashCommandBuilder } from 'discord.js'
import { creatorId } from '../../config.json'
import fs from 'node:fs';
import path from 'node:path';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('(Owner only): Reloads a specified command')
		.addStringOption(option =>
			option.setName("command")
				.setDescription("The command to reload")
		.setRequired(true)),
	async execute(interaction) {
		if (interaction.user.id == creatorId) {
			const commandName = interaction.options.getString('command', true).toLowerCase();
			const command = interaction.client.commands.get(commandName);

			if (!command) {
				return interaction.reply(`There is no command with name \`${commandName}\`!`);
			}

			const foldersPath = path.join(path.dirname(require.main.filename), 'commands');
			const commandFolders = fs.readdirSync(foldersPath);

			var cmdFile;

			for (var i = 0; i < commandFolders.length; i++) {
				const commandsPath = path.join(foldersPath, commandFolders[i]);
				const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

				for (var i = 0; i < commandFiles.length; i++) {
					const cmdName = path.basename(commandFiles[i], '.js');

					if (cmdName == command.data.name) {
						cmdFile = commandsPath + "\\" + commandFiles[i];
					}
				}
			}

			if (!cmdFile) {
				return interaction.reply(`No file for the command "${command.data.name}" was found.`);
			}
			else {
				delete require.cache[require.resolve(cmdFile)];

				try {
					interaction.client.commands.delete(command.data.name);
					const newCommand = require(cmdFile);
					interaction.client.commands.set(newCommand.data.name, newCommand);
					await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
				} catch (error) {
					console.error(error);
					await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
				}
			}
		}
		else {
			await interaction.reply(`This command wont work since you are not the creator.`);
		}

	},
};