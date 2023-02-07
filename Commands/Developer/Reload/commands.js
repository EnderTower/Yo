const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");
const { loadCommands } = require("../../../Handlers/commandHandler")

module.exports = {
    subCommand: "reload.commands",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute( interaction, client) {

        const commands_embed = new EmbedBuilder()
            .setColor(client.config.embedcolor)
            .setDescription('✅ Successfully reloaded the Commands !')

        loadCommands(client);
        interaction.reply({embeds: [commands_embed], ephemeral: true});
    }
}