const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
    developer: true,
    data: new SlashCommandBuilder()

    .setName("reload")
    .setDescription("(Developer only) Reload all Yo's commands/events/buttons/scmenus.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    .addSubcommand((options) => options
    .setName("events")
    .setDescription("Reload Yo's events."))

    .addSubcommand((options) => options
    .setName("commands")
    .setDescription("Reload Yo's commands."))

    .addSubcommand((options) => options
    .setName("buttons")
    .setDescription("Reload Yo's buttons.")
    )
    .addSubcommand((options) => options
    .setName("scmenus")
    .setDescription("Reload Yo's scroll menus.")
    )
}