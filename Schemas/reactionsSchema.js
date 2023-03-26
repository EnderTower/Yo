const { model, Schema } = require("mongoose");

module.exports = model("reactionsSchema", new Schema({
    Guild: String,
    Word: Array,
    Tag: Array,
    Emoji: Array,
    Channel: Array,
}))