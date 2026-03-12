import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendDroneToCharging,
  sendDroneToMaintenance,
  setDroneAvailable,
  assignDroneToStation 
} from "../../../api/drone-function.js";
import {getStationsWithCapacity} from "../../../api/baseStation-function.js"
import { Zap, Settings, Check } from "lucide-react";
import { showSuccess, showError, showConfirm } from "../../../utils/popup.js";
import "./DroneTable.css";

const ManageDroneModal = ({ drone, onClose }) => {
  const queryClient = useQueryClient();
 const [selectedStation, setSelectedStation] = useState(drone.baseStationId?._id || "");
  const [status, setStatus] = useState(drone.status);

  const { data: stations = [] } = useQuery({
  queryKey: ["stationsWithCapacity"],
  queryFn: getStationsWithCapacity,
});


console.log(stations);

  const chargeMutation = useMutation({
  mutationFn: sendDroneToCharging,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["drones"] });
    showSuccess("Drone sent to charging successfully");
  },
  onError: (err) => {
    showError(err.message);
  }
});

const maintenanceMutation = useMutation({
  mutationFn: sendDroneToMaintenance,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["drones"] });
    showSuccess("Drone sent to maintenance");
  },
  onError: (err) => {
    showError(err.message);
  }
});

const availableMutation = useMutation({
  mutationFn: setDroneAvailable,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["drones"] });
    showSuccess("Drone is now available");
  },
  onError: (err) => {
    showError(err.message);
  }
});

const assignStationMutation = useMutation({
  mutationFn: ({ droneId, stationId }) =>
    assignDroneToStation(droneId, stationId),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["drones"] });
    showSuccess("Drone assigned to station successfully");
  },

  onError: (err) => {
    showError(err.message);
  }
});

 const handleUpdate = async () => {
  try {

    if (
      selectedStation &&
      selectedStation !== drone.baseStationId?._id
    ) {
      await assignStationMutation.mutateAsync({
        droneId: drone._id,
        stationId: selectedStation
      });
    }

    if (status !== drone.status) {

      if (status === "charging") {
        await chargeMutation.mutateAsync(drone._id);
      }

      else if (status === "InMaintenance") {
        await maintenanceMutation.mutateAsync(drone._id);
      }

      else if (status === "available") {
        await availableMutation.mutateAsync(drone._id);
      }

    }

    queryClient.invalidateQueries({ queryKey: ["drones"] });

    onClose();

  } catch (error) {
     showError(error.message)
  }
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
            className={`status-btn ${status === "InMaintenance" ? "active" : ""}`}
            onClick={() => setStatus("InMaintenance")}
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