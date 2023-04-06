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
// Require the necessary discord.js classes
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config.json");
// Create a new client instance
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
client.commands = new discord_js_1.Collection();
client.components = new discord_js_1.Collection();
const rest = new discord_js_1.REST({ version: '10' }).setToken(config_json_1.token);
const foldersPath = node_path_1.default.join(__dirname, 'commands');
const commandFolders = node_fs_1.default.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = node_path_1.default.join(foldersPath, folder);
    const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = node_path_1.default.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }
        else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}
const componentFolderPath = node_path_1.default.join(__dirname, 'components');
const componentFolders = node_fs_1.default.readdirSync(componentFolderPath);
for (const folder of componentFolders) {
    const componentsPath = node_path_1.default.join(componentFolderPath, folder);
    const componentFiles = node_fs_1.default.readdirSync(componentsPath).filter(file => file.endsWith('.js'));
    for (const file of componentFiles) {
        const filePath = node_path_1.default.join(componentsPath, file);
        const component = require(filePath);
        if ('execute' in component) {
            client.components.set(component.data.customId, component);
        }
        else {
            console.log(`[WARNING] The component at ${filePath} is missing a required "execute" property.`);
        }
    }
}
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(discord_js_1.Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    client.user.setPresence({
        activities: [{ name: 'my creators suffering', type: discord_js_1.ActivityType.Watching }],
        status: 'online'
    });
});
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            yield command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                yield interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            }
            else {
                yield interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
    else if (interaction.isButton()) {
        const component = interaction.client.components.get(interaction.customId);
        if (!component) {
            console.error(`No command matching ${interaction.customId} was found.`);
            return;
        }
        try {
            yield component.execute(interaction);
        }
        catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                yield interaction.followUp({ content: 'There was an error while executing this component!', ephemeral: true });
            }
            else {
                yield interaction.reply({ content: 'There was an error while executing this component!', ephemeral: true });
            }
        }
    }
}));
//setInterval(() => {
//	const guilds = client.guilds.cache;
//	console.log("Guilds: (Size: " + guilds.size + ", [" + guilds.map(guild => guild.name).join(", ") + "])");
//}, 100000);
// Log in to Discord with your client's token
client.login(config_json_1.token);
//# sourceMappingURL=app.js.map