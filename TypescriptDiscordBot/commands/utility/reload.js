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
const config_json_1 = require("../../config.json");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('reload')
        .setDescription('(Owner only): Reloads a specified command')
        .addStringOption(option => option.setName("command")
        .setDescription("The command to reload")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction.user.id == config_json_1.creatorId) {
                const commandName = interaction.options.getString('command', true).toLowerCase();
                const command = interaction.client.commands.get(commandName);
                if (!command) {
                    return interaction.reply(`There is no command with name \`${commandName}\`!`);
                }
                const foldersPath = node_path_1.default.join(node_path_1.default.dirname(require.main.filename), 'commands');
                const commandFolders = node_fs_1.default.readdirSync(foldersPath);
                var cmdFile;
                for (var i = 0; i < commandFolders.length; i++) {
                    const commandsPath = node_path_1.default.join(foldersPath, commandFolders[i]);
                    const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
                    for (var i = 0; i < commandFiles.length; i++) {
                        const cmdName = node_path_1.default.basename(commandFiles[i], '.js');
                        if (cmdName == command.data.name) {
                            cmdFile = commandsPath + "\\" + commandFiles[i];
                        }
                    }
                }
                if (!cmdFile) {
                    return interaction.reply(`No file for the command "${command.data.name}" was found.`);
                }
                else {
                    delete require.cache[require.resolve(cmdFile)];
                    try {
                        interaction.client.commands.delete(command.data.name);
                        const newCommand = require(cmdFile);
                        interaction.client.commands.set(newCommand.data.name, newCommand);
                        yield interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
                    }
                    catch (error) {
                        console.error(error);
                        yield interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
                    }
                }
            }
            else {
                yield interaction.reply(`This command wont work since you are not the creator.`);
            }
        });
    },
};
//# sourceMappingURL=reload.js.map