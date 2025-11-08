Write-Host "Starting portfolio dev server..." -ForegroundColor Green
Write-Host "Server will run at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

Set-Location "D:\Desktop\Praca\Exercices\Other\portfolio-site"

# Kill any existing node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Start the dev server
npm run dev
