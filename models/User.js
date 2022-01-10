import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
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
  likedSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  isAdmin: {
    type: Boolean,
    required: true,
    default: false, // default value
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false, // default value
  },
  playList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayList",
      required: false, // default value
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
