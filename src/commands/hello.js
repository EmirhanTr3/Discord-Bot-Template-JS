const { ChatInputCommandInteraction, ContextMenuCommandInteraction, SlashCommandBuilder, ContextMenuCommandBuilder } = require("discord.js");

module.exports = {
    name: "hello",

    cmdata: new ContextMenuCommandBuilder()
        .setName("Hello")
        // 2 = User Context Menu Command
        // 3 = Message Context Menu Command
        .setType(2),

    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("Replies with \"Hello!\""),
    /**
     * 
     * @param {ContextMenuCommandInteraction} interaction 
     */
    contextExecute(interaction){
        interaction.reply({content: "Hello from the context command!", ephemeral: true})
    },
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction){
        interaction.reply({content: "Hello!", ephemeral: true})
    }
}