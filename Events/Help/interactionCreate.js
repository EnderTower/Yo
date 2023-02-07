const {
  ChatInputCommandInteraction,
  UserFlags,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (!interaction.isButton()) return;
    const id = interaction.customId;
    const idSplit = id.split("_");
    const messageID = idSplit[3];
    const helpAuthorID = idSplit[4];
    if(!interaction.channel) return;
    const helpMessage = await interaction.channel.messages.fetch(messageID);

    if (helpAuthorID != interaction.member.id) {
      const notYourMessageEmbed = new EmbedBuilder()
        .setColor(client.config.embedcolor)
        .setTitle("Error")
        .setDescription(`${client.config.noEmoji} This message isn't yours.`)
        .setTimestamp()
        .setFooter({
          text: client.config.defaultFooterText,
          iconURL: client.config.defaultFooterImage,
        });
      return interaction.reply({ embeds: [notYourMessageEmbed], ephemeral: true });
    }

    await interaction.reply({
      content: client.config.loadingEmoji,
      ephemeral: true,
    });
    await interaction.deleteReply();

    if (id.startsWith("help_command_home")) {
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
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(
            "help_command_home_" + messageID + "_" + interaction.member.id
          )
          .setStyle(ButtonStyle.Success)
          .setLabel("Info")
          .setEmoji(client.config.houseEmoji)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(
            "help_command_commands_" + messageID + "_" + interaction.member.id
          )
          .setStyle(ButtonStyle.Secondary)
          .setLabel("Commands")
          .setEmoji("🔧")
      );
      await helpMessage.edit({ embeds: [infoEmbed], components: [row] });
    }
    if (id.startsWith("help_command_commands")) {
      const commandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedcolor)
        .setTitle("Help Menu")
        .setDescription(
          "**Commands list:**\n\n`/reaction add`\n> ➜ Allows any Administrator to add a reaction on words, channels or all messages with a tag.\n\n`/reaction remove`\n> ➜ Allows any Administrator to remove a reaction using its tag.\n\n`/reaction list`\n> ➜ Allows any Administrator to show all enabled reactions on the server.\n\n`/embed`\n> ➜ Allows any user with the permission 'Manage messages' to embed a message.\n\n_To know more about this bot, execute the command `/help info`._"
        )
        .setFooter({
          text: client.config.defaultFooterText,
          iconURL: client.config.defaultFooterImage,
        })
        .setTimestamp();
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("help_command_home_" + messageID + "_" + interaction.member.id )
          .setStyle(ButtonStyle.Success)
          .setLabel("Info")
          .setEmoji(client.config.houseEmoji),
        new ButtonBuilder()
          .setCustomId("help_command_commands_" + messageID + "_" + interaction.member.id )
          .setStyle(ButtonStyle.Secondary)
          .setLabel("Commands")
          .setEmoji("🔧")
          .setDisabled(true)
      );
      await helpMessage.edit({ embeds: [commandsEmbed], components: [row] });
    }
  },
};
