const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowed = [".txt", ".log", ".pdf", ".doc", ".docx"];
    const ext = "." + file.originalname.split(".").pop().toLowerCase();
    if (allowed.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("File type not allowed"), false);
    }
};

module.exports = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});