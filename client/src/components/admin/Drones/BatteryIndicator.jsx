
import "./DroneTable.css";
const BatteryIndicator = ({ level }) => {

  let color = "#16a34a";

  if (level < 30) color = "#dc2626";
  else if (level < 60) color = "#ea580c";

  return (
    <div className="battery">
      <div className="battery-body">
        <div
          className="battery-level"
          style={{
            width: `${level}%`,
            background: color
          }}
        >
          <span className="battery-text">{level}%</span>
        </div>
      </div>
      <div className="battery-cap"></div>
    </div>
  );
};

export default BatteryIndicator;