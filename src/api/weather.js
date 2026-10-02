const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeather = async (city) => {
  try {
    // Geocode the city
    const geoResponse = await fetch(
      `${GEOCODING_API}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!geoResponse.ok) {
      throw new Error('Unable to search for city.');
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`No city found for "${city}". Try another location.`);
    }

    const place = geoData.results[0];

    // Fetch weather data
    const weatherResponse = await fetch(
      `${WEATHER_API}?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=5`
    );

    if (!weatherResponse.ok) {
      throw new Error('Unable to fetch weather data.');
    }

    const weatherData = await weatherResponse.json();

    return {
      location: `${place.name}${place.country ? ', ' + place.country : ''}`,
      current: weatherData.current,
      hourly: weatherData.hourly,
      daily: weatherData.daily
    };
  } catch (error) {
    throw error;
  }
};
