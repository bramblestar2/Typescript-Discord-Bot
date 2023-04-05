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
        .setName('unmute')
        .setDescription('unmute a user')
        .addUserOption(option => option.setName('target')
        .setDescription('The user to unmute from the server')
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = interaction.options.getMember('target');
            if (target) {
                const role = target.roles.cache.find(role => role.name === "mute");
                if (role)
                    target.roles.remove(role);
            }
            yield interaction.reply(`Unmuted ${target}.`);
        });
    },
};
//# sourceMappingURL=unmute.js.map