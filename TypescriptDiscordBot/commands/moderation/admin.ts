import { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('admin')
		.setDescription('Pulls up the admin commands')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Label')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setLabel('Label')
					.setStyle(ButtonStyle.Link)
					.setURL('https://www.youtube.com/c/jayfeather2000'),
		);

		const embed = new EmbedBuilder()
			.setColor(0x00A5FF)
			.setTitle("Title")
			.setURL('https://www.youtube.com/')
			.setAuthor({
				name: "Author",
				iconURL: "https://th.bing.com/th/id/R.1b7dac8edc218b35d4d917d49f32a46f?rik=L91OckMDlS2Sbg&riu=http%3a%2f%2fpm1.narvii.com%2f7155%2f797a959a81d6444c072ac9b19d356481290033f6r1-1011-1011v2_uhq.jpg&ehk=u%2fCbJFgjP9E1T6PB%2bL0XhsDH%2bqnyzIvQalgrk%2bB%2fBsY%3d&risl=&pid=ImgRaw&r=0",
				url: "https://www.youtube.com/"
			})
			.setDescription("Description")
			.setThumbnail("https://i.imgur.com/AfFp7pu.png")
			.addFields(
				{ name: "Field 1", value: '0x000090' },
				{ name: "Field 2", value: '0x000090' },
				{ name: "Field 3", value: '0x000090', inline: true },
			)
			.setImage("https://i.imgur.com/AfFp7pu.png")
			.setTimestamp()
			.setFooter({
				text: "Footer", iconURL: "https://i.imgur.com/AfFp7pu.png"
		});

		await interaction.reply({ embeds: [embed], components: [row] });
	},
};