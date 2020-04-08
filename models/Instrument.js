const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  colors: [String],
  sounds: [String],
});

const Instrument = mongoose.model("Instrument", InstrumentSchema);
module.exports = Instrument;
