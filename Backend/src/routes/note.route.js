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
            note: newNote,
            message: "Note created Successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error adding a note!" });
    }
})
router.get("/notes", authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        return res.status(200).json({ success: true, notes })
    } catch (error) {
        return res.status(500).json({ success: false, messsage: "Cannot Retrieve Note" })
    }
})
router.put("/update/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const updateNote = await Note.findByIdAndUpdate(id, req.body);
        return res.status(201).json({ success: true, updateNote })
    } catch (error) {
        return res.status(500).json({ success: false, messsage: "Cannot Update Note" })
    }
})
router.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const updateNote = await Note.findByIdAndDelete(id, req.body);
        return res.status(201).json({ success: true, message: "Note deleted successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, messsage: "Cannot Update Note" })
    }
})
router.get("/auth/check", authMiddleware, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ authenticated: false, message: "Not authenticated" });
    }

    try {
        return res.status(200).json({
            authenticated: true,
            user: {
                id: req.user.id,
                name: req.user.name,
            },
        });
    } catch (error) {
        return res.status(500).json({ authenticated: false, message: "Auth check failed" });
    }
});
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.status(200).json({ message: "Logged out successfully" });
});
module.exports = router;

