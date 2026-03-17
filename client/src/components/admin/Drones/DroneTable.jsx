import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Edit, Plus, Zap, Check, Settings,Battery, MapPin} from "lucide-react";
import {
  getAllDrones,
  deleteDrone,
  createDrone,
  sendDroneToCharging,
  sendDroneToMaintenance,
  setDroneAvailable,
  
} from "../../../api/drone-function.js";
import AddDroneModal from "./AddDroneModal";
import BatteryIndicator from "./BatteryIndicator.jsx"
import { showSuccess, showError, showConfirm } from "../../../utils/popup.js";
import ManageDroneModal from "./ManageDroneModal";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./DroneTable.css";


const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const DroneTable = () => {
  const queryClient = useQueryClient();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [manageDroneSelected, setManageDroneSelected] = useState(null);
  const [showAllDronesMap, setShowAllDronesMap] = useState(false);
  const [mapDrone, setMapDrone] = useState(null);



 const { data: drones = [], isLoading, isError } = useQuery({
  queryKey: ["drones"],
  queryFn: getAllDrones,
  refetchInterval: 20000, 
  refetchIntervalInBackground: true 
});

  const deleteMutation = useMutation({
    mutationFn: deleteDrone,
    onSuccess: () => queryClient.invalidateQueries(["drones"])
  });

  const createMutation = useMutation({
    mutationFn: createDrone,
    onSuccess: () => queryClient.invalidateQueries(["drones"])
  });

  if (isLoading) return <p>Loading drones...</p>;
  if (isError) return <p>Error loading drones</p>;

  const getBatteryClass = (level) => {
    if (level > 80) return "battery-high";
    if (level > 40) return "battery-medium";
    return "battery-low";
  };

  const handleDelete = async (drone) => {
  const confirmed = await showConfirm(`Delete ${drone.model}?`);

  if (!confirmed) return;

  try {
    await deleteMutation.mutateAsync(drone._id);
    showSuccess("Drone deleted successfully");
  } catch (err) {
    showError(err.message);
  }
};

const handleOpenDroneMap = (drone) => {

  if (
    drone.location?.coordinates?.[0] === undefined ||
    drone.location?.coordinates?.[1] === undefined
  ) {
    showError("Location not available for this drone");
    return;
  }

  setMapDrone(drone);
};


  return (
    <div className="admin-card">
      <div className="card-header">
        <h3>Drones</h3>
      </div>

      <table className="drone-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Status</th>
            <th>Battery</th>
            <th>Station</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drones.map((drone) => (
            <tr key={drone._id}>
              <td>{drone.model}</td>
              <td>
                <span className={`status-badge status-${drone.status}`}>
                  {drone.status === "charging" && <Zap size={14} />}
                  {drone.status === "InMaintenance" && <Settings size={14} />}
                  {drone.status === "available" && <Check size={14} />}
                  {drone.status === "delivering" && <Check size={14} />}
                  {drone.status}
                </span>
              </td>
            <td>
  <BatteryIndicator level={drone.batteryLevel} />
</td>
              <td>{drone.baseStationId ? drone.baseStationId.name : "Not Assigned"}</td>
            <td>
  <button
    className="map-btn"
    onClick={() => handleOpenDroneMap(drone)}
  >
    View Map
  </button>
</td>
{mapDrone?.location?.coordinates?.[1] !== undefined &&
 mapDrone?.location?.coordinates?.[0] !== undefined && (

  <div
    className="map-overlay"
    onClick={() => setMapDrone(null)}
  >
    <div
      className="map-container"
      onClick={(e) => e.stopPropagation()}
    >
      <MapContainer
        center={[
          mapDrone.location.coordinates[1],
          mapDrone.location.coordinates[0]
        ]}
        zoom={16}
        style={{ width: "100%", height: "100%" }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker
          position={[
            mapDrone.location.coordinates[1],
            mapDrone.location.coordinates[0]
          ]}
          icon={markerIcon}
        />

      </MapContainer>
    </div>
  </div>

)}



              <td>
                <div className="actions">
                  <button className="edit-btn" onClick={() => setManageDroneSelected(drone)}>
                    <Edit size={16} />
                  </button>
                 <button className="delete-btn" onClick={() => handleDelete(drone)}>
  <Trash2 size={16} />
</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<div className="drone-buttons">
      <button className="add-drone-btn" 
      onClick={() => setAddModalOpen(true)}>
        <Plus size={18} /> Add Drone
      </button>
      <button
     className="map-btn"
     onClick={() => setShowAllDronesMap(true)}>
  <MapPin size={18} /> View All Drones
</button>
</div>
{showAllDronesMap && (
  <div
    className="map-overlay"
    onClick={() => setShowAllDronesMap(false)}
  >
    <div
      className="map-container"
      onClick={(e) => e.stopPropagation()}
    >
      <MapContainer
        center={[32.0853, 34.7818]}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {drones.map((drone) => {

          if (!drone.location?.coordinates) return null;

          const lat = drone.location.coordinates[1];
          const lng = drone.location.coordinates[0];

          return (
            <Marker
              key={drone._id}
              position={[lat, lng]}
              icon={markerIcon}
            />
          );

        })}

      </MapContainer>
    </div>
  </div>
)}



      {addModalOpen && (
        <AddDroneModal
          onClose={() => setAddModalOpen(false)}
          createMutation={createMutation}
        />
      )}

      {manageDroneSelected && (
        <ManageDroneModal
          drone={manageDroneSelected}
          onClose={() => setManageDroneSelected(null)}
        />
      )}
    </div>
  );
};

export default DroneTable;