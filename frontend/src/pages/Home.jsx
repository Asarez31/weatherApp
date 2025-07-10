import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Home() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to WeatherApp</h1>
      <p className="text-gray-700">
        This is your dashboard. You can add cities to track their weather, view forecasts, and manage your profile here.
      </p>
      <p className="mt-6 italic text-sm text-gray-500">
        (This is a placeholder page — the real dashboard will come soon!)
      </p>

      <button
        onClick={handleSignOut}
        className="mt-8 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
}