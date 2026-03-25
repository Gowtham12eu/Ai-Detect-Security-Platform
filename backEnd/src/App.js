const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const connectDB = require("./database/connection");
connectDB();

const authRoutes = require("./routes/auth");
const analyzeRoutes = require("./routes/analyze");

app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "✅ Running" });
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});