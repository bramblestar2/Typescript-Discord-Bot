import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user to kick from the server')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for the kick')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers)
		.setDMPermission(false),

	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';
		
		await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
		await interaction.guild.members.kick(target);
	},
};