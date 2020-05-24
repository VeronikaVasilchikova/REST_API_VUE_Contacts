const {Schema, model} = require("mongoose");

const contacts = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  marked: Boolean
});

module.exports = model("contacts", contacts);