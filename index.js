const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, GuildPresences, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { connect, set } = require("mongoose");

const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    MessageContent,
  ],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();
client.buttons = new Collection();
client.scmenus = new Collection();

set('strictQuery', true);
connect(client.config.mongoUri, {dbName: "Yo"}).then(() => console.log("Successfully connected to the MongoDB database."))

const { loadEvents } = require("./Handlers/eventHandler");

const { loadButtons } = require("./Handlers/buttonHandler");

const { loadSCMenus } = require("./Handlers/scrollMenuHandler");

loadEvents(client);

loadButtons(client);

loadSCMenus(client);

client.login(client.config.token);