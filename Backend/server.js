const express = require("express");
const PORT = 3000;
const app = express();
const cors = require("cors");
const router = require("./routes/auth.route");
const connectToMongoDB = require("./config/db");
// const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", router);
// app.get("/", (req, res) => {
//     res.send("--Note App--");
// });
app.listen(PORT, () => {
    connectToMongoDB();
    console.log("---------   Server Started   ------------ ")
})