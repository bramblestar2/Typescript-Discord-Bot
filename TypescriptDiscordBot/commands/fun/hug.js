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
const crypto_1 = require("crypto");
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('hug')
        .setDescription('Hug someone!')
        .addUserOption(option => option.setName('user')
        .setDescription('The user you will be hugging!')
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const huggedUser = interaction.options.getUser('user');
            const user = interaction.user;
            const response = yield fetch("https://e926.net/posts.json?tags=hug&limit=10&page=3", {
                method: 'GET',
                headers: {
                    Accept: "application/json"
                }
            });
            const apiResponse = yield response.json();
            const embed = new discord_js_1.EmbedBuilder()
                .setAuthor({
                name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}`
            })
                .setColor(0x0015F0)
                .setTitle('Hug!')
                .setDescription(`${user} has hugged ${huggedUser}!`)
                .setThumbnail(`${huggedUser.displayAvatarURL()}`)
                .setImage(`${apiResponse["posts"][(0, crypto_1.randomInt)(0, 9)]["file"]["url"]}`);
            yield interaction.reply({
                embeds: [embed]
            });
        });
    },
};
//# sourceMappingURL=hug.js.map