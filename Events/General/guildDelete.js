const db = require("../../Schemas/reactionsSchema");

module.exports = {
  name: "guildDelete",
  async execute(guild) {
    
    const reactionDB = await db.findOne({ Guild: guild.id });
    if(reactionDB) {
        await reactionDB.delete();
    }
  },
};
