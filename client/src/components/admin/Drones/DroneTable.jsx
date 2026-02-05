import drones from "../../../../mock/drones.json";
import "./DroneTable.css";

const DroneTable = () => {
  return (
    <div className="admin-card">
      <h3>Drone Fleet</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Battery</th>
            <th>Station</th>
          </tr>
        </thead>
        <tbody>
          {drones.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.status}</td>
              <td>{d.battery}%</td>
              <td>{d.station}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DroneTable;
