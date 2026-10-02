import { getWeatherInfo } from '../utils/weather';
import './HeroCard.css';

function HeroCard({ weather }) {
  const { current, daily } = weather;
  const info = getWeatherInfo(current.weather_code);

  const formatTime = (isoString) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(isoString));
  };

  return (
    <section className="hero">
      <div>
        <p className="location">{weather.location}</p>
        <h2 className="temp">{Math.round(current.temperature_2m)}°</h2>
        <div className="summary">
          <span className="emoji">{info.icon}</span>
          <span>{info.label}</span>
        </div>
      </div>

      <div className="highlights">
        <div className="highlight">
          <span className="label">Feels like</span>
          <strong>{Math.round(current.apparent_temperature)}°</strong>
        </div>
        <div className="highlight">
          <span className="label">Humidity</span>
          <strong>{Math.round(current.relative_humidity_2m)}%</strong>
        </div>
        <div className="highlight">
          <span className="label">Wind</span>
          <strong>{Math.round(current.wind_speed_10m)} km/h</strong>
        </div>
      </div>
    </section>
  );
}

export default HeroCard;
