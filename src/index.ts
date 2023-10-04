//Created by Matthew J. 2023
import {REST, Routes, SlashCommandBuilder} from "discord.js";
import path from "path";
import * as fs from "fs";
import console from "console";
const { clientId, guildId, token , StripeAPIKey} = require('../config.json');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');



//DISCORD CLIENT//
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});
///

client.commands = new Collection(); //Discord Command Collection


//When discord client is ready
client.once(Events.ClientReady, (c: { user: { tag: any; }; }) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});


client.login(token); //Discord User loggin in

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

const commands = [];
const commands_inter = new Array();
const commandsNames = new Array();
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            commands_inter.push(command);
            commandsNames.push(command.name);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}
// @ts-ignore
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    let x = commandsNames.indexOf(interaction.commandName);
    let command = commands_inter[x];

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        console.error(String(interaction.client.commands));
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );


        // @ts-ignore
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
