const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { token } = require('./config.json')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User
    ]
})

client.commands = new Collection()
client.contextCommands = new Collection()

require('./util/eventHandler').registerEvents(client)

process.on("uncaughtException", (error) => console.log(error))

client.login(token)