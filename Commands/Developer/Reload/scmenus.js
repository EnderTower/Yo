const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");
const { loadSCMenus } = require("../../../Handlers/scrollMenuHandler");

module.exports = {
    subCommand: "reload.scmenus",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute( interaction, client) {

        const buttons_embed = new EmbedBuilder()
            .setColor(client.config.embedcolor)
            .setDescription('✅ Successfully reloaded the Buttons !')

        loadSCMenus(client);
        interaction.reply({embeds: [buttons_embed], ephemeral: true});
    }
}