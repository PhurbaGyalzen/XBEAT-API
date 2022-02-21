import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
  },
  url: {
    type: String,
    required: true,
  },
  thumbnail : {
    type: String,
    required: true,
    default: "images/thumbnail/default-thumbnail.png"
  },
  description: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Song = mongoose.model("Song", songSchema);

export default Song;
