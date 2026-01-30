@echo off
cd /d "%~dp0"
if not exist "backend\node_modules" (
  echo Installing backend dependencies...
  cd backend
  call npm install
  cd ..
  echo.
)
if not exist "backend\db\fashionz.db" (
  echo Seeding database...
  cd backend
  call npm run seed
  cd ..
  echo.
)
echo Starting Fashionz at http://localhost:5000
echo Press Ctrl+C to stop.
node backend\server.js
pause
