@echo off
echo ============================================
echo  Starting All Services
echo ============================================
echo.

echo [1/3] Starting Backend API (port 4000)...
cd /d "%~dp0backEnd"
start "Backend API" cmd /k "node src/App.js"

timeout /t 3 /nobreak >nul

echo [2/3] Starting AI Engine (port 5000)...
cd /d "%~dp0ai-engine"
start "AI Engine" cmd /k "python app.py"

timeout /t 3 /nobreak >nul

echo [3/3] Starting Frontend (port 3000)...
cd /d "%~dp0frontEnd\projectapp"
start "Frontend" cmd /k "npx next dev -p 3000"

echo.
echo ============================================
echo  All services started!
echo  - Frontend:   http://localhost:3000
echo  - Backend:    http://localhost:4000
echo  - AI Engine:  http://localhost:5000
echo ============================================
pause
