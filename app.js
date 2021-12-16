import express from 'express';
import connectDB from './db/connectDB.js';
import web from './routes/web.js'
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || "3000"
const DATABASEURL = "mongodb://localhost:27017"

connectDB(DATABASEURL);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/", web);

app.listen(port, ()=>{
    console.log(`Server run at http://localhost:${port}`)
})