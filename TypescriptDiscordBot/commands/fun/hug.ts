import { randomInt } from 'crypto';
import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Hug someone!')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user you will be hugging!')
				.setRequired(true)
		),

	async execute(interaction) {
		const huggedUser = interaction.options.getUser('user');
		const user = interaction.user;

		const response = await fetch("https://e926.net/posts.json?tags=hug&limit=10&page=3", {
			method: 'GET',
			headers: {
				Accept: "application/json"
			}
		});

		const apiResponse = await response.json();

		const embed = new EmbedBuilder()
			.setAuthor({
				name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}`
			})
			.setColor(0x0015F0)
			.setTitle('Hug!')
			.setDescription(`${user} has hugged ${huggedUser}!`)
			.setThumbnail(`${huggedUser.displayAvatarURL()}`)
			.setImage(`${apiResponse["posts"][randomInt(0, 9)]["file"]["url"]}`);

		await interaction.reply({
			embeds: [embed]
		})
	},
};