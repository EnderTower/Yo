const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");
const { loadEvents } = require('../../../Handlers/eventHandler');

module.exports = {
    subCommand: "reload.events",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute( interaction, client) {

    const events_reload_embed = new EmbedBuilder()
        .setColor(client.config.embedcolor)
        .setDescription('✅ Successfully reloaded the Events !')

    for( const [key, value] of client.events )
    client.removeListener(`${key}`, value, true);

    loadEvents(client);

    interaction.reply({embeds: [events_reload_embed], ephemeral: true});
    }
}