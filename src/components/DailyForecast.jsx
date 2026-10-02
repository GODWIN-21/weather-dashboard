import { getWeatherInfo } from '../utils/weather';
import './DailyForecast.css';

function DailyForecast({ daily }) {
  if (!daily || !daily.time) return null;

  const formatDay = (isoString, index) => {
    if (index === 0) return 'Today';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short'
    }).format(new Date(isoString));
  };

  return (
    <section className="panel">
      <h3 className="panel-title">5-Day Outlook</h3>
      <div className="daily">
        {daily.time.slice(0, 5).map((day, index) => {
          const info = getWeatherInfo(daily.weather_code[index]);
          return (
            <div key={index} className="day-row">
              <span className="day-name">{formatDay(day, index)}</span>
              <span className="day-icon">{info.icon}</span>
              <span className="day-summary">{info.label}</span>
              <div className="day-temp">
                <span>{Math.round(daily.temperature_2m_max[index])}°</span>
                <span className="low">{Math.round(daily.temperature_2m_min[index])}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DailyForecast;
