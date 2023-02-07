const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const db = require("../../Schemas/updateSchema");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if(message.author.bot) return;
    if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionFlagsBits.SendMessages)) {
       return;
    }
    const updateDatabase = await db.findOne({Guild: message.guild.id})
    const updateEmbed = new EmbedBuilder()
        .setColor(client.config.embedcolor)
        .setTitle("Update notice")
        .setDescription("Hey `" + message.guild.name + "` !\n\n**Yo! has recently updated.** It is now more optimised and will be able to provide new commands in the future.\n\nOne new command has been added. The `/embed`, it allows a user with 'Manage messages' permissions to embed a specified message.\n\n`📌 IMPORTANT`\n\nUnfortunately, all previously set reactions have been removed due to a database migration (we switched from SQLite to MongoDB). \n> Please set them up again using the `/reaction add` command.\n\n**Regards,**\n**Yo's developer - EnderTower#3055**\n\n_This message only shows once._")
        .setFooter({
            text: client.config.defaultFooterText,
            iconURL: client.config.defaultFooterImage,
        })
        .setTimestamp();

    if(!updateDatabase) {
        message.channel.send({embeds: [updateEmbed]})
        await db.create({Guild: message.guild.id})
    }
  },
};
