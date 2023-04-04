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
const discord_js_1 = require("discord.js");
const node_fs_1 = __importDefault(require("node:fs"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggest a feature')
        .addStringOption(option => option.setName('type')
        .setDescription('The type of feature you are suggesting')
        .setRequired(true))
        .addStringOption(option => option.setName('idea')
        .setDescription('The description of the feature')
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const suggestions = node_fs_1.default.readFileSync('./feature suggestions.json');
            yield interaction.reply({
                content: "The feature has been suggested! Thank you for the idea!",
                ephemeral: true
            });
        });
    },
};
//# sourceMappingURL=suggest.js.map