const WEATHER_CODES = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Depositing rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Drizzle', icon: '🌦️' },
  55: { label: 'Heavy drizzle', icon: '🌧️' },
  56: { label: 'Freezing drizzle', icon: '🌧️' },
  57: { label: 'Heavy freezing drizzle', icon: '🌧️' },
  61: { label: 'Slight rain', icon: '🌦️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  66: { label: 'Freezing rain', icon: '🌧️' },
  67: { label: 'Heavy freezing rain', icon: '🌧️' },
  71: { label: 'Light snow', icon: '🌨️' },
  73: { label: 'Snow', icon: '❄️' },
  75: { label: 'Heavy snow', icon: '❄️' },
  77: { label: 'Snow grains', icon: '❄️' },
  80: { label: 'Rain showers', icon: '🌦️' },
  81: { label: 'Heavy showers', icon: '🌧️' },
  82: { label: 'Violent showers', icon: '⛈️' },
  85: { label: 'Snow showers', icon: '🌨️' },
  86: { label: 'Heavy snow showers', icon: '🌨️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm with hail', icon: '⛈️' },
  99: { label: 'Severe thunderstorm', icon: '⛈️' }
};

const getWeatherDetails = (code) => WEATHER_CODES[code] || { label: 'Conditions', icon: '🌤️' };

const cityInput = document.querySelector('#city-input');
const searchForm = document.querySelector('#search-form');
const locationName = document.querySelector('#location-name');
const currentTemp = document.querySelector('#current-temp');
const weatherSummary = document.querySelector('#weather-summary');
const feelsLike = document.querySelector('#feels-like');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const highTemp = document.querySelector('#high-temp');
const lowTemp = document.querySelector('#low-temp');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const hourlyForecast = document.querySelector('#hourly-forecast');
const dailyForecast = document.querySelector('#daily-forecast');
const hourlyTemplate = document.querySelector('#hourly-item-template');

const defaultCity = 'London';

const formatHour = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true
  }).format(date);
};

const formatDay = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short'
  }).format(date);
};

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
};

const renderHourly = (hourly) => {
  if (!hourly || !hourly.time || !hourly.temperature_2m || !hourly.weather_code) {
    hourlyForecast.innerHTML = '<p class="empty-state">Hourly forecast unavailable.</p>';
    return;
  }

  const nextHours = hourly.time.slice(0, 8).map((time, index) => ({
    time,
    temp: hourly.temperature_2m[index],
    code: hourly.weather_code[index]
  }));

  hourlyForecast.innerHTML = '';

  nextHours.forEach((entry) => {
    const fragment = hourlyTemplate.content.cloneNode(true);
    const timeNode = fragment.querySelector('.time');
    const symbolNode = fragment.querySelector('.symbol');
    const tempNode = fragment.querySelector('.temp');

    const details = getWeatherDetails(entry.code);
    timeNode.textContent = formatHour(entry.time);
    symbolNode.textContent = details.icon;
    tempNode.textContent = `${Math.round(entry.temp)}°`;
    hourlyForecast.appendChild(fragment);
  });
};

const renderDaily = (daily) => {
  if (!daily || !daily.time || !daily.temperature_2m_max || !daily.temperature_2m_min || !daily.weather_code) {
    dailyForecast.innerHTML = '<p class="empty-state">Daily forecast unavailable.</p>';
    return;
  }

  dailyForecast.innerHTML = '';

  daily.time.slice(0, 5).forEach((day, index) => {
    const card = document.createElement('div');
    card.className = 'day-row';

    const dayName = document.createElement('span');
    dayName.className = 'day-name';
    dayName.textContent = index === 0 ? 'Today' : formatDay(day);

    const icon = document.createElement('span');
    icon.className = 'day-icon';
    icon.textContent = getWeatherDetails(daily.weather_code[index]).icon;

    const summary = document.createElement('span');
    summary.className = 'day-summary';
    summary.textContent = getWeatherDetails(daily.weather_code[index]).label;

    const temps = document.createElement('div');
    temps.className = 'day-temps';
    temps.innerHTML = `<span>${Math.round(daily.temperature_2m_max[index])}°</span><span class="low">${Math.round(daily.temperature_2m_min[index])}°</span>`;

    card.append(dayName, icon, summary, temps);
    dailyForecast.appendChild(card);
  });
};

const updateDashboard = (weatherData) => {
  const current = weatherData.current;
  const daily = weatherData.daily;

  locationName.textContent = weatherData.locationName;
  currentTemp.textContent = `${Math.round(current.temperature_2m)}°`;

  const weatherInfo = getWeatherDetails(current.weather_code);
  weatherSummary.textContent = `${weatherInfo.icon} ${weatherInfo.label}`;
  feelsLike.textContent = `${Math.round(current.apparent_temperature)}°`;
  humidity.textContent = `${Math.round(current.relative_humidity_2m)}%`;
  windSpeed.textContent = `${Math.round(current.wind_speed_10m)} km/h`;

  highTemp.textContent = `${Math.round(daily.temperature_2m_max[0])}°`;
  lowTemp.textContent = `${Math.round(daily.temperature_2m_min[0])}°`;
  sunrise.textContent = formatTime(daily.sunrise[0]);
  sunset.textContent = formatTime(daily.sunset[0]);

  renderHourly(weatherData.hourly);
  renderDaily(weatherData.daily);
};

const fetchWeatherByCity = async (cityName) => {
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
  );

  if (!geoResponse.ok) {
    throw new Error('Unable to locate that city.');
  }

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error('No city found. Try another keyword.');
  }

  const place = geoData.results[0];
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=5`
  );

  if (!weatherResponse.ok) {
    throw new Error('Weather data request failed.');
  }

  const weatherData = await weatherResponse.json();

  return {
    locationName: `${place.name}${place.country ? `, ${place.country}` : ''}`,
    current: weatherData.current,
    daily: weatherData.daily,
    hourly: weatherData.hourly
  };
};

const loadWeather = async (city = defaultCity) => {
  try {
    const data = await fetchWeatherByCity(city);
    updateDashboard(data);
    cityInput.value = city;
  } catch (error) {
    weatherSummary.textContent = error.message;
    currentTemp.textContent = '--°';
    locationName.textContent = 'City not found';
  }
};

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    cityInput.focus();
    return;
  }

  await loadWeather(city);
});

loadWeather(defaultCity);
