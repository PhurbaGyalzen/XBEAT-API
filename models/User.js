import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isAlphanumeric(value);
      },
      message: function () {
        return "Password must be alphanumeric";
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: function () {
        return "Email is invalid";
      }
    }
  },
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isAlpha(value);
      },
      message: function () {
        return "First name must be alphabetic";
      }
  }},
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
  role: {
    type: Boolean,
    required: true,
    default: 'user',
    enum: ['admin', 'user', 'artist'],
    validate: {
      validator: (value) => {
        return value == 'admin' || value == 'user' || value == 'artist';
      }
  },
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
