import express from "express";
import UserModel from "../models/User.js";
import SongModel from "../models/Song.js";
import bcrypt from "bcryptjs";
const router = new express.Router();
import jwt from "jsonwebtoken";
import verifyArtist from "../middlewares/auth/auth.js";
import dotenv from "dotenv";
import { uploadAudio } from "../middlewares/upload/file.js";
import {isSongOfArtist} from "../middlewares/auth/artist.js";
import path from "path";
import fs from "fs";
import {
  registerArtist,
  getIndividualArtist,
  loginArtist,
  getArtists,
} from "../controllers/artist.controllers.js";
import {
  deleteSong,
  uploadSong,
} from "../controllers/song.controllers.js";
import Song from "../models/Song.js";

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// register artist
router.post("/artist/register", registerArtist);

// get individual artist info
router.get("/artist/:id", getIndividualArtist);

// get all artists
router.get("/artists", getArtists);

router.post("/artist/login", loginArtist);

// upload song file
router.post(
  "/upload/song",
  verifyArtist,
  uploadAudio.single("audio"),
  uploadSong
);

// delete a individual song of an artist
router.delete("/artist/song/:song_id", verifyArtist, isSongOfArtist, deleteSong)

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
