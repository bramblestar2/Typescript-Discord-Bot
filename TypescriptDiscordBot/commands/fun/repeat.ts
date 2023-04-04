import { SlashCommandBuilder } from 'discord.js'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('Repeats what you typed!')
		.addStringOption(option => 
			option.setName('words')
				.setDescription('All you need to do is type some words and boom, the bot repeats it')
		.setRequired(true)),
	async execute(interaction) {
		await interaction.reply({
			content: "Sent the repeat message!",
			ephemeral: true
		});
		await interaction.channel.send(interaction.options.getString('words', true));
	},
};