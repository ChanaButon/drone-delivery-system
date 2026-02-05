import stations from "../../../../mock/baseStations.json";
import "./StationTable.css";

const StationTable = () => {
  return (
    <div className="admin-card">
      <h3>Base Stations</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Available Drones</th>
          </tr>
        </thead>
        <tbody>
          {stations.map(station => (
            <tr key={station.id}>
              <td>{station.id}</td>
              <td>{station.location}</td>
              <td>{station.capacity}</td>
              <td>{station.availableDrones}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StationTable;
