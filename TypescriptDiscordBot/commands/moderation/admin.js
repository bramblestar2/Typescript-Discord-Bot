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
        .setName('admin')
        .setDescription('Pulls up the admin commands')
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId('primary')
                .setLabel('Label')
                .setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
                .setLabel('Label')
                .setStyle(discord_js_1.ButtonStyle.Link)
                .setURL('https://www.youtube.com/c/jayfeather2000'));
            const embed = new discord_js_1.EmbedBuilder()
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
                .addFields({ name: "Field 1", value: '0x000090' }, { name: "Field 2", value: '0x000090' }, { name: "Field 3", value: '0x000090', inline: true })
                .setImage("https://i.imgur.com/AfFp7pu.png")
                .setTimestamp()
                .setFooter({
                text: "Footer", iconURL: "https://i.imgur.com/AfFp7pu.png"
            });
            yield interaction.reply({ embeds: [embed], components: [row] });
        });
    },
};
//# sourceMappingURL=admin.js.map