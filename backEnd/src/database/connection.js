const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        console.log("Connecting to:", uri);
        await mongoose.connect(uri);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;