# Portfolio Site Startup Script
Push-Location $PSScriptRoot
Write-Host "Starting Portfolio Site..." -ForegroundColor Green
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "Starting development server..." -ForegroundColor Yellow
npm run dev
Pop-Location
