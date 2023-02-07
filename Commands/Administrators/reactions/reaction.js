const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()

    .setName("reaction")
    .setDescription("Manage reactions.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)

    .addSubcommand((options) => options
    .setName("add")
    .setDescription("Add a reaction.")
    .addStringOption((options) => options
        .setName("tag")
        .setDescription("Specify the tag.")
        .setRequired(true)
    )
    .addStringOption((options) => options
        .setName("emoji")
        .setDescription("Specify the emoji.")
        .setRequired(true)
    )
    .addStringOption((options) => options
        .setName("word")
        .setDescription("Specify the word.")
        .setRequired(false)
    )
    .addChannelOption((options) => options
        .setName("channel")
        .setDescription("Specify the channel.")
        .setRequired(false)
    ))

    .addSubcommand((options) => options
    .setName("remove")
    .setDescription("Remove a reaction.")
    .addStringOption((options) => options
        .setName("tag")
        .setDescription("Specify the tag of the reaction you want to remove.")
        .setRequired(true)
    ))

    .addSubcommand((options) => options
    .setName("list")
    .setDescription("List all reactions.")
    )
}