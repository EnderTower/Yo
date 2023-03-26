const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const db = require("../../../Schemas/reactionsSchema");

module.exports = {
  subCommand: "reaction.remove",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { guild, member, options } = interaction;
    const reactionDB = await db.findOne({ Guild: guild.id });
    const tag = options.getString("tag");
    const word = reactionDB.Word;
    const noReaction = new EmbedBuilder()
      .setColor(client.config.embedcolor)
      .setTitle("Invalid tag")
      .setDescription(
        `${client.config.noEmoji} Couldn't find any reaction with the tag "**${tag}**".`
      )
      .setTimestamp()
      .setFooter({
        text: client.config.defaultFooterText,
        iconURL: client.config.defaultFooterImage,
      });
    if (!reactionDB) {
      return interaction.reply({
        embeds: [noReaction],
        ephemeral: true,
      });
    }
    const tagsArray = reactionDB.Tag;

    for (let i = 0; i < tagsArray.length; i++) {
      if (tagsArray[i] == tag) {
        const deletedEmbed = new EmbedBuilder()
          .setColor(client.config.embedcolor)
          .setTitle("Removed Reaction")
          .setDescription(
            `${client.config.yesEmoji} Successfully deleted the emoji ${reactionDB.Emoji[i]} on the word **${reactionDB.Word[i]}**.`
          )
          .setTimestamp()
          .setFooter({
            text: client.config.defaultFooterText,
            iconURL: client.config.defaultFooterImage,
          });

        const deletedEmbed2 = new EmbedBuilder()
          .setColor(client.config.embedcolor)
          .setTitle("Removed Reaction")
          .setDescription(
            `${client.config.yesEmoji} Successfully deleted the reaction with the emoji ${reactionDB.Emoji[i]}.`
          )
          .setTimestamp()
          .setFooter({
            text: client.config.defaultFooterText,
            iconURL: client.config.defaultFooterImage,
          });
          
        if (word[i] != false) {
          interaction.reply({ embeds: [deletedEmbed] });
        } else {
          interaction.reply({ embeds: [deletedEmbed2] });
        }

        reactionDB.Tag.splice(i, 1);
        reactionDB.Channel.splice(i, 1);
        reactionDB.Word.splice(i, 1);
        reactionDB.Emoji.splice(i, 1);
        return await reactionDB.save();
      }
    }

    return interaction.reply({
      embeds: [noReaction],
      ephemeral: true,
    });
  },
};
