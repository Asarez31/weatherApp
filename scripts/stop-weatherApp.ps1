# scripts/stop-weatherApp.ps1

Write-Host "🛑 Stopping weatherApp Docker containers..."

# Stop and remove containers
docker-compose down

Write-Host "✅ All containers stopped and removed."
