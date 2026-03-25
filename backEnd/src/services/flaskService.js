const axios = require("axios");

const FLASK_URL = "http://127.0.0.1:5000";

module.exports = {
    callFlask: async function(inputType, content, options = {}) {
        try {
            const response = await axios.post(`${FLASK_URL}/analyze`, {
                input_type: inputType,
                content: content,
                options: options
            }, { timeout: 30000 });
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.message;
            console.error("❌ Flask Error:", errorMsg);
            throw new Error(`AI Engine Error: ${errorMsg}`);
        }
    }
};