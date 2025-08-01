#!/usr/bin/env pwsh

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "   🚀 Active Recaller - Quick Deploy" -ForegroundColor Cyan  
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Building the app..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "✅ Build complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Choose your deployment option:" -ForegroundColor White
Write-Host ""
Write-Host "1. Netlify (Recommended - drag dist folder)" -ForegroundColor White
Write-Host "2. Auto-deploy to Netlify" -ForegroundColor White  
Write-Host "3. Auto-deploy to Vercel" -ForegroundColor White
Write-Host "4. Open local preview" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "📁 Opening dist folder..." -ForegroundColor Blue
        Start-Process "dist"
        Write-Host ""
        Write-Host "🌐 Opening Netlify..." -ForegroundColor Blue
        Start-Process "https://netlify.com"
        Write-Host ""
        Write-Host "👆 Drag the dist folder to the Netlify deployment area!" -ForegroundColor Green
    }
    "2" {
        Write-Host ""
        Write-Host "Installing Netlify CLI..." -ForegroundColor Yellow
        npm install -g netlify-cli
        Write-Host ""
        Write-Host "Deploying to Netlify..." -ForegroundColor Yellow
        netlify deploy --prod --dir=dist
    }
    "3" {
        Write-Host ""
        Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel
        Write-Host ""
        Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
        vercel --prod
    }
    "4" {
        Write-Host ""
        Write-Host "Starting local preview..." -ForegroundColor Blue
        npm run preview
    }
}

Write-Host ""
Write-Host "✨ Deployment process completed!" -ForegroundColor Green
Read-Host "Press Enter to continue..."
