const { Guild } = require("discord.js");
const db = require("../../Schemas/updateSchema");

module.exports = {
  name: "guildCreate",
  /**
   * 
   * @param {Guild} guild 
   * @returns 
   */
  async execute(guild) {

    const updateDatabase = await db.findOne({Guild: guild.id})
    if(!updateDatabase) {
        return await db.create({Guild: guild.id})
    } else return;
    
  },
};
