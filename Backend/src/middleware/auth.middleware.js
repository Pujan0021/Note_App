const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        console.log(token)
        if (!token) {
            return res.status(401).json({ success: false, message: "No token found" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = { id: user._id, name: user.name };

        next();
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error, please login again" });
    }
};

module.exports = authMiddleware;