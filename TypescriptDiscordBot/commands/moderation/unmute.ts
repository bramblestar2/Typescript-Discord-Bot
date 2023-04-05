import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('unmute a user')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user to unmute from the server')
				.setRequired(true)),

	async execute(interaction) {
		const target = interaction.options.getMember('target');

		if (target) {
			const role = target.roles.cache.find(role => role.name === "mute");
			if (role)
				target.roles.remove(role);
		}

		await interaction.reply(`Unmuted ${target}.`);
	},
};