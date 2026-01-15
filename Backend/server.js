const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const router = require("./src/routes/auth.route");
const noteRouter = require("./src/routes/note.route");
const connectToMongoDB = require("./src/config/db");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
import cors from "cors";
import express from "express";
const app = express();


const allowedOrigins = [
    "http://localhost:5173", // local dev
    "https://note-app-frontend-vewt.onrender.com" // deployed frontend
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true // if you’re using cookies/JWT in headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api/auth", router);
app.use("/api/note", noteRouter);
// app.get("/", (req, res) => {
//     res.send("--Note App--");
// });
app.listen(PORT, () => {
    connectToMongoDB();
    console.log("---------   Server Started   ------------ ")
})