const db = require("../../Schemas/reactionsSchema");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const reactionDB = await db.findOne({Guild: message.guild.id})
    if(!reactionDB) return;
    for(let i = 0; i < reactionDB.Word.length; i++) {
        const emojiRegex = /\p{Emoji}/u;
        let word;
        if(typeof reactionDB.Word[i] === "string") {
            word = reactionDB.Word[i].toLowerCase();
        } else {
          word = false;
        }

        if(emojiRegex.test(reactionDB.Emoji[i]) == false) return;
        if((word == false || message.content.toLowerCase().split(" ").includes(word)) && (message.channel.id == reactionDB.Channel[i] || reactionDB.Channel[i] == "ALL") ) {
          message.react(reactionDB.Emoji[i]).catch(err => {});
        }
    }
  },
};
