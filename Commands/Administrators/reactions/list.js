const {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    GuildEmoji,
    Embed,
  } = require("discord.js");
  const db = require("../../../Schemas/reactionsSchema");
  
  module.exports = {
    subCommand: "reaction.list",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
      const reactionDB = await db.findOne({ Guild: interaction.guild.id });
      if (!reactionDB) {
        const noReaction = new EmbedBuilder()
          .setColor(client.config.embedcolor)
          .setTitle("Reactions list")
          .setDescription(`${client.config.noEmoji} Couldn't find any reactions.`)
          .setFooter({
            text: client.config.defaultFooterText,
            iconURL: client.config.defaultFooterImage,
          })
          .setTimestamp();
        return interaction.reply({ embeds: [noReaction], ephemeral: true });
      }
  
      const tags = reactionDB.Tag;
      const words = reactionDB.Word;
      const channels = reactionDB.Channel;
      const emojis = reactionDB.Emoji;
      let reactionsString = '';
  
      if (tags && tags.length > 0) {
        for (let i = 0; i < tags.length; i++) {
          let word = words[i];
          if (word === false) {
            word = "disabled";
          }
          let channel = channels[i];
          if (channel === "ALL") {
            channel = "disabled";
          } else {
            channel = `<#${channels[i]}>`;
          }
          reactionsString += `**Tag: ${tags[i]}**\n> Emoji: ${emojis[i]}\n> Word: ${word}\n> Channel: ${channel}\n\n`;
        }
      }
      const reactionList = new EmbedBuilder()
        .setColor(client.config.embedcolor)
        .setTitle("Reactions list")
        .setDescription("Here is a list of all reactions:\n\n" + reactionsString)
        .setFooter({
          text: client.config.defaultFooterText,
          iconURL: client.config.defaultFooterImage,
        })
        .setTimestamp();
      interaction.reply({ embeds: [reactionList] });
    },
  };
  