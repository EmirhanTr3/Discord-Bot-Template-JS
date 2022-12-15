const { Events, Client, Interaction } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    async execute(interaction){
        if (interaction.isCommand() && interaction.isChatInputCommand()){
            const command = interaction.client.commands.get(interaction.commandName)
            if (!command) return
            try {
                await command.execute(interaction, interaction.client)
            } catch(error) {
                handleError(interaction, error)
            }
        }else if (interaction.isCommand() && interaction.isContextMenuCommand()){
            const command = interaction.client.contextCommands.get(interaction.commandName)
            if (!command) return
            try {
                await command.contextExecute(interaction, interaction.client)
            } catch(error) {
                handleError(interaction, error)
            }
        }
    }
}

/**
 * 
 * @param {Interaction} interaction 
 * @param {Error} error 
 * @returns 
 */
function handleError(interaction, error){
    let message = "There was an error while executing this command!"
    console.error(error)
    if (interaction.replied) return interaction.followUp({content: message})
    if (interaction.deferred) return interaction.editReply({content: message})
    return interaction.reply({content: message, ephemeral: true})
}