import { getWeatherInfo } from '../utils/weather';
import './HourlyForecast.css';

function HourlyForecast({ hourly }) {
  if (!hourly || !hourly.time) return null;

  const formatHour = (isoString) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: true
    }).format(new Date(isoString));
  };

  const entries = hourly.time.slice(0, 6).map((time, i) => ({
    time,
    temp: hourly.temperature_2m[i],
    code: hourly.weather_code[i]
  }));

  return (
    <section className="panel">
      <h3 className="panel-title">Hourly Forecast</h3>
      <div className="hourly">
        {entries.map((entry, index) => {
          const info = getWeatherInfo(entry.code);
          return (
            <div key={index} className="hour-card">
              <span className="time">{formatHour(entry.time)}</span>
              <span className="icon">{info.icon}</span>
              <span className="temp">{Math.round(entry.temp)}°</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;
