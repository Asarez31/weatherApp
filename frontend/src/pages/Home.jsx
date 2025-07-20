// src/pages/Home.jsx
import { useState, useEffect, useContext } from "react";
import CitySearch from "../components/CitySearch.jsx";
import CityCard from "../components/CityCard.jsx";
import CityList from "../components/CityList.jsx"; // Optional: replace with new layout below if needed
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Thermometer, Droplet, Wind, Eye, X } from "lucide-react";

export default function Home() {
  const { token, user, logout } = useContext(AuthContext);
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  const fetchUserCities = async () => {
    if (!token) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/cities/weather`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch cities");
      setCities(data);
      if (data.length > 0) setCurrentCity(data[0]);
    } catch (err) {
      console.error("❌ Failed to fetch cities:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserCities();
    }
  }, [user]);

  const handleSelectCity = (city) => {
    setCurrentCity(city);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-xl space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Your Weather Dashboard
        </h1>

        {/* City Search */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <CitySearch onCityAdded={fetchUserCities} />
        </div>

        {/* City List */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          {loading && (
            <p className="text-gray-600 text-center">Loading your cities...</p>
          )}
          {error && <p className="text-red-600 text-center">{error}</p>}

          <ul className="mt-4 space-y-2">
            {cities.map((city) => (
              <li
                key={city.id}
                className={`cursor-pointer p-3 rounded-md hover:bg-blue-100 transition ${
                  currentCity?.id === city.id
                    ? "bg-blue-200 font-semibold"
                    : "bg-gray-100"
                }`}
                onClick={() => handleSelectCity(city)}
              >
                {city.name}, {city.region}, {city.country}
              </li>
            ))}
          </ul>
        </div>

        {/* Weather Display */}
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          {!currentCity ? (
            <p className="text-gray-500">No city selected.</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-blue-800">
                {currentCity.name}, {currentCity.country}
              </h2>
              <div className="flex flex-col gap-3 text-gray-800 text-sm">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-blue-500" />
                  <span>
                    Temperature: {currentCity.temperature}°C (Feels like{" "}
                    {currentCity.feels_like}°C)
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
