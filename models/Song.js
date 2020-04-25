const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: String,
  partition: [[Number]],
  instruments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Instrument",
    },
  ],
  tempo: Number,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  notes:[String],
  creatorName: String,
  posted: Boolean,
});

const Song = mongoose.model("Song", SongSchema);
module.exports = Song;
