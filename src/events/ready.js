const { Events, Client, ActivityType } = require("discord.js");
const { getAllFiles } = require("../util/functions");

module.exports = {
    name: Events.ClientReady,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client){
        const commandFiles = getAllFiles('./src/commands')
        for (const file of commandFiles) {
            const command = require(`../.${file}`)
            client.commands.set(command.name, command)
            if (command.cmdata) client.contextCommands.set(command.cmdata.name, command)
        }

        console.log(`Logged in to ${client.user.tag}`)

        let presence = [`${client.guilds.cache.size} servers!`, ActivityType.Watching]    
        client.user.setPresence({ activities: [{name: presence[0], type: presence[1]}]})

        setInterval(() => {
            let presence = [`${client.guilds.cache.size} servers!`, ActivityType.Watching]
            client.user.setPresence({activities: [{name: presence[0], type: presence[1]}]})
        }, 60000)
    }
}