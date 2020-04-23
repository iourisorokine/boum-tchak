const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SoundSchema = new Schema({
  name: String,
  category: String,
  subCategory: String,
  url: String,
});

const Sound = mongoose.model("Sound", SoundSchema);
module.exports = Sound;
