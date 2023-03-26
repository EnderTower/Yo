const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");
const { loadButtons } = require('../../../Handlers/buttonHandler');

module.exports = {
    subCommand: "reload.buttons",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute( interaction, client) {

        const buttons_embed = new EmbedBuilder()
            .setColor(client.config.embedcolor)
            .setDescription('✅ Successfully reloaded the Buttons !')

        loadButtons(client);
        interaction.reply({embeds: [buttons_embed], ephemeral: true});
    }
}