import { getRandomValues, randomInt } from 'crypto';
import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import config from "../../config.json"
import { furry } from "../../apis.json"

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Hug someone!')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user you will be hugging!')
				.setRequired(true)
	)
		.setDMPermission(false),

	async execute(interaction) {
		const huggedUser = interaction.options.getUser('user');
		const user = interaction.user;

		if (huggedUser.id != config.clientId) {
			const response = await fetch(`${furry}/posts.json?tags=hug+-cuddling+-comic&limit=50&page=10`, {
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
				.setImage(`${apiResponse["posts"][randomInt(0, apiResponse["posts"].length - 1)]["file"]["url"]}`);

			await interaction.reply({
				embeds: [embed]
			})
		}
		else {
			await interaction.reply({
				content: "Thank you for offering the hug, but I think someone else might need it!",
				ephemeral: true
			});
		}
	},
};