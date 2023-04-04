import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to ban from the server')
			.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for the ban')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),

	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

		await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
		await interaction.guild.members.ban(target);
	},
};