import express from "express";
import UserModel from "../models/User.js";
import SongModel from "../models/Song.js";
import bcrypt from "bcryptjs";
const router = new express.Router();
import jwt from "jsonwebtoken";
import verifyArtist from "../middlewares/auth/auth.js";
import dotenv from "dotenv";
import { uploadAudio, uploadImage } from "../middlewares/upload/file.js";
import { isSongOfArtist } from "../middlewares/auth/artist.js";
import path from "path";
import fs from "fs";
import {
  registerArtist,
  getIndividualArtist,
  loginArtist,
  getArtists,
  getOwnInfo,
  uploadProfile,
} from "../controllers/artist.controllers.js";
import { deleteSong, uploadSong } from "../controllers/song.controllers.js";
import Song from "../models/Song.js";

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// register artist
router.post("/artist/register", registerArtist);

// get own artist info
router.get("/artist", verifyArtist, getOwnInfo);

// get individual artist info
router.get("/artist/:id", getIndividualArtist);

// get all artists
router.get("/artists", getArtists);

router.post("/artist/login", loginArtist);

// upload song file
router.post(
  "/upload/song",
  verifyArtist,
  uploadAudio.fields([
    {
      name: "audio",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  uploadSong
);

// update profile picture
router.patch(
  "/artist/profile",
  verifyArtist,
  uploadImage.single("image"),
  uploadProfile
);

// delete a individual song of an artist
router.delete(
  "/artist/song/:song_id",
  verifyArtist,
  isSongOfArtist,
  deleteSong
);

// get all songs of an artist
router.get("/artist/songs/:username", async (req, res) => {
  try {
    const artist = await UserModel.findOne({ username: req.params.username });
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }
    const songs = await Song.find({ artist: artist._id });
    res.status(200).json({
      message: "Songs found successfully",
      artist_name: artist.username,
      songs: songs,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get own songs
router.get("/songs", verifyArtist, async (req, res) => {
  try {
    const artist = await UserModel.findOne({ _id: req.user._id });
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }
    const songs = await Song.find({ artist: artist._id });
    res.status(200).json({
      message: "Songs found successfully",
      artist_name: artist.username,
      songs: songs,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// serve audio files from the server
const __dirname = path.resolve();
router.get("/stream/song/:name", (req, res) => {
  const file = path.resolve(__dirname, "../Ass/upload/song/" + req.params.name);
  try {
    const headers = {
      "Content-Type": "audio/mp3",
      "Content-Length": fs.statSync(file).size,
      "Content-Disposition": `attachment; filename="${req.params.name}"`,
      "Accept-Ranges": "bytes",
      Connection: "keep-alive",
    };
    res.writeHead(200, headers);
    const readStream = fs.createReadStream(file);
    readStream.pipe(res);
  } catch (err) {
    res.writeHead(404);
    res.end("File not found");
  }
});

export default router;
