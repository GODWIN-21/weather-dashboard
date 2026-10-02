import './StatsGrid.css';

function StatsGrid({ weather }) {
  const { current, daily } = weather;

  const formatTime = (isoString) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(isoString));
  };

  return (
    <section className="stats-grid">
      <div className="metric">
        <span className="label">High</span>
        <strong>{Math.round(daily.temperature_2m_max[0])}°</strong>
      </div>
      <div className="metric">
        <span className="label">Low</span>
        <strong>{Math.round(daily.temperature_2m_min[0])}°</strong>
      </div>
      <div className="metric">
        <span className="label">Sunrise</span>
        <strong>{formatTime(daily.sunrise[0])}</strong>
      </div>
      <div className="metric">
        <span className="label">Sunset</span>
        <strong>{formatTime(daily.sunset[0])}</strong>
      </div>
    </section>
  );
}

export default StatsGrid;
