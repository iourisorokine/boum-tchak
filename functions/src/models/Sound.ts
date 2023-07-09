import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const SoundSchema = new Schema({
  name: String,
  category: String,
  subCategory: String,
  pitch: String,
  url: String,
});

export const Sound = mongoose.model("Sound", SoundSchema);
