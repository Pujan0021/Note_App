const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./src/routes/auth.route");
const noteRouter = require("./src/routes/note.route");
const connectToMongoDB = require("./src/config/db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://note-app-frontend-vewt.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", router);
app.use("/api/note", noteRouter);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log("---------   Server Started   ------------ ");
});