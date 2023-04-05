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
        .setName('mute')
        .setDescription('mute a user')
        .addUserOption(option => option.setName('target')
        .setDescription('The user to mute from the server')
        .setRequired(true))
        .addIntegerOption(option => option.setName('duration')
        .setDescription('The amount of seconds to mute the user.')
        .setMinValue(1)
        .setMaxValue(1000000000)
        .setRequired(true))
        .addStringOption(option => option.setName('reason')
        .setDescription('Reason for the mute'))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.MuteMembers)
        .setDMPermission(false),
    execute(interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const target = interaction.options.getMember('target');
            const reason = (_a = interaction.options.getString('reason')) !== null && _a !== void 0 ? _a : 'No reason provided';
            const time = interaction.options.getInteger('duration');
            const role = interaction.guild.roles.cache.find(role => role.name === "mute");
            if (role && target) {
                if (!target.roles.cache.find(role => role.name === "mute"))
                    target.roles.add(role);
                else
                    return interaction.reply(`${target} is already muted`);
            }
            yield interaction.reply(`Muting ${target} for ${time} seconds\nreason: ${reason}`);
        });
    },
};
//# sourceMappingURL=mute.js.map