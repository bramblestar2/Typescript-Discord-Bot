import { randomInt } from 'crypto';
import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import config from '../../config.json'
import { furry } from "../../apis.json"

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cuddle')
		.setDescription('Cuddle someone!')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user you will be cuddling!')
				.setRequired(true)
		)
		.setDMPermission(false),

	async execute(interaction) {
		const huggedUser = interaction.options.getUser('user');
		const user = interaction.user;

		if (huggedUser.id != config.clientId) {
			const response = await fetch(`${furry}/posts.json?tags=cuddling+-comic&limit=50&page=3`, {
				method: 'GET',
				headers: {
					Accept: "application/json"
				}
			});

			let apiResponse;

			if (response.ok)
				apiResponse = await response.json();

			let embed = new EmbedBuilder()
				.setAuthor({
					name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}`
				})
				.setColor(0x0015F0)
				.setTitle('Cuddle!')
				.setDescription(`${user} has cuddled ${huggedUser}!`)
				.setThumbnail(`${huggedUser.displayAvatarURL()}`);

			if (response.ok)
				embed.addFields(
					{ name: "Image", value: "" }
				).setImage(`${apiResponse["posts"][randomInt(0, apiResponse["posts"].length - 1)]["file"]["url"]}`);
			else {
				embed.addFields(
					{ name: "Image", value: "The website that i get the images from is currently down! Sorry!" }
				);
			}

			await interaction.reply({
				embeds: [embed]
			})
		}
		else {
			await interaction.reply({
				content: "Thank ya for the cuddles!",
				ephemeral: true
			});
		}
	},
};