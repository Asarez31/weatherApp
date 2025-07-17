// src/pages/Home.jsx
import { useState, useEffect, useContext } from "react";
import CitySearch from "../components/CitySearch.jsx";
import CityList from "../components/CityList.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { token, user } = useContext(AuthContext);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleSignOut = () => {
    logout();
    navigate("/login");
  }

  const fetchUserCities = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/cities/weather`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch cities");
      setCities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      console.log("Sending token:", token);

      fetchUserCities();
    }
  }, [user]);

  return (
    <><div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Weather Dashboard</h1>

      <CitySearch onCityAdded={fetchUserCities} />

      {loading && <p>Loading your cities...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {!loading && !error && <CityList cities={cities} refreshCities={fetchUserCities} />}
    </div><button
      onClick={handleSignOut}
      className="mt-8 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
        Sign Out
      </button></>
  );
}
