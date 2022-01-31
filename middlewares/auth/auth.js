import jwt from "jsonwebtoken";
import UserModel from "../../models/User.js";
import dotenv from "dotenv";
dotenv.config(); // to read env variables
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// isArtist
const verifyArtist = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, TOKEN_SECRET);
    const user = await UserModel.find({ _id: data.id });
    console.log(user);
    if (user[0].role === "artist") {
      req.user = user[0];
      next();
    } else {
      res.json({ error: "You are not an artist" });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

// isUser
const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, TOKEN_SECRET);
    const user = await UserModel.find({ _id: data.user_ID });
    if (user[0].role === "user") {
      req.user = user[0];
      next();
    } else {
      res.json({ error: "You are not a user" });
    }
  } catch (error) {
    res.json({ error: "Invalid access" });
  }
};

// isAdmin
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, TOKEN_SECRET);
    const user = await UserModel.find({ _id: data.user_ID });
    if (user[0].role === "admin") {
      req.user = user[0];
      next();
    } else {
      res.json({ error: "You are not an admin" });
    }
  } catch (error) {
    res.json({ error: "Invalid access" });
  }
};

export default verifyArtist;
