# scripts/stop-weatherApp.ps1

Write-Host "🛑 Stopping weatherApp Docker containers..."

# Stop and remove containers
docker-compose down

Write-Host "🛑 Stopping frontend dev server..."

# Find process using port 5173 and stop it
$frontendProcess = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | Select-Object -First 1
if ($frontendProcess) {
    $frontendProcObj = Get-Process -Id $frontendProcess.OwningProcess -ErrorAction SilentlyContinue
    if ($frontendProcObj) {
        Stop-Process -Id $frontendProcObj.Id -Force
        Write-Host "✅ Frontend dev server stopped."
    } else {
        Write-Host "⚠️ Could not find frontend process to stop."
    }
} else {
    Write-Host "✅ No frontend dev server running on port 5173."
}

Write-Host "✅ All containers and frontend stopped."
