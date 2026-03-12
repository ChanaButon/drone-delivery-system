import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

import {
  getAllStations,
  deleteStation,
  updateStation,
  createBaseStation,
  countDronesInStation 
} from "../../../api/baseStation-function.js";

import { showSuccess, showError, showConfirm } from "../../../utils/popup.js";

import { Trash2, Edit, Plus, MapPin } from "lucide-react";

import "leaflet/dist/leaflet.css";
import "./StationTable.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const StationTable = () => {
  const queryClient = useQueryClient();

  const [editStation, setEditStation] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCapacity, setEditCapacity] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [stationInfo, setStationInfo] = useState(null);

  const [mapStation, setMapStation] = useState(null);
  const [newStationModal, setNewStationModal] = useState(false);

  const [newCapacity, setNewCapacity] = useState("");
  const [newStatus, setNewStatus] = useState("active");
  const [newName, setNewName] = useState("");
  const [newLat, setNewLat] = useState("");
  const [newLng, setNewLng] = useState("");

  const [showAllStationsMap, setShowAllStationsMap] = useState(false);

  const { data: stations = [], isLoading, isError } = useQuery({
    queryKey: ["stations"],
    queryFn: getAllStations
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStation,
    onSuccess: () => {
      showSuccess("Station deleted successfully");
      queryClient.invalidateQueries(["stations"]);
    },
    onError: () => showError("Failed to delete station")
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateStation(id, data),
    onSuccess: () => {
      showSuccess("Station updated successfully");
      queryClient.invalidateQueries(["stations"]);
      setEditStation(null);
    },
    onError: () => showError("Failed to update station")
  });

  const createMutation = useMutation({
    mutationFn: (data) => createBaseStation(data),
    onSuccess: () => {
      showSuccess("Station created successfully");
      queryClient.invalidateQueries(["stations"]);
      setNewStationModal(false);
      setNewName("");
      setNewCapacity("");
      setNewStatus("active");
      setNewLat("");
      setNewLng("");
    },
    onError: () => showError("Failed to create station")
  });

  const handleDelete = async (id) => {
    const confirmed = await showConfirm("Delete this station?");
    if (!confirmed) return;
    deleteMutation.mutate(id);
  };

  const handleEdit = (station) => {
    setEditStation(station);
    setEditName(station.name);
    setEditCapacity(station.capacity);
    setEditStatus(station.status || "active");
  };

  const handleSaveEdit = () => {
  if (!editStation) return;

  updateMutation.mutate({
    id: editStation._id,
    data: {
      name: editName,
      capacity: Number(editCapacity),
      status: editStatus
    }
  });
};

  const handleOpenMap = (station) => {
    if (
      station.location?.coordinates?.[0] === undefined ||
      station.location?.coordinates?.[1] === undefined
    ) {
      showError("Location not available for this station");
      return;
    }

    setMapStation(station);
  };

  const handleCreateStation = () => {
    if (!newName || !newCapacity || !newLat || !newLng) {
      showError("Please fill in all fields");
      return;
    }

    const payload = {
      name: newName,
      capacity: Number(newCapacity),
      status: newStatus,
      location: {
        type: "Point",
        coordinates: [Number(newLng), Number(newLat)]
      }
    };

    createMutation.mutate(payload);
  };

  const handleShowDrones = async (station) => {
  try {
    const res = await countDronesInStation(station._id);

    setStationInfo({
      name: station.name,
      capacity: station.capacity,
      drones: res.count
    });

  } catch {
    showError("Failed to load drones count");
  }
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
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Drones</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {stations.map((station) => (
            <tr key={station._id}>
              <td>{station.name}</td>

              <td>
                <button
                  className="map-btn"
                  onClick={() => handleOpenMap(station)}
                >
                  <MapPin size={18} /> View Map
                </button>
              </td>

              <td>
  <span className={`status ${station.status || "active"}`}>
    {station.status || "active"}
  </span>
</td>
 <td>
  <button
    className="drones-btn"
    onClick={() => handleShowDrones(station)}
  >
    🚁 View Drones
  </button>
</td>

              <td className="actions">
                <button
                  onClick={() => handleEdit(station)}
                  className="edit-btn"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={() => handleDelete(station._id)}
                  className="delete-btn"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="station-buttons">
        <button
          className="add-station-btn"
          onClick={() => setNewStationModal(true)}
        >
          <Plus size={18} /> Add Station
        </button>

        <button
          className="map-btn"
          onClick={() => setShowAllStationsMap(true)}
        >
          <MapPin size={18} /> View All Stations
        </button>
      </div>

      {showAllStationsMap && (
        <div
          className="map-overlay"
          onClick={() => setShowAllStationsMap(false)}
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

              {stations.map((station) => {
                if (!station.location?.coordinates) return null;

                const lat = station.location.coordinates[1];
                const lng = station.location.coordinates[0];

                return (
                  <Marker
                    key={station._id}
                    position={[lat, lng]}
                    icon={markerIcon}
                  />
                );
              })}
            </MapContainer>
          </div>
        </div>
      )}

      {mapStation?.location?.coordinates?.[1] !== undefined &&
        mapStation?.location?.coordinates?.[0] !== undefined && (
          <div
            className="map-overlay"
            onClick={() => setMapStation(null)}
          >
            <div
              className="map-container"
              onClick={(e) => e.stopPropagation()}
            >
              <MapContainer
                center={[
                  mapStation.location.coordinates[1],
                  mapStation.location.coordinates[0]
                ]}
                zoom={16}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker
                  position={[
                    mapStation.location.coordinates[1],
                    mapStation.location.coordinates[0]
                  ]}
                  icon={markerIcon}
                />
              </MapContainer>
            </div>
          </div>
        )}

      {editStation && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Edit Station</h2>

      <label>Name</label>
      <input
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
      />

      <label>Capacity</label>
      <input
        type="number"
        min="1"
        value={editCapacity}
        onChange={(e) => setEditCapacity(e.target.value)}
      />

      <label>Status</label>
      <select
        value={editStatus}
        onChange={(e) => setEditStatus(e.target.value)}
      >
        <option value="active">Active</option>
        <option value="maintenance">Maintenance</option>
        <option value="offline">Offline</option>
      </select>

      <div className="modal-actions">
        <button onClick={handleSaveEdit} className="save-btn">
          Save
        </button>

        <button
          onClick={() => setEditStation(null)}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      {newStationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Station</h2>

            <label>Name</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <label>Capacity</label>
            <input
              type="number"
              min="1"
              value={newCapacity}
              onChange={(e) => setNewCapacity(e.target.value)}
            />

            <label>Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="offline">Offline</option>
            </select>

            <label>Latitude</label>
            <input
              type="number"
              value={newLat}
              onChange={(e) => setNewLat(e.target.value)}
            />

            <label>Longitude</label>
            <input
              type="number"
              value={newLng}
              onChange={(e) => setNewLng(e.target.value)}
            />

            <div className="modal-actions">
              <button
                onClick={handleCreateStation}
                className="save-btn"
              >
                Create
              </button>

              <button
                onClick={() => setNewStationModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    {stationInfo && (
  <div
    className="modal-overlay"
    onClick={() => setStationInfo(null)}
  >
    <div
      className="station-popup"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="popup-header">
        <div className="popup-icon">🚁</div>
        <h2>{stationInfo.name}</h2>
      </div>

      <div className="popup-info">

        <div className="info-row">
          <span>Capacity</span>
          <strong>{stationInfo.capacity}</strong>
        </div>

        <div className="info-row">
          <span>Drones in station</span>
          <strong>{stationInfo.drones}</strong>
        </div>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${(stationInfo.drones / stationInfo.capacity) * 100}%`
            }}
          />
        </div>

        <div className="progress-text">
          {stationInfo.drones} / {stationInfo.capacity} drones
        </div>

      </div>

      <button
        className="close-popup-btn"
        onClick={() => setStationInfo(null)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default StationTable;