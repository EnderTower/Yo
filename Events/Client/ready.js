const { loadCommands } = require("../../Handlers/commandHandler");
const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Logged in as ${client.user.tag}.`);

    client.user.setPresence({
      activities: [
        { name: `${client.config.presenceText}`, type: ActivityType.Listening },
      ],
      status: "online",
    });
    loadCommands(client);
  },
};
