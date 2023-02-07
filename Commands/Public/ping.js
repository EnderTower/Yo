const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows Yo's ping."),

  async execute(interaction, client) {
    const pingEmbed = new EmbedBuilder()
      .setColor(client.config.embedcolor)
      .setTitle("🏓 Pong")
      .setFooter({
        text: client.config.defaultFooterText,
        iconURL: client.config.defaultFooterImage,
      })
      .setTimestamp();

    const interact = await interaction.reply({
      content: `${client.config.loadingEmoji} Loading..`,
      fetchReply: true,
      ephemeral: true,
    });

    await interaction.editReply({
      content: "",
      embeds: [
        pingEmbed.setDescription(
          "Yo's latency: `" +
            (interact.createdTimestamp - interaction.createdTimestamp) +
            "ms`\nDiscord API latency: `" +
            client.ws.ping +
            "ms`"
        ),
      ],
    });
  },
};
