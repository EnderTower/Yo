const { EmbedBuilder } = require("discord.js");
const db1 = require("../../Schemas/updateSchema");
const db2 = require("../../Schemas/reactionsSchema");

module.exports = {
  name: "guildDelete",
  async execute(guild, client) {
    const channel = await client.channels.fetch(client.config.guildLogsChannel)
    const guildDeleteEmbed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`Left server`)
      .setDescription(`Server name: **${guild.name}**\nServer ID: \`${guild.id}\`\nMember count: **${guild.memberCount}**\n\n> ➜ I now am in ${client.guilds.cache.size} guilds.`)
      .setThumbnail(guild.iconURL())
      .setFooter({
        text: client.config.defaultFooterText,
        iconURL: client.config.defaultFooterImage,
      })
      .setTimestamp();

      channel.send({ embeds: [guildDeleteEmbed] })
    const updateDatabase = await db1.findOne({Guild: guild.id})
    if(updateDatabase) {
        await updateDatabase.delete();
    }
    const reactionDB = await db2.findOne({ Guild: guild.id });
    if(reactionDB) {
        await reactionDB.delete();
    }
  },
};
