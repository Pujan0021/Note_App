const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {

            validator: validator.isEmail,
            message: "Invalid email format"
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
},)
const User = mongoose.model("Note_App_User ", UserSchema);
module.exports = User;
