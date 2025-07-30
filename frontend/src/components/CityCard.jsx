import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";

export default function CityCard({ city }) {
  return (
    <div className="space-y-4 text-gray-800">
      <h2 className="text-2xl font-bold text-blue-800">
        <HouseOutlinedIcon /> {city.name}, {city.country}
      </h2>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2">
          <DeviceThermostatOutlinedIcon />
          <span>
            Temperature: {city.temperature}°C (Feels like {city.feels_like}°C)
          </span>
        </div>
      </div>
    </div>
  );
}
