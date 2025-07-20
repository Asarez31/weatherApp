// src/components/CityCard.jsx
import { Thermometer, Droplet, Wind, Eye, X } from "lucide-react";

export default function CityCard({ city, onRemove }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md mx-auto flex flex-col gap-4 relative">
      <button
        onClick={() => onRemove(city)}
        aria-label={`Remove ${city.name}`}
        title="Remove city"
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 focus:outline-none"
      >
        <X size={20} />
      </button>

      <h2 className="text-2xl font-bold text-center">
        {city.name}, {city.country}
      </h2>

      <p className="text-center text-gray-700 capitalize text-lg">{city.weather}</p>

      <div className="flex flex-col gap-3 text-gray-800 text-sm">
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-blue-500" />
          <span>Temperature: {city.temperature}°C (Feels like {city.feels_like}°C)</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-cyan-600" />
          <span>Humidity: {city.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-gray-600" />
          <span>Wind Speed: {city.wind_speed} km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-violet-600" />
          <span>Visibility: {city.visibility} km</span>
        </div>
      </div>
    </div>
  );
}
