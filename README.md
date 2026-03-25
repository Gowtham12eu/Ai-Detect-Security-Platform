# 🔐 AI Secure Data Intelligence Platform

> AI-powered security platform that detects sensitive data, API keys, passwords, and security risks from multiple input sources.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js + Tailwind CSS |
| Backend | Node.js + Express |
| AI Engine | Flask + Gemini AI |
| Database | MongoDB |
| Auth | JWT |

---

## 📁 Project Structure
```
ai-secure-platform/
├── frontend/          # Next.js + Tailwind CSS
├── backend/           # Node.js + Express + JWT
├── ai-engine/         # Flask + Gemini AI
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Project
```bash
git clone https://github.com/Gowtham12eu/Ai-Detect-Security-Platform.git
cd Ai-Detect-Security-Platform
```

### 2️⃣ Setup AI Engine (Flask)
```bash
cd ai-engine
pip install -r requirements.txt
```
Create `.env` file:
```
GEMINI_API_KEY=your_gemini_api_key_here
```
> ⚠️ Without your Gemini API key, AI insights will not work.

Run:
```bash
python app.py
```

### 3️⃣ Setup Backend (Node.js)
```bash
cd backend
npm install
```
Create `.env` file:
```
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb://localhost:27017/ai_secure_db
PORT=4000
```
Run:
```bash
npm start
```

### 4️⃣ Setup Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Running All Servers

| Terminal | Command | Port |
|---|---|---|
| Terminal 1 | `python app.py` | 5000 |
| Terminal 2 | `npm start` | 4000 |
| Terminal 3 | `npm run dev` | 3000 |

Open browser → `http://localhost:3000`

---

## ⚡ Dev Launcher (Windows)

Run all servers at once:
```powershell
PS C:\Users\ELCOT\Desktop\AiDetect> ./start-all.bat
```

---

## ✨ Key Features

- ✅ Multi-input support (Text, File, Log, SQL, Chat)
- ✅ Password strength detection
- ✅ API key exposure detection
- ✅ JWT token detection
- ✅ Stack trace leak detection
- ✅ Brute force pattern detection
- ✅ AI-powered insights via Google Gemini
- ✅ Risk scoring (Low / Medium / High / Critical)
- ✅ Auto masking and blocking of sensitive data
- ✅ User authentication using JWT
- ✅ MongoDB-based result storage
- ✅ Fully responsive UI (Mobile & Desktop)

---

## 📂 Supported Input Types

| Input Type | Description |
|---|---|
| Text | Paste any raw text directly |
| File Upload | Supports PDF, DOC, TXT |
| Log Files | Analyze .log or .txt files |
| SQL Queries | Paste database queries for detection |
| Chat Mode | Real-time message analysis |

---

## 🎯 Risk Levels

| Level | Score | Action |
|---|---|---|
| 🟢 Low | 0 – 3 | Allowed |
| 🟡 Medium | 4 – 7 | Mask sensitive data |
| 🔴 High | 8 – 12 | Block request |
| 🚨 Critical | 13+ | Block + Trigger alert |

---

## 🔍 Detection Patterns

| Pattern | Risk Level |
|---|---|
| Passwords | 🚨 Critical |
| Hardcoded secrets | 🚨 Critical |
| API Keys | 🔴 High |
| JWT Tokens | 🔴 High |
| OpenAI Keys | 🔴 High |
| AWS Keys | 🔴 High |
| Stack Traces | 🟡 Medium |
| IP Addresses | 🟡 Medium |
| Debug Mode flags | 🟡 Medium |
| Emails | 🟢 Low |
| Phone numbers | 🟢 Low |

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### Analysis
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/analyze/text` | Analyze text input |
| POST | `/api/analyze/file` | Analyze uploaded file |
| GET | `/api/analyze/history` | Fetch analysis history |

---

## 📊 Marks Distribution

| Section | Marks |
|---|---|
| Backend Design | 18 |
| AI Integration | 15 |
| Log Analysis | 15 |
| Multi-Input Handling | 12 |
| Detection Engine | 12 |
| Frontend UI | 10 |
| Security | 5 |
| Others | 13 |
| **Total** | **100** |

---

## 💡 Example Use Case

**Input:**
```
email=admin@company.com
password=admin123
api_key=sk-prod-xyz789
ERROR: NullPointerException at service.java:45
```

**Output:**
```json
{
  "risk_score": 15,
  "risk_level": "critical",
  "action": "block",
  "findings": [
    { "type": "email",       "risk": "low",      "line": 1 },
    { "type": "password",    "risk": "critical",  "line": 2 },
    { "type": "api_key",     "risk": "high",      "line": 3 },
    { "type": "stack_trace", "risk": "medium",    "line": 4 }
  ],
  "summary": "Critical credentials exposed. Immediate action required."
}
```

---

## 👨‍💻 Built For

> 🏆 Hackathon — AI Secure Data Intelligence Platform

---

## 📜 License

MIT License — Free to use and modify.
