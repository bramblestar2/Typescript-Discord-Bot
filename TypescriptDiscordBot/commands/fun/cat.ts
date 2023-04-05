import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

import Cataas from 'cataas-api';


module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('gets a random cat image')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('Text to be overlayed on the image'))
		.addStringOption(option =>
			option.setName('tag')
		.setDescription('tags to use')),

	async execute(interaction) {
		await interaction.reply({
			embeds: [
				{
					title: "Cataas",
					image: {
						url: 'https://cataas.com/c'
					}
				}
			]
		})
	},
};