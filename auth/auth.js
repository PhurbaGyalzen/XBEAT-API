import jwt from "jsonwebtoken";
import ArtistModel from "../models/Artist.js";
const TOKEN_SECRET = "asdfjakdsfuaunfsadifbaskljvasdfasdf";

const verifyArtist = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, TOKEN_SECRET);
    ArtistModel.find({ _id: data.art_ID })
      .then((result) => {
        req.info = result[0]
        next();
      })
  } catch (error) {
    res.json({ error: "Invalid access" });
  }
};

export default verifyArtist;