# Kill any existing processes on port 3000
$process = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { 
    try {
        $connections = Get-NetTCPConnection -OwningProcess $_.Id -ErrorAction SilentlyContinue
        $connections | Where-Object { $_.LocalPort -eq 3000 }
    } catch { $false }
}
if ($process) {
    Write-Host "Killing existing Node process..." -ForegroundColor Yellow
    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

# Set performance environment variables
$env:NODE_ENV = "development"
$env:TURBOPACK = "1"
$env:NODE_OPTIONS = "--max-old-space-size=4096"

# Start with maximum performance
Write-Host "Starting optimized development server..." -ForegroundColor Green
npm run dev