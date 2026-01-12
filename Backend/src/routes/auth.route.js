const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, "ThisIsaSecret", { expiresIn: "5h" });

        return res.status(200).json({
            success: true,
            token,
            name: newUser.name,
            message: "Account Created Successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed creating an account!" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        console.log("LogIn Credits:", req.body)
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Existed" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ success: false, message: "Wrong Credentials" });
        }

        const token = jwt.sign({ id: user._id }, "ThisIsaSecret", { expiresIn: "5h" });

        return res.status(200).json({
            success: true,
            token,
            name: user.name,
            message: "Login Successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error logging in" });
    }
});

module.exports = router;