import express from "express";
import ArtistModel from "../models/Artist.js";
import bcrypt from "bcryptjs";
const router = new express.Router();
import jwt from "jsonwebtoken";
import verifyArtist from "../auth/auth.js";
const TOKEN_SECRET = "asdfjakdsfuaunfsadifbaskljvasdfasdf";

// route for artist
router.post("/artist/register", (req, res) => {
  const username = req.body.username;
  ArtistModel.findOne({ username: username }).then((artistData) => {
    if (artistData != null) {
      res.json({ message: "Username already exisits" });
      return;
    }
    const password = req.body.password;
    bcrypt.hash(password, 10, (e, hashed_pw) => {
      ArtistModel.create({
        username: req.body.username,
        name: req.body.name,
        password: hashed_pw,
        gener: req.body.gener,
      })
        .then(() =>
          res.json({
            message: `${req.body.username} artist registered successfully.`,
          })
        )
        .catch((e) => res.json(e));
    });
  });
});

router.get("/artist", (req, res) => {
  const result = ArtistModel.find((e, docs) => {
    if (!e) {
      res.json(docs);
    } else {
      res.send(e);
    }
  });
});

router.delete("/artist/delete", verifyArtist, (req, res) => {
    console.log(req.art_ID)
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

export default router;
