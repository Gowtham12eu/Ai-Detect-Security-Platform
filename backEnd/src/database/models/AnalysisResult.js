const mongoose = require("mongoose");

const AnalysisResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    input_type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    findings: {
        type: Array,
        default: []
    },
    risk_score: {
        type: Number,
        default: 0
    },
    risk_level: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    insights: {
        type: Array,
        default: []
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const AnalysisResult = mongoose.model("AnalysisResult", AnalysisResultSchema);

module.exports = AnalysisResult;
