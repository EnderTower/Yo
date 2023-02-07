const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    const embed_command_doesnt_exist = new EmbedBuilder()
    .setColor(client.config.embedcolor)
    .setDescription("❌ Cette commande n'existe pas, merci de le signaler le plus rapidement possible aux développeurs.")

    const embed_sub_command_doesnt_exist = new EmbedBuilder()
    .setColor(client.config.embedcolor)
    .setDescription("❌ Cette sous commande n'existe pas, merci de le signaler le plus rapidement possible aux développeurs.")

    const only_available_to_developers = new EmbedBuilder()
    .setColor(client.config.embedcolor)
    .setDescription("❌ Désolé, cette commande n'est accessible qu'aux développeurs.")

    if (!command)
      return interaction.reply({
        embeds: [embed_command_doesnt_exist],
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== "424881707947261952")
      return interaction.reply({
        embeds: [only_available_to_developers],
        ephemeral: true,
      });

      const subCommand = interaction.options.getSubcommand(false);
      if(subCommand) {
        const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
        if(!subCommandFile) return interaction.reply({
          embeds: [embed_sub_command_doesnt_exist],
          ephemeral: true,
        });
        subCommandFile.execute(interaction, client);

      } else command.execute(interaction, client);
  }
}
