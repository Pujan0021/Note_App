const express = require("express");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
router.post("/add", authMiddleware, async (req, res) => {
    try {

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Title and Description are required" });
        }


        const newNote = new Note({ title, description, userId: req.user.id });
        await newNote.save();
        return res.status(200).json({
            success: true,
            user: {
                name: req.user.name,
            },
            message: "Note created Successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error adding a note!" });
    }
})


module.exports = router;
