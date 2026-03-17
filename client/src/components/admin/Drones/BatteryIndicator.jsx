
import "./DroneTable.css";
const BatteryIndicator = ({ level,isCharging }) => {

  const bars = 5;
  const filledBars = Math.ceil((level / 100) * bars);

  let color = "#16a34a"; // ירוק
  if (level < 30) color = "#dc2626"; // אדום
  else if (level < 60) color = "#ea580c"; // כתום

  return (
    <div className="battery-bars">
      <div className="battery-bars-body">
        {[...Array(bars)].map((_, i) => (
          <div
            key={i}
            className={`bar ${i < filledBars ? 'filled' : ''} ${isCharging ? 'charging' : ''}`}
            style={{ backgroundColor: i < filledBars ? color : "#e5e7eb" }}
          ></div>
        ))}
        <span className="battery-text">{Math.round(level)}%</span>
      </div>
      <div className="battery-bars-cap"></div>
    </div>
  );
};


export default BatteryIndicator;