const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema(
  {
    title: String,
    partition: [[Number]],
    instruments: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Instrument" 
    }],
    tempo: Number
  },
);

const Song = mongoose.model("Song", SongSchema);
module.exports = Song;