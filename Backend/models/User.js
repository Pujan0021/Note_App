const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        validate: {

            validator: validator.isEmail,
            message: "Invalid email format"
        }

    },
    password: {
        type: String,
        require: true
    }
})
const User = mongoose.model("User", UserSchema);
module.exports = User;
