const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("discrim")
    .setDescription("Show people with the same discrim as you."),

  async execute(interaction, client) {
    const { member, guild } = interaction;
    const userTag = member.user.tag;
    const userDiscrim = userTag.split("#")[1];
    const membersWithSameDiscrim = await guild.members.cache
      .filter(
        (guildMember) =>
          guildMember.user.tag.split("#")[1] == userDiscrim &&
          guildMember.user.tag != userTag
      )
      .map((guildMember) => guildMember.user.username)
      .join("\n> ");

    const discrimEmbed = new EmbedBuilder()
      .setColor(client.config.embedcolor)
      .setTitle("Discrim")
      .setDescription(
        `**Users with the same discrim as you:**\n\n> ${membersWithSameDiscrim}`
      )
      .setTimestamp()
      .setFooter({
        text: client.config.defaultFooterText,
        iconURL: client.config.defaultFooterImage,
      });


      const noDiscrimEmbed = new EmbedBuilder()
      .setColor(client.config.embedcolor)
      .setTitle("Discrim")
      .setDescription(
        `${client.config.noEmoji} No users in this guild have the same discrim as you.`
      )
      .setTimestamp()
      .setFooter({
        text: client.config.defaultFooterText,
        iconURL: client.config.defaultFooterImage,
      });


    if (
      (await guild.members.cache.filter(
        (guildMember) =>
          guildMember.user.tag.split("#")[1] == userDiscrim &&
          guildMember.user.tag != userTag
      ).size) == 0
    ) {
      interaction.reply({ embeds: [noDiscrimEmbed] })
    } else {
      interaction.reply({ embeds: [discrimEmbed] });
    }
  },
};
