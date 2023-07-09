import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePic: { type: String, default: "" },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    customInstruments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Instrument",
      },
    ],
    admin: Boolean,
    musicKarma: Number,
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const User = mongoose.model("User", UserSchema);
