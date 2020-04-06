const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
  label: String,
  colors: [String],
  sounds: [String],
});

const Instrument = mongoose.model("Instrument", InstrumentSchema);
module.exports = Instrument;
