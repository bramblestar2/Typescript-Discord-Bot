import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('mute a user')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user to mute from the server')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('duration')
			.setDescription('The amount of seconds to mute the user.')
				.setMinValue(1)
				.setMaxValue(1000000000)
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for the mute'))
		.setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
		.setDMPermission(false),

	async execute(interaction) {
		const target = interaction.options.getMember('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';
		const time = interaction.options.getInteger('duration');

		const role = interaction.guild.roles.cache.find(role => role.name === "mute");

		if (role && target) {
			if (!target.roles.cache.find(role => role.name === "mute"))
				target.roles.add(role);
			else
				return interaction.reply(`${target} is already muted`);
		}

		await interaction.reply(`Muting ${target} for ${time} seconds\nreason: ${reason}`);
	},
};