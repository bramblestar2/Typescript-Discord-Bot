import { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Suggest a feature')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('The type of feature you are suggesting')
		.setRequired(true))
		.addStringOption(option =>
			option.setName('idea')
				.setDescription('The description of the feature')
		.setRequired(true)),

	async execute(interaction) {
		const suggestions = fs.readFileSync('./feature suggestions.json');
		

		await interaction.reply({
			content: "The feature has been suggested! Thank you for the idea!",
			ephemeral: true
		})
	},
};