const { REST, Routes } = require('discord.js');
const { clientId, token } = require('../config.json');
const { getAllFiles } = require('./functions.js')

const commands = [];
const commandFiles = getAllFiles("./src/commands")

for (const file of commandFiles) {
    const command = require(`../.${file}`)
    if(command.data) commands.push(command.data.toJSON())
    if(command.cmdata) commands.push(command.cmdata.toJSON())
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        const refreshStart = new Date()
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(clientId), {body: commands})

        console.log(`Successfully reloaded application (/) commands. (${new Date() - refreshStart}ms)`);
    } catch (error) {
        console.error(error);
    }
})();