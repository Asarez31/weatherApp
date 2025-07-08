# scripts/start-weatherApp.ps1

# Start Docker containers
docker-compose up -d

# Wait a bit for services to be ready
Start-Sleep -Seconds 5

# Start frontend (Vite) in new PowerShell window
Start-Process powershell -ArgumentList "cd frontend; npm run dev"