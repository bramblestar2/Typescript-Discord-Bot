"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Repeats what you typed!')
        .addStringOption(option => option.setName('question')
        .setDescription("The question you're asking the magic 8Ball")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let userQuestion = `${interaction.options.getString('question', true)}`;
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
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle("8Ball")
                .setColor(0xAF009A)
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                .setFields({ name: "User Question", value: `${userQuestion}` }, { name: "8Ball Answer", value: `${ball_responses[choice]}` });
            yield interaction.reply({
                embeds: [embed]
            });
        });
    },
};
//# sourceMappingURL=8ball.js.map