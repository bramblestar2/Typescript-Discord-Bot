import { SlashCommandBuilder, PermissionFlagsBits, Base, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js'
import Cataas from 'cataas-api';


module.exports = {
	data: { "customId": "generatecatimage" },

	async execute(interaction) {
		const embedArray : Array<EmbedBuilder> = interaction.message.embeds;

		const fields = embedArray[0].data.fields;

		let text;
		let tag;

		if (fields) {
			text = fields.find(element => element.name == "Text");
			tag = fields.find(element => element.name == "Tag");
		}

		const baseURL = "https://cataas.com/"
		let extra = "cat";

		if (tag)
			extra += `/${tag.value.toLowerCase()}`;
		if (text)
			extra += `/says/${text.value.toLowerCase()}`

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
			embed.addFields({ name: "Text", value: `${text.value}`, inline: true });
		if (tag)
			embed.addFields({ name: "Tag", value: `${tag.value}`, inline: true });

		
		await interaction.message.edit({
			embeds: [embed]
		})

		await interaction.reply({
			content: "A new cat image has been generated!",
			ephemeral: true
		})
	},
};