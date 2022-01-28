import jwt from "jsonwebtoken";
import ArtistModel from "../../models/Artist.js";
import UserModel from "../../models/User.js";


const TOKEN_SECRET = process.env.TOKEN_SECRET

const verifyArtist = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, TOKEN_SECRET);
    ArtistModel.find({ _id: data.art_ID })
      .then((result) => {
        req.user = result[0]
        next();
      })
  } catch (error) {
    res.json({ error: "Invalid access" });
  }
};

// isArtist
const isArtist = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, TOKEN_SECRET);
    const artist = await ArtistModel.find({ _id: data.art_ID });
    if (artist.length === 0) {
      res.json({ error: "Invalid access" });
      return;
    }
    next();
  } catch (error) {
    res.json({ error: "Invalid access" });
  }
};

// isUser
const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, TOKEN_SECRET);
    const user = await UserModel.find({ _id: data.user_ID });
    if (user.length === 0) {
      res.json({ error: "Invalid access" });
      return;
    }
    next();
  } catch (error) {
    res.json({ error: "Invalid access" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, TOKEN_SECRET);
    const user = await UserModel.find({ _id: data.user_ID });
    if (user.length === 0) {
      res.json({ error: "Invalid access" });
      return;
    }
    if (user[0].role !== "admin") {
      res.json({ error: "Invalid access" });
      return;
    }
    next();
  } catch (error) {
    res.json({ error: "Invalid access" });
  }
};




export default verifyArtist;