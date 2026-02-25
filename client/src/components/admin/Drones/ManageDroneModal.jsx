import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendDroneToCharging,
  sendDroneToMaintenance,
  setDroneAvailable
} from "../../../api/drone-function.js";
import { checkStationCapacity } from "../../../api/baseStation-function.js";
import { Zap, Settings, Check } from "lucide-react";
import "./DroneTable.css";

const ManageDroneModal = ({ drone, onClose }) => {
  const queryClient = useQueryClient();
  const [selectedStation, setSelectedStation] = useState(drone.station?._id || "");
  const [status, setStatus] = useState(drone.status);

  const { data: stations = [] } = useQuery({
    queryKey: ["availableStations"],
    queryFn: checkStationCapacity
  });

  const chargeMutation = useMutation({
    mutationFn: sendDroneToCharging,
    onSuccess: () => queryClient.invalidateQueries(["drones"])
  });

  const maintenanceMutation = useMutation({
    mutationFn: sendDroneToMaintenance,
    onSuccess: () => queryClient.invalidateQueries(["drones"])
  });

  const availableMutation = useMutation({
    mutationFn: setDroneAvailable,
    onSuccess: () => queryClient.invalidateQueries(["drones"])
  });

  const handleUpdate = async () => {
    if (status === "charging") {
      await chargeMutation.mutateAsync(drone._id);
    } else if (status === "maintenance") {
      await maintenanceMutation.mutateAsync(drone._id);
    } else if (status === "available") {
      await availableMutation.mutateAsync(drone._id);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <h3>Manage Drone: {drone.model}</h3>

        <label>
          Model
          <input type="text" value={drone.model} disabled />
        </label>

        <label>Status</label>
        <div className="status-buttons">
          <button
            className={`status-btn ${status === "available" ? "active" : ""}`}
            onClick={() => setStatus("available")}
          >
            <Check size={16} /> Available
          </button>
          <button
            className={`status-btn ${status === "charging" ? "active" : ""}`}
            onClick={() => setStatus("charging")}
          >
            <Zap size={16} /> Charging
          </button>
          <button
            className={`status-btn ${status === "maintenance" ? "active" : ""}`}
            onClick={() => setStatus("maintenance")}
          >
            <Settings size={16} /> Maintenance
          </button>
        </div>

        <label>
          Station
          <select value={selectedStation} onChange={(e) => setSelectedStation(e.target.value)}>
            <option value="">Not Assigned</option>
            {stations.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </label>

        <div className="modal-actions">
          <button onClick={handleUpdate}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ManageDroneModal;