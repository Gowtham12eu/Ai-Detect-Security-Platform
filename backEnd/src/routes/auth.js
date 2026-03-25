const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ error: "All fields required" });

        if (password.length < 6)
            return res.status(400).json({ error: "Password min 6 characters" });

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ error: "Email already exists" });

        const user = await User.create({ name, email, password });
        res.status(201).json({ message: "Registered successfully", userId: user._id });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ error: "Email and password required" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign(
            { userId: user._id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token, name: user.name, email: user.email });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;