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
    data: { "customId": "generatecatimage" },
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const embedArray = interaction.message.embeds;
            const fields = embedArray[0].data.fields;
            let text;
            let tag;
            if (fields) {
                text = fields.find(element => element.name == "Text");
                tag = fields.find(element => element.name == "Tag");
            }
            const baseURL = "https://cataas.com/";
            let extra = "cat";
            if (tag)
                extra += `/${tag.value.toLowerCase()}`;
            if (text)
                extra += `/says/${text.value.toLowerCase()}`;
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
                embed.addFields({ name: "Text", value: `${text.value}`, inline: true });
            if (tag)
                embed.addFields({ name: "Tag", value: `${tag.value}`, inline: true });
            yield interaction.message.edit({
                embeds: [embed]
            });
            yield interaction.reply({
                content: "A new cat image has been generated!",
                ephemeral: true
            });
        });
    },
};
//# sourceMappingURL=generatecatimage.js.map