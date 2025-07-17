import axios from "axios";
import pool from "../db.js";

// ✅ GET /cities/autocomplete
export const autocompleteCities = async (req, res) => {
  const query = req.query.name.toLowerCase().trim();

  if (!query || query.length < 2) {
    return res
      .status(400)
      .json({ error: "Please enter at least 2 characters" });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const response = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: query,
          limit: 5,
          appid: apiKey,
        },
      }
    );

    const suggestions = response.data.map((city) => ({
      name: city.name,
      region: city.state || "",
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      label: `${city.name}, ${city.state || ""}, ${city.country}`
        .replace(/\s+,/g, "")
        .trim(),
    }));

    res.json(suggestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};

// ✅ POST /cities/add
export const addCityToUser = async (req, res) => {
  const userId = req.user.id;
  const { name, region, country, lat, lon } = req.body;

  if (!name || !country || lat == null || lon == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const cityResult = await pool.query(
      `INSERT INTO cities (name, region, country, lat, lon)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (name, region, country, lat, lon)
       DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
      [name, region, country, lat, lon]
    );

    const cityId = cityResult.rows[0].id;

    await pool.query(
      `INSERT INTO user_cities (user_id, city_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [userId, cityId]
    );

    res.status(201).json({ message: "✅ City added to user" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "❌ Could not add city to user" });
  }
};

// ✅ GET /cities/my
export const getUserCities = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT c.id, c.name, c.region, c.country, c.lat, c.lon
       FROM user_cities uc
       JOIN cities c ON uc.city_id = c.id
       WHERE uc.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching user cities:', err.message);
    res.status(500).json({ error: 'Could not retrieve cities' });
  }
};

// ✅ DELETE /cities/city/:cityId
export const removeCityFromUser = async (req, res) => {
  const userId = req.user.id;
  const { cityId } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM user_cities
       WHERE user_id = $1 AND city_id = $2`,
      [userId, cityId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Relation not found' });
    }

    res.json({ message: '✅ City removed from user' });
  } catch (err) {
    console.error('❌ Error removing city from user:', err.message);
    res.status(500).json({ error: 'Could not remove city from user' });
  }
};

// ✅ GET /cities/weather
export const getWeatherForUserCities = async (req, res) => {
  const userId = req.user.id;

  try {
    const cityResult = await pool.query(
      `SELECT c.id, c.name, c.country, c.region, c.lat, c.lon
       FROM user_cities uc
       JOIN cities c ON uc.city_id = c.id
       WHERE uc.user_id = $1`,
      [userId]
    );

    const cities = cityResult.rows;

    if (!cities.length) {
      return res.status(404).json({ error: 'User has no saved cities' });
    }

    const weatherResponses = await Promise.all(
      cities.map(async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

        const weather = await axios.get(url);
        return {
          id: city.id,
          name: city.name,
          region: city.region,
          country: city.country,
          lat: city.lat,
          lon: city.lon,
          weather: weather.data.weather[0].description,
          temperature: weather.data.main.temp,
          feels_like: weather.data.main.feels_like,
        };
      })
    );

    res.json(weatherResponses);
  } catch (err) {
    console.error('❌ Error fetching weather:', err.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};