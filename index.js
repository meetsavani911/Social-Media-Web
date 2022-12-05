import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from "./Routes/UploadRoute.js";

// Routes  <<<<<

const app = express();

// to serve images for public
app.use(express.static('public'));
app.use('images' , express.static("images"));

// servin frontend -----ABHISHEK MAURYA youtube for deploye

import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/build")));



app.get("*" , function(_, res){
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function(err){
            res.status(500).send(err);
        }
    );
});

// middleware  <<<<<
app.use(
    bodyParser.json({
        limit: "30mb",
        extended: true,
    })
);
app.use(
    bodyParser.urlencoded({
        limit: "30mb",
        extended: true,
    })
);
app.use(cors());

dotenv.config();
// --------------------------------
// mongoose
//     .connect(process.env.MONGO_DB, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() =>
//         app.listen(process.env.PORT||5000, () =>
//             console.log(`listening on port ${process.env.PORT}`)
//         )
//     )
//     .catch((error) => console.log(error));
// change------------------------------------------------
    const connectDB = async () => {
        try {
          const conn = await mongoose.connect(process.env.MONGO_DB);
          console.log(`MongoDB Connected: ${conn.connection.host}`);
        } catch (error) {
          console.log(error);
          process.exit(1);
        }
      }

      connectDB().then(() => {
        app.listen(process.env.PORT, () => {
            console.log("listening for requests on port-----");
        })
    })

// change-------------------------^^^

// usage of routes  <<<<<

app.use("/auth", AuthRoute);
app.use('/user', UserRoute);
app.use('/post' , PostRoute);
app.use('/upload' , UploadRoute);
