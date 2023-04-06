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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const discord_js_1 = require("discord.js");
const config_json_1 = __importDefault(require("../../config.json"));
const apis_json_1 = require("../../apis.json");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('boop')
        .setDescription('Boop someone!')
        .addUserOption(option => option.setName('user')
        .setDescription('The user you will be booping!')
        .setRequired(true))
        .setDMPermission(false),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const huggedUser = interaction.options.getUser('user');
            const user = interaction.user;
            if (huggedUser.id != config_json_1.default.clientId) {
                const response = yield fetch(`${apis_json_1.furry}/posts.json?tags=boop+-nose_boop+-comic&limit=50&page=10`, {
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
                    .setTitle('Boop!')
                    .setDescription(`${user} has booped ${huggedUser}!`)
                    .setThumbnail(`${huggedUser.displayAvatarURL()}`)
                    .setImage(`${apiResponse["posts"][(0, crypto_1.randomInt)(0, apiResponse["posts"].length - 1)]["file"]["url"]}`);
                yield interaction.reply({
                    embeds: [embed]
                });
            }
            else {
                yield interaction.reply({
                    content: "H-hey! Why are you trying to boop me?! Go boop someone else!",
                    ephemeral: true
                });
            }
        });
    },
};
//# sourceMappingURL=boop.js.map