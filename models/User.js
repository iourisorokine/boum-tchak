const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Song = require("./Song");
const Instrument = require("./Instrument");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
