const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  GuildEmoji,
  Embed,
  ChannelType,
} = require("discord.js");
const db = require("../../../Schemas/reactionsSchema");

module.exports = {
  subCommand: "reaction.add",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { guild, member, options } = interaction;
    const reactionDB = await db.findOne({ Guild: guild.id });
    const emoji = options.getString("emoji");
    const tag = options.getString("tag");
    const reactionTestDB = await db.findOne({ Tag: tag });
    let word = options.getString("word");
    let channel = options.getChannel("channel");
    const channelIsntText = new EmbedBuilder()
      .setColor(client.config.embedcolor)
      .setTitle("Invalid channel")
      .setDescription(
        `${client.config.noEmoji} The channel specified can only be a text channel.`
      )
      .setTimestamp()
      .setFooter({
        text: client.config.defaultFooterText,
        iconURL: client.config.defaultFooterImage,
      });

    if (channel && channel.type != ChannelType.GuildText) {
      return interaction.reply({ embeds: [channelIsntText], ephemeral: true });
    } else if (!channel) {
      channel = "ALL";
    }
    const emojiRegex = /\p{Emoji}/u;

    if (!word) {
      word = false;
    }

    if (reactionTestDB) {
      const alreadyTag = new EmbedBuilder()
        .setColor(client.config.embedcolor)
        .setTitle("Invalid tag")
        .setDescription(
          `${client.config.noEmoji} You can't add multiple reactions with the same IDs.`
        )
        .setTimestamp()
        .setFooter({
          text: client.config.defaultFooterText,
          iconURL: client.config.defaultFooterImage,
        });

      return interaction.reply({
        embeds: [alreadyTag],
        ephemeral: true,
      });
    }

    if (emojiRegex.test(emoji) == false) {
      const invalidEmoji = new EmbedBuilder()
        .setColor(client.config.embedcolor)
        .setTitle("Invalid emoji")
        .setDescription(
          `${client.config.noEmoji} The emoji you specified isn't valid.`
        )
        .setTimestamp()
        .setFooter({
          text: client.config.defaultFooterText,
          iconURL: client.config.defaultFooterImage,
        });

      return interaction.reply({
        embeds: [invalidEmoji],
        ephemeral: true,
      });
    }

    if (emojiRegex.test(emoji) && emoji.startsWith("<")) {
      const emojiSplit = emoji.split(":");
      const emojiID = emojiSplit[2].replace(">", "");
      if (
        client.emojis.cache.get(emojiID) == null ||
        (client.emojis.cache.get(emojiID) != null &&
          client.emojis.cache.get(emojiID).guild.id != interaction.guild.id)
      ) {
        const emojiNotFromServer = new EmbedBuilder()
          .setColor(client.config.embedcolor)
          .setTitle("Invalid emoji")
          .setDescription(
            `${client.config.noEmoji} The emoji you specified isn't from this server.`
          )
          .setTimestamp()
          .setFooter({
            text: client.config.defaultFooterText,
            iconURL: client.config.defaultFooterImage,
          });
        return interaction.reply({
          embeds: [emojiNotFromServer],
          ephemeral: true,
        });
      }
    }

    //if (word == "dropdb" && interaction.member.id === "424881707947261952") {
    //  reactionDB.delete();
    //  return interaction.reply({ content: "Dropped db." });
    //}

    if (!reactionDB) {
      if (channel == "ALL") {
        await db.create({
          Guild: guild.id,
          Word: [word],
          Tag: [tag],
          Emoji: [emoji],
          Channel: [`${channel}`],
        });
      } else {
        await db.create({
          Guild: guild.id,
          Word: [word],
          Tag: [tag],
          Emoji: [emoji],
          Channel: [`${channel.id}`],
        });
      }
    } else {
      reactionDB.Word.push(word);
      reactionDB.Tag.push(tag);
      reactionDB.Emoji.push(emoji);
      if (channel != "ALL") {
        reactionDB.Channel.push(channel.id);
      } else {
        reactionDB.Channel.push(channel);
      }
      reactionDB.save();
    }

    const addedReaction = new EmbedBuilder()
      .setColor(client.config.embedcolor)
      .setTitle("Added reaction")
      .setDescription(
        `${client.config.yesEmoji} The reaction with the tag ${tag} and the emoji ${emoji} has successfully been saved.`
      )
      .setTimestamp()
      .setFooter({
        text: client.config.defaultFooterText,
        iconURL: client.config.defaultFooterImage,
      });
    interaction.reply({ embeds: [addedReaction] });
  },
};
