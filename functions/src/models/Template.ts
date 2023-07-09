import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const NameSchema = new Schema({
  key: String,
});

export const Name = mongoose.model("Name", NameSchema);
