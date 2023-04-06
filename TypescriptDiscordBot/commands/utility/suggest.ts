import { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path'
import suggestions from '../../suggestions.json';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Suggest a feature')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('The type of feature you are suggesting')
				.setRequired(true)
				.addChoices(
					{ name: "Fun", value: "fun" },
					{ name: "Moderation", value: 'moderation' },
					{ name: "Games", value: "games" },
					{ name: "Utility", value: "utility"}
				))
		.addStringOption(option =>
			option.setName('idea')
				.setDescription('The name of the feature')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('description')
				.setDescription('The description of the feature')
				.setRequired(true)),

	async execute(interaction) {
		let type = interaction.options.getString('type');
		let idea = interaction.options.getString('idea');
		let description = interaction.options.getString('description');

		suggestions[type][idea] = description;

		fs.writeFileSync('./suggestions.json', JSON.stringify(suggestions));

		await interaction.reply({
			content: "The feature has been suggested! Thank you for the idea!",
			ephemeral: true
		})
	},
};