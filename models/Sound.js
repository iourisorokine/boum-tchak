const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SoundSchema = new Schema({
  name: String,
  link: String,
});

const Sound = mongoose.model("Name", SoundSchema);
module.exports = Sound;
