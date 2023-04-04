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
        .setName('kick')
        .setDescription('Kick a user')
        .addUserOption(option => option.setName('target')
        .setDescription('The user to kick from the server')
        .setRequired(true))
        .addStringOption(option => option.setName('reason')
        .setDescription('Reason for the kick')
        .setRequired(true))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.KickMembers | discord_js_1.PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    execute(interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const target = interaction.options.getUser('target');
            const reason = (_a = interaction.options.getString('reason')) !== null && _a !== void 0 ? _a : 'No reason provided';
            yield interaction.reply(`Banning ${target.username} for reason: ${reason}`);
            yield interaction.guild.members.kick(target);
        });
    },
};
//# sourceMappingURL=kick.js.map