module.exports = {
  name: "interactionCreate",

  execute(interaction, client) {
    if(!interaction.isStringSelectMenu()) return;
    const { scmenus } = client;
    const { customId } = interaction;
    const scmenu = scmenus.get(customId)

    if(!scmenu) return;

    try{
      scmenu.execute(interaction, client);
    } catch (err) {
      console.log(err);
    }
    
  }
}