import { useState, useEffect, useContext } from "react";
import CitySearch from "../components/CitySearch.jsx";
import CityCard from "../components/CityCard.jsx";
import CityList from "../components/CityList.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

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
        <div className="bg-white p-6 rounded-xl shadow-md" >
          <CitySearch onCityAdded={fetchUserCities} />
        </div>

        {/* City List */}
        <div className="bg-white p-6 rounded-xl shadow-md flex justify-center">
          {loading && (
            <p className="text-gray-600 text-center">Loading your cities...</p>
          )}
          {error && <p className="text-red-600 text-center">{error}</p>}

          <CityList
            cities={cities}
            selectedCityId={currentCity?.id}
            onSelect={handleSelectCity}
          />
        </div>


        {/* Weather Display */}
        <div className="bg-white p-8 rounded-xl shadow-lg text-center flex justify-center">
          {currentCity ? (
            <CityCard city={currentCity} />
          ) : (
            <p className="text-gray-500 flex justify-center">No city selected.</p>
          )}
        </div>

        {/* Sign Out Button */}
        <div className="flex justify-center">
          <Button
            variant="outlined"
            color="primary"
            endIcon={<LogoutIcon />}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
