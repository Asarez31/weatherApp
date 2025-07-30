// src/components/CitySearch.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function CitySearch({ onCityAdded }) {
  const { token, user } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/cities/autocomplete?name=${input}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setSuggestions(data);
      } else {
        console.error(data.error || "Autocomplete failed");
        setSuggestions([]);
      }
    } catch (err) {
      console.error("❌ Autocomplete error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCity = async (city) => {
    try {
      const res = await fetch("/api/cities/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: city.name,
          region: city.region,
          country: city.country,
          lat: city.lat,
          lon: city.lon,
        }),
      });

      //console.log("City to add:", city);

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add city");

      onCityAdded(); // Refresh city list
      setQuery("");
      setSuggestions([]);
    } catch (err) {
      console.error("❌ Add city error:", err.message);
    }
  };

  return (
    <div className="mt-8 max-w-xl mx-auto">
      <input
        type="text"
        className="w-full border px-4 py-2 rounded shadow-sm"
        placeholder="Search for a city..."
        value={query}
        onChange={handleInputChange}
      />
      {loading && <p className="text-sm text-gray-500 mt-1">Searching...</p>}
      {suggestions.length > 0 && (
        <ul className="bg-white border rounded mt-2 shadow divide-y">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleAddCity(city)}
            >
              {city.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
