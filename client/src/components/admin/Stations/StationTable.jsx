import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllStations } from "../../../api/baseStation-function.js";

import { Trash2, Edit, Plus, MapPin } from "lucide-react";
import "./StationTable.css";

const StationTable = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { data: stations = [], isLoading, isError } = useQuery({
    queryKey: ["stations"],
    queryFn: getAllStations
  });

  const openMap = (location) => {
    setSelectedLocation(location);
  };

  const closeMap = () => {
    setSelectedLocation(null);
  };

  if (isLoading) return <p>Loading stations...</p>;
  if (isError) return <p>Error loading stations</p>;

  return (
    <div className="admin-card">
      <div className="card-header">
        <h3>Base Stations</h3>
      </div>

      <table className="station-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Available Drones</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {stations.map((station) => (
            <tr key={station._id}>
              <td className="station-id">{station._id}</td>

              <td>
                <button
                  className="map-btn"
                  onClick={() => openMap(station.location)}
                >
                  <MapPin size={18} />
                  View Map
                </button>
              </td>

              <td>{station.capacity}</td>

              <td>
                <span className="available-badge">
                  {station.availableDrones}
                </span>
              </td>

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

      <button className="add-station-btn">
        <Plus size={18} />
        Add Station
      </button>

      {selectedLocation && (
        <div className="map-overlay" onClick={closeMap}>
          <div className="map-container" onClick={(e) => e.stopPropagation()}>
            <iframe
              title="station-map"
              src={`https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&output=embed`}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StationTable;