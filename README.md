# WeatherApp

A full-stack weather application for desktop and mobile devices. The backend is built with Node.js, Express, and PostgreSQL, providing user authentication, city management, and real-time weather data via the OpenWeather API. The project is containerized using Docker and includes Postman collections for API testing.

## Features
- User registration and login
- Search for cities with autocomplete
- Add/remove cities to/from user profile
- Retrieve weather data for user-saved cities
- RESTful API with JSON responses
- Logging with daily rotation
- Dockerized backend and database
- Postman collection for API testing

## Tech Stack
- Node.js, Express
- PostgreSQL
- Docker & Docker Compose
- Winston (logging)
- OpenWeather API
- Postman (API testing)

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (for local development)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/weatherApp.git
   cd weatherApp
   ```
2. Create a `.env` file in `backend/` with the following:
   ```env
   PORT=5000
   DATABASE_URL=postgres://postgres:postgres@db:5432/weatherapp
   OPENWEATHER_API_KEY=your_openweather_api_key
   ```
3. Start the app with Docker Compose:
   ```sh
   docker-compose up --build
   ```
4. The backend API will be available at `http://localhost:5000`
5. Access pgAdmin at `http://localhost:8080` (default email: admin@weather.com, password: weather123)

### API Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login
- `GET /api/cities/autocomplete?name=rom` — City autocomplete
- `POST /api/cities/add` — Add city to user
- `GET /api/cities/user/:userId` — Get user's cities
- `DELETE /api/cities/user/:userId/city/:cityId` — Remove city from user
- `GET /api/cities/user/:userId/weather` — Get weather for user's cities

### Testing with Postman
- Import the collection from `postman/weatherApp.postman_collection.json`
- Use the provided requests to test all endpoints

## Logging
- Logs are stored in the `logs/` directory with daily rotation (kept for 14 days)

## License
MIT
