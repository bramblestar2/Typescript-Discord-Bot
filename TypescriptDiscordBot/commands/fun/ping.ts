import { SlashCommandBuilder } from 'discord.js'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const pong = await interaction.reply({
			content: `Pong! (0ms)`,
			fetchReply: true
		});

		const ping = pong.createdTimestamp - interaction.createdTimestamp;
		await interaction.editReply({
			content: `Pong! (${ping}ms)`
		});
	},
};