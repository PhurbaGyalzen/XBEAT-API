import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// Get all artists
export const getArtists = async (req, res) => {
  try {
    const artists = await User.find({ role: "artist" });
    res.json(artists);
  } catch (error) {
    console.log(error);
  }
};

// login artist
export const loginArtist = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const artist = await User.findOne({ username });
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, artist.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid password" });
      return;
    }
    const token = jwt.sign({ id: artist._id }, TOKEN_SECRET);
    res.status(200).json({
      message: "Artist logged in successfully",
      token: token,
      role: artist.role,
      user_id: artist._id,

    });
  } catch (error) {
    console.log(error);
  }
};

// upload profile picture
export const uploadProfile = async (req, res) => {
  try {
    console.log(req.file);
    const profileImageFileName = req.file.filename;
    const profileFileUrl = `images/profile/${profileImageFileName}`
    const artist = await User.findById(req.user._id);
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }
    // overwrite the profile image
    const result = await User.findByIdAndUpdate(artist._id, { profile: profileFileUrl });
    // console.log(result);
    res.status(200).json({
      message: "Profile image uploaded successfully",
      profile_image: profileFileUrl,
      statusCode: 200,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Get Individual artist
export const getIndividualArtist = async (req, res) => {
  try {
    const artist = await User.findById(req.params.id, { password: 0 });
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }
    res.status(200).json({
      message: "Artist info",
      artist: artist,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Get own artist info
export const getOwnInfo = async (req, res) => {
  try {
    const artist = await User.findById(req.user._id, { password: 0 });
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }
    res.status(200).json({
      message: "Artist info",
      artist: artist,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Register Artist
export const registerArtist = async (req, res) => {
  try {
    const artist = await User.findOne({ username: req.body.username });
    if (artist) {
      res.status(400).json({ error: "Artist already exists" });
      return;
    }
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newArtist = await User.create({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: "artist",
    });
    const token = jwt.sign({ id: newArtist._id }, TOKEN_SECRET);
    res.status(201).json({
      message: "Artist registered successfully",
      artist: newArtist,
      token: token,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

