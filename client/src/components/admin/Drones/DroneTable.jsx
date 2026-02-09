import drones from "../../../../mock/drones.json";
import { Trash2, Edit, Plus, Zap } from "lucide-react";

import "./DroneTable.css";

const DroneTable = () => {
  const getBatteryClass = (battery) => {
    if (battery < 20) return "battery-low";
    if (battery < 70) return "battery-medium";
    return "battery-high";
  };

  return (
    <div className="admin-card">
      <div className="card-header">
        <h3>Drones</h3>
      </div>

      <table className="drone-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Battery</th>
            <th>Station</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {drones.map((d) => (
            <tr key={d.id}>
              <td className="drone-id">{d.id}</td>

              <td>
                <span className={`status-badge status-${d.status.toLowerCase()}`}>
                  {d.status}
                </span>
              </td>

              <td>
                 <div className={`battery ${getBatteryClass(d.battery)}`}>
                    {d.status === "charging" && (
                    <Zap size={16} className="charging-icon" />
                     )}
                    {d.battery}%
                    </div>
              </td>


              <td>{d.station}</td>

              <td>
                <div className="actions">
                  <button className="edit-btn">
                    <Edit size={16} />
                  </button>

                  <button className="delete-btn">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-drone-btn">
        <Plus size={18} />
        Add Drone
      </button>
    </div>
  );
};

export default DroneTable;
