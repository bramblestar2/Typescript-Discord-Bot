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
        .setName('cat')
        .setDescription('gets a random cat image')
        .addStringOption(option => option.setName('text')
        .setDescription('Text to be overlayed on the image'))
        .addStringOption(option => option.setName('tag')
        .setDescription('tags to use')),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = interaction.options.getString('text');
            let tag = interaction.options.getString('tag');
            const baseURL = "https://cataas.com/";
            let extra = "cat";
            if (tag)
                extra += `/${tag}`;
            if (text)
                extra += `/says/${text}`;
            extra += "?json=true";
            const response = yield fetch(`${baseURL}${extra}`, {
                method: 'GET',
                headers: {
                    Accept: "application/json"
                }
            });
            const apiResponse = yield response.json();
            let embed = new discord_js_1.EmbedBuilder()
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
            const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId('generatecatimage')
                .setStyle(discord_js_1.ButtonStyle.Primary)
                .setLabel('Generate'));
            yield interaction.reply({
                embeds: [embed],
                components: [row]
            });
        });
    },
};
//# sourceMappingURL=cat.js.map