const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const express = require("express");
const router = express.Router();
const flaskService = require("../services/flaskService");
const AnalysisResult = require("../database/models/AnalysisResult");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/fileHandler");

router.post("/text", authMiddleware, async (req, res) => {
    try {
        const { input_type, content } = req.body;
        if (!content)
            return res.status(400).json({ error: "Content is required" });
        console.log("📩 Received:", input_type, content.slice(0, 50));
        const result = await flaskService.callFlask(input_type || "text", content, {});
        console.log("✅ Flask Result:", result);
        await AnalysisResult.create({
            userId: req.user.userId,
            input_type: input_type || "text",
            content,
            findings: result.findings,
            risk_score: result.risk_score,
            risk_level: result.risk_level,
            action: result.action,
            summary: result.summary,
            insights: result.insights || []
        });
        res.json(result);
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

router.post("/file", authMiddleware, upload.single("file"), async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: "File is required" });
        const content = req.file.buffer.toString("utf-8");
        const input_type = req.body.input_type || "file";
        console.log("📁 File received:", req.file.originalname);
        const result = await flaskService.callFlask(input_type, content, {
            log_analysis: true,
            mask: true,
            block_high_risk: true
        });
        console.log("✅ Flask Result:", result);
        await AnalysisResult.create({
            userId: req.user.userId,
            input_type,
            content,
            findings: result.findings,
            risk_score: result.risk_score,
            risk_level: result.risk_level,
            action: result.action,
            summary: result.summary,
            insights: result.insights || []
        });
        res.json(result);
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

router.get("/history", authMiddleware, async (req, res) => {
    try {
        const history = await AnalysisResult.find({ userId: req.user.userId })
            .sort({ timestamp: -1 })
            .limit(20)
            .select("-content");
        res.json(history);
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;