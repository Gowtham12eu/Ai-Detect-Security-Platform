🔐 AI Secure Data Intelligence Platform
AI-powered security platform that detects sensitive data, API keys, passwords, and security risks from multiple input sources.

🚀 Tech Stack
Layer	Technology
Frontend	Next.js + Tailwind CSS
Backend	Node.js + Express
AI Engine	Flask + Gemini AI
Database	MongoDB
Auth	JWT
📁 Project Structure
ai-secure-platform/ ├── frontend/ # Next.js ├── backend/ # Node.js + Express ├── ai-engine/ # Flask + Gemini AI └── README.md
⚙️ Installation & Setup
🚀 Getting Started 1️⃣ Clone the Project bashgit clone https://github.com/Gowtham12eu/Ai-Detect-Security-Platform.git cd Ai-Detect-Security-Platform

2️⃣ Setup AI Engine (Flask) bashcd ai-engine pip install -r requirements.txt Create a .env file: envGEMINI_API_KEY=your_gemini_api_key_here

⚠️ Without your Gemini API key, the AI engine will not work.

Run the server: bashpython app.py

3️⃣ Setup Backend (Node.js) bashcd backend npm install Create a .env file: envJWT_SECRET=your_jwt_secret_key MONGO_URI=mongodb://localhost:27017/ai_secure_db PORT=4000 Run the server: bashnpm start

4️⃣ Setup Frontend (Next.js) bashcd frontend npm install npm run dev

🌐 Running All Servers TerminalCommandPortTerminal 1python app.py5000Terminal 2npm start4000Terminal 3npm run dev3000 Open your browser → http://localhost:3000

⚡ Dev Launcher (Windows) Run all servers at once using the batch script: powershellPS C:\Users\ELCOT\Desktop\AiDetect> ./start-all.bat

✨ Key Features

Multi-input support: Text, File, Log, SQL, Chat Password strength detection API key exposure detection JWT token detection Stack trace leak detection Brute force pattern detection AI-powered insights (Google Gemini) Risk scoring system (Low / Medium / High / Critical) Auto masking and blocking of sensitive data User authentication using JWT MongoDB-based result storage Fully responsive UI (Mobile & Desktop)

📂 Supported Input Types Input TypeDescriptionTextPaste any raw text directlyFile UploadSupports PDF, DOC, TXTLog FilesAnalyze .log or .txt filesSQL QueriesPaste database queries for detectionChat ModeReal-time message analysis

🎯 Risk Levels LevelScoreAction🟢 Low0–3Allowed🟡 Medium4–7Mask sensitive data🔴 High8–12Block request🚨 Critical13+Block + Trigger alert

🔍 Detection Patterns PatternRisk LevelPasswords🚨 CriticalHardcoded secrets🚨 CriticalAPI Keys🔴 HighJWT Tokens🔴 HighOpenAI Keys🔴 HighAWS Keys🔴 HighStack Traces🟡 MediumIP Addresses🟡 MediumDebug Mode flags🟡 MediumEmails🟢 LowPhone numbers🟢 Low

📡 API Endpoints Authentication MethodEndpointDescriptionPOST/api/auth/registerRegister userPOST/api/auth/loginLogin user Analysis MethodEndpointDescriptionPOST/api/analyze/textAnalyze text inputPOST/api/analyze/fileAnalyze uploaded fileGET/api/analyze/historyFetch analysis history

💡 Example Use Case Input: email=admin@company.com password=admin123 api_key=sk-prod-xyz789 ERROR: NullPointerException at service.java:45 Output: json{ "risk_score": 15, "risk_level": "critical", "action": "block", "findings": [ { "type": "email", "risk": "low", "line": 1 }, { "type": "password", "risk": "critical", "line": 2 }, { "type": "api_key", "risk": "high", "line": 3 }, { "type": "stack_trace", "risk": "medium", "line": 4 } ], "summary": "Critical credentials exposed. Immediate action required." }