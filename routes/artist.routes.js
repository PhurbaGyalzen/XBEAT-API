import express from "express";
import ArtistModel from "../models/Artist.js";
import bcrypt from "bcryptjs";
const router = new express.Router();
import jwt from "jsonwebtoken";
import verifyArtist from "../middlewares/auth/auth.js";
import dotenv from "dotenv";
import {uploadAudio} from "../middlewares/upload/file.js";
import path from "path";
import fs from "fs";
import {
  registerArtist,
  getIndividualArtist,
  deleteArtist,
  loginArtist,
  getArtists,
} from "../controllers/artist.controllers.js";

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;


// register artist
router.post("/artist/register", registerArtist);

// get individual artist info
router.get("/artist/:id", getIndividualArtist);

// get all artists
router.get("/artists", getArtists);

router.delete("/artist/delete/:id", verifyArtist, deleteArtist);

router.post("/artist/login", loginArtist);

// artist profile update

router.put("/artist/profile/update", verifyArtist, (req, res) => {
  const id = req.user._id;
  const newGener = req.body.gener;
  try {
    ArtistModel.updateOne({ _id: id }, { gener: newGener }).then((result) => {
      res.json("updated successfully");
    });
  } catch (error) {
    console.log(error);
  }
});


// upload song file
router.post("/upload/song", uploadAudio.single("audio"), (req, res) => {
  const songFileName = req.file.filename;
  const songFileUrl = `${process.env.SERVER_URL}/stream/song/${songFileName}`;
  console.log(songFileUrl);
  res.json({ songFileUrl });
});



// server audio files from the server
const __dirname = path.resolve();
router.get('/stream/song/:name', (req, res)=>{
  const file = path.resolve(__dirname, '../Ass/upload/song/'+ req.params.name)
  const headers = {
    'Content-Type': 'audio/mpeg',
    'Content-Length': fs.statSync(file).size,
  };
  res.writeHead(200, headers);
  const readStream = fs.createReadStream(file);
  readStream.pipe(res);
})

export default router;
