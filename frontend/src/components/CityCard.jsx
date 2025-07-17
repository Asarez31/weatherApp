// src/components/CityCard.jsx
import { X } from "lucide-react";

export default function CityCard({ city, onRemove }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-start">
      <div>
        <h2 className="text-xl font-semibold">
          {city.name}, {city.country}
        </h2>
        <p className="text-gray-700 capitalize">{city.weather}</p>
        <p className="text-sm text-gray-600">
          Temp: {city.temperature}°C | Feels like: {city.feels_like}°C
        </p>
      </div>
      <button
        onClick={() => onRemove(city)}
        aria-label={`Remove ${city.name}`}
        className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
        title="Remove city"
      >
        <X size={20} />
      </button>
    </div>
  );
}
