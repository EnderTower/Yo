const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("Shows help."),

  async execute(interaction, client) {
    const { guild, member } = interaction;

    const infoEmbed = new EmbedBuilder()
      .setColor(client.config.embedcolor)
      .setTitle("Help Menu")
      .setDescription(
        "**What is this bot ?**\n> This bot was originally designed as a simple reaction bot. \n> It **will** include other more advanced commands in the future.\n\n**Want to help the bot become better?**\n> Feel free to suggest new features at yobot.contact@gmail.com\n\n**Having trouble using Yo! ?**\n> Join the support server !\n> ➜ https://discord.gg/2VN5yJCQ8K\n\n_Thanks for adding Yo! to your server !_"
      )
      .setFooter({
        text: "Yo! designed by EnderTower#3055",
        iconURL: client.config.defaultFooterImage,
      })
      .setTimestamp();

    await interaction.reply({ embeds: [infoEmbed] });
    const message = await interaction.fetchReply();
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("help_command_home_" + message.id + "_" + interaction.member.id)
        .setStyle(ButtonStyle.Success)
        .setLabel("Info")
        .setEmoji(client.config.houseEmoji)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("help_command_commands_" + message.id + "_" + interaction.member.id)
        .setStyle(ButtonStyle.Secondary)
        .setLabel("Commands")
        .setEmoji("🔧")
    );

    interaction.editReply({ components: [row] });
  },
};
