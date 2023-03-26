module.exports = {
  name: "interactionCreate",

  execute(interaction, client) {
    if(!interaction.isButton) return;
    const { buttons } = client;
    const { customId } = interaction;
    const button = buttons.get(customId)

    if(!button) return;

    try{
      button.execute(interaction, client);
    } catch (err) {
      console.log(err);
    }
    
  }
}