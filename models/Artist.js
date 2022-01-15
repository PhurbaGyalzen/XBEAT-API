import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gener: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isBlocked: {
    type: Boolean,
    required: true,
    default: false, // default value
  },
});

const Artist = mongoose.model("Artist", artistSchema);

export default Artist;
