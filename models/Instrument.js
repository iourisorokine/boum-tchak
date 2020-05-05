const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  category: String,
  subCategory: String,
  sounds: [
    { 
      name: String, 
      color: String, 
      url: String }
    ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  private: Boolean,
});

const Instrument = mongoose.model("Instrument", InstrumentSchema);
module.exports = Instrument;
