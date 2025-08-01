@echo off
echo ===========================================
echo   🚀 Active Recaller - Quick Deploy
echo ===========================================
echo.

echo Building the app...
call npm run build

echo.
echo ✅ Build complete! 
echo.
echo Choose your deployment option:
echo.
echo 1. Netlify (Recommended - drag dist folder to netlify.com)
echo 2. Install Netlify CLI and auto-deploy
echo 3. Install Vercel CLI and auto-deploy
echo 4. Open local preview
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo 📁 Opening dist folder...
    explorer "dist"
    echo.
    echo 🌐 Opening Netlify...
    start https://netlify.com
    echo.
    echo 👆 Drag the dist folder to the Netlify deployment area!
)

if "%choice%"=="2" (
    echo.
    echo Installing Netlify CLI...
    call npm install -g netlify-cli
    echo.
    echo Deploying to Netlify...
    call netlify deploy --prod --dir=dist
)

if "%choice%"=="3" (
    echo.
    echo Installing Vercel CLI...
    call npm install -g vercel
    echo.
    echo Deploying to Vercel...
    call vercel --prod
)

if "%choice%"=="4" (
    echo.
    echo Starting local preview...
    call npm run preview
)

echo.
echo ✨ Deployment process completed!
pause
