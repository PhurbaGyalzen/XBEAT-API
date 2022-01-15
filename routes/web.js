import express from "express";
import ArtistModel from "../models/Artist.js";
import bcrypt from "bcryptjs";
const router = new express.Router();
import jwt from "jsonwebtoken";
import verifyArtist from "../middlewares/auth/auth.js";
import dotenv from "dotenv";

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

console.log(TOKEN_SECRET);

// register artist
router.post("/artist/register", async (req, res) => {
  try {
    const username = req.body.username;
    const artistData = await ArtistModel.findOne({ username: username });
    if (artistData != null) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }
    const password = req.body.password;
    const hashed_pw = await bcrypt.hash(password, 10);
    const artist = await ArtistModel.create({
      username: req.body.username,
      name: req.body.name,
      password: hashed_pw,
      profile: req.body.profile,
      gener: req.body.gener,
    });
    res.status(201).json({
      message: "Artist registered successfully",
      artist: artist._id,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get individual artist info
router.get("/artist/:id", async (req, res) => {
  try {
    const artist = await ArtistModel.findById(req.params.id, { password: 0 });
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
});

router.delete("/artist/delete", verifyArtist, (req, res) => {
  console.log(req.id);
  res.json({ message: "document deleted!!!" });
});

router.post("/artist/login", (req, res) => {
  const username = req.body.username;
  ArtistModel.findOne({ username: username }).then((artistData) => {
    if (artistData == null) {
      res.json({ message: "Artist doesn't exits." });
      return;
    }
    const password = req.body.password;
    bcrypt.compare(password, artistData.password, (e, result) => {
      if (result) {
        const token = jwt.sign({ art_ID: artistData._id }, TOKEN_SECRET, {
          expiresIn: 60 * 60,
        });
        res.json({ jwt: token });
      }
    });
  });
});

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

// stream songs

export default router;
