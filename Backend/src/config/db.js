const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongoDB = async () => {
    const CONN_STR = process.env.CONN_STR;
    try {
        if (!CONN_STR) {
            console.log("CONN_STR is not found")
        }

        await mongoose.connect(CONN_STR);
        console.log("DataBase Connected SuccessFully");
    } catch (err) {
        console.log("Error Occured connecting Database", err);
        process.exit(1);
    }
}

module.exports = connectToMongoDB;