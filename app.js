import express from "express";
import connectDB from "./db/connectDB.js";
import web from "./routes/web.js";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config(); // to read env variables

// connecting to the database
const port = process.env.PORT;
const DATABASEURL = process.env.DATABASEURL;
connectDB(DATABASEURL); // connect to the database

// initializing express
const app = express(); // create an instance of express
app.use(cors()); // to allow cross origin requests
app.use(helmet()); // for security purpose
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/", web); // for routing

// starting the server
app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
