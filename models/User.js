import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"] // hide password from query
  },
  firstName: {
    type: String,
    required: false,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isAlpha(value);
      },
      message: function () {
        return "First name must be alphabetic";
      }
  }},
  gener : {
    type: String,
    required: false,
    validate: {
      validator: function (value) {
        return validator.isAlpha(value);
      },
      message: function () {
        return "Gener must be alphabetic";
      }
  }},
  lastName: {
    type: String,
    required: false,
  },
  profile: {
    type: String,
    required: true,
    default : "images/default-profile.jpg"
  },
  description: {
    type: String,
    required: true,
    default : ""
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
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'user', 'artist'],
    validate: {
      validator: function(value) {
        return value == 'admin' || value == 'user' || value == 'artist';
      },
      message: function() {
        return "Role must be admin, user or artist";
      }
    }
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
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
