import express from "express";
import connectDB from "./db/connectDB.js";
import artist_routes from "./routes/artist.routes.js";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // to read env variables

// connecting to the database
const port = process.env.PORT;
const DATABASEURL = process.env.DATABASEURL;
connectDB(DATABASEURL); // connect to the database

// initializing express
const server = express(); // create an instance of express
server.use(cors()); // to allow cross origin requests
// server.use(helmet()); // for security purpose
server.use(express.json()); // for parsing application/json
server.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
server.use("/", artist_routes); // for routing

server.use(express.static("public"));

// starting the server
server.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
