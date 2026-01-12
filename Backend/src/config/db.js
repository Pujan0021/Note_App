const mongoose = require("mongoose");
const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://pujanpandey0071_db_user:7groxOVZy6Vv039O@chatloop.ivrozy4.mongodb.net/?appName=Note_App");
        console.log("DataBase Connected SuccessFully");
    } catch (err) {
        console.log("Error Occured connecting Database", err);
    }
}
//Mongo_URI = "mongodb+srv://pujanpandey0071_db_user:7groxOVZy6Vv039O@chatloop.ivrozy4.mongodb.net/?appName=ChatLoop"

module.exports = connectToMongoDB;