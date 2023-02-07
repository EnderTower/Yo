const { EmbedBuilder } = require("discord.js");
const db = require("../../Schemas/updateSchema");

module.exports = {
  name: "guildCreate",
  async execute(guild, client) {
    const channel = await client.channels.fetch(client.config.guildLogsChannel)
    const guildCreateEmbed = new EmbedBuilder()
      .setColor(client.config.embedcolor)
      .setTitle(`Joined server`)
      .setDescription(`Server name: **${guild.name}**\nServer ID: \`${guild.id}\`\nMember count: **${guild.memberCount}**\n\n> ➜ I now am in ${client.guilds.cache.size} guilds.`)
      .setThumbnail(guild.iconURL())
      .setFooter({
        text: client.config.defaultFooterText,
        iconURL: client.config.defaultFooterImage,
      })
      .setTimestamp();

      channel.send({ embeds: [guildCreateEmbed] })
    const updateDatabase = await db.findOne({Guild: guild.id})
    if(!updateDatabase) {
        return await db.create({Guild: guild.id})
    } else return;
  },
};
