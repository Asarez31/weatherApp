import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";

export default function CityList({ cities, selectedCityId, onSelect }) {
  return (
    <ul className="mt-4 space-y-2">
      {cities.map((city) => (
        <li
          key={city.id}
          className={`flex items-center gap-2 cursor-pointer p-3 rounded-md hover:bg-blue-100 transition ${
            selectedCityId === city.id
              ? "bg-blue-200 font-semibold"
              : "bg-gray-100"
          }`}
          onClick={() => onSelect(city)}
        >
          <OtherHousesOutlinedIcon className="text-blue-600" />
          <span>
            {city.name}, {city.region}, {city.country}
          </span>
        </li>
      ))}
    </ul>
  );
}
