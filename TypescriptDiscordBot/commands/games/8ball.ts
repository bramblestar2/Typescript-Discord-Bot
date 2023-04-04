import { SlashCommandBuilder } from 'discord.js'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Repeats what you typed!')
		.addStringOption(option =>
			option.setName('question')
				.setDescription("The question you're asking the magic 8Ball")
				.setRequired(true)),
	async execute(interaction) {
		var response = `Users question: ${interaction.options.getString('question', true)}`;

		const ball_responses = [			
			"It is certain				",
			"It is decidedly so			",
			"Without a doubt			",
			"Yes, definitely			",
			"You may rely on it			",
			"As I see it, yes			",
			"Most likely				",
			"Outlook good				",
			"Yes						",
			"Signs point to yes			",
			"Reply hazy try again		",
			"Ask again later			",
			"Better not tell you now	",
			"Cannot predict now			",
			"Concentrate and ask again	",
			"Don't count on it			",
			"My reply is no				",
			"My sources say no			",
			"Outlook not so good		",
			"Very doubtful				",
		];

		const choice = Math.floor(Math.random() * ball_responses.length);
		response += `\n8ball response: ${ball_responses[choice]}.`;

		await interaction.reply(response);
	},
};