import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import HeroCard from './components/HeroCard';
import StatsGrid from './components/StatsGrid';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import { fetchWeather } from './api/weather';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather('London');
  }, []);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-badge">☀️</div>
          <h1>Weather Dashboard</h1>
        </div>
        <SearchBar onSearch={loadWeather} />
      </header>

      <main className="dashboard">
        {loading && !weather && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {weather && (
          <>
            <HeroCard weather={weather} />
            <StatsGrid weather={weather} />
            <HourlyForecast hourly={weather.hourly} />
            <DailyForecast daily={weather.daily} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
