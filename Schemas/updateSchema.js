const { model, Schema } = require("mongoose");

module.exports = model("updateSchema", new Schema({
    Guild: String
}))