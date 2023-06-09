import { SlashCommandBuilder, PermissionFlagsBits, Base, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js'
import Cataas from 'cataas-api';


module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('gets a random cat image')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('Text to be overlayed on the image'))
		.addStringOption(option =>
			option.setName('tag')
				.setDescription('tags to use')),

	async execute(interaction) {
		const text : String = interaction.options.getString('text');
		let tag : String = interaction.options.getString('tag');
		
		const baseURL = "https://cataas.com/"
		let extra = "cat";

		if (tag)
			extra += `/${tag}`;
		if (text)
			extra += `/says/${text}`

		extra += "?json=true";

		const response = await fetch(`${baseURL}${extra}`, {
			method: 'GET',
			headers: {
				Accept: "application/json"
			}
		});

		const apiResponse = await response.json();

		let embed = new EmbedBuilder()
			.setTitle("Cataas API")
			.setURL(`${baseURL}${apiResponse["url"]}`)
			.setImage(`${baseURL}${apiResponse["url"]}`)
			.setColor(0x9500C0)
			.setAuthor({
				name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`
			});

		if (text)
			embed.addFields({ name: "Text", value: `${text}`, inline: true });
		if (tag)
			embed.addFields({ name: "Tag", value: `${tag}`, inline: true });

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('generatecatimage')
				.setStyle(ButtonStyle.Primary)
				.setLabel('Generate'),
		);

		await interaction.reply({
			embeds: [embed],
			components: [row]
		})
	},
};