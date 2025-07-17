import { useEffect, useState, useContext } from "react";
import CityCard from "./CityCard";
import { AuthContext } from "../context/AuthContext";

export default function CityList({ refreshCitiesTrigger }) {
  const { token, user } = useContext(AuthContext);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCities = async () => {
    if (!token) {
      setError("Missing token");
      setLoading(false);
      return;
    }

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
      console.error("❌ Error loading cities:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeCity = async (city) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove ${city.name}, ${city.region}, ${city.country}?`
    );
    if (!confirmDelete) return;
    
    if (!token) {
      console.error("❌ Missing token while removing city");
      return;
    }
    console.log("Removing city with region:", city);

    try {
      const res = await fetch(`/api/cities/city/${city.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to remove city");
      }

      // Update local state after removal
      setCities((prev) => prev.filter((c) => c.id !== city.id));
    } catch (err) {
      console.error("❌ Error removing city:", err.message);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [token, refreshCitiesTrigger]);

  if (loading) return <p className="text-gray-500">Loading cities...</p>;

  if (error) return <p className="text-red-500">Error: {error}</p>;

  if (cities.length === 0)
    return <p className="text-gray-500">No cities added yet.</p>;

  return (
    <div className="mt-6">
      {cities.map((city, index) => (
        <CityCard key={index} city={city} onRemove={removeCity} />
      ))}
    </div>
  );
}
