const express = require("express");
const cookieParser = require("cookie-parser")
const PORT = 3000;
const app = express();
const cors = require("cors");
const router = require("./src/routes/auth.route");
const noteRouter = require("./src/routes/note.route");
const connectToMongoDB = require("./src/config/db");
// const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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