import express from "express";
import ArtistModel from "../models/Artist.js";
import bcrypt from "bcryptjs";
const router = new express.Router();
import jwt from "jsonwebtoken";
import verifyArtist from "../middlewares/auth/auth.js";
import dotenv from "dotenv";
import {
  registerArtist,
  getIndividualArtist,
  deleteArtist,
  loginArtist,
  getArtists,
} from "../controllers/artist.controllers.js";

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

console.log(TOKEN_SECRET);

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

// stream songs

export default router;
