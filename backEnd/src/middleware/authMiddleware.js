const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === "null" || token === "undefined") {
        return res.status(401).json({ error: "No token provided or token is invalid" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired. Please login again." });
        }
        return res.status(401).json({ error: "Invalid token. Please login again." });
    }
};

module.exports = authMiddleware;
