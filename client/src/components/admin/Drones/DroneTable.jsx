import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Edit, Zap, Check, Settings, Plus } from "lucide-react";
import {
  getAllDrones,
  deleteDrone,
  sendDroneToCharging,
  sendDroneToMaintenance,
  setDroneAvailable,
  createDrone // הוספתי את הפונקציה הזו
} from "../../../api/drone-function.js";
import "./DroneTable.css";

const DroneTable = () => {
  const queryClient = useQueryClient();
  const [popupOpen, setPopupOpen] = useState(false);
  const [newDrone, setNewDrone] = useState({ model: "", batteryLevel: "" });

  const { data: drones = [], isLoading, isError } = useQuery({
    queryKey: ["drones"],
    queryFn: getAllDrones
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDrone,
    onSuccess: () => queryClient.invalidateQueries(["drones"])
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

  // 🔹 Mutation ליצירת רחפן חדש
  const createMutation = useMutation({
    mutationFn: createDrone,
    onSuccess: () => {
      queryClient.invalidateQueries(["drones"]);
      setPopupOpen(false);
      setNewDrone({ model: "", batteryLevel: "" });
    }
  });

  if (isLoading) return <p>Loading drones...</p>;
  if (isError) return <p>Error loading drones</p>;

  const getBatteryClass = (level) => {
    if (level > 80) return "battery-high";
    if (level > 40) return "battery-medium";
    return "battery-low";
  };

  const handleAddDrone = () => {
    // המרה ל-number של הסוללה
    const payload = {
      ...newDrone,
      batteryLevel: Number(newDrone.batteryLevel)
    };
    createMutation.mutate(payload);
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
            <th>Model</th>
            <th>Status</th>
            <th>Battery</th>
            <th>Station</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {drones.map((drone) => (
            <tr key={drone._id}>
              <td>{drone._id}</td>
              <td>{drone.model}</td>
              <td>
                <span className={`status-badge ${drone.status}`}>
                  {drone.status === "charging" && <Zap size={14} />}
                  {drone.status === "maintenance" && <Settings size={14} />}
                  {drone.status === "available" && <Check size={14} />}
                  {drone.status}
                </span>
              </td>
              <td>
                <span className={`battery-badge ${getBatteryClass(drone.batteryLevel)}`}>
                  {drone.batteryLevel}%
                </span>
              </td>
              <td>{drone.station ? drone.station.name : "Not Assigned"}</td>
              <td>
                <div className="actions">
                  <button className="edit-btn">
                    <Edit size={16} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMutation.mutate(drone._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                  {drone.status !== "charging" && (
                    <button
                      className="charge-btn"
                      onClick={() => chargeMutation.mutate(drone._id)}
                    >
                      ⚡
                    </button>
                  )}
                  {drone.status !== "maintenance" && (
                    <button
                      className="maintenance-btn"
                      onClick={() => maintenanceMutation.mutate(drone._id)}
                    >
                      🛠
                    </button>
                  )}
                  {drone.status !== "available" && (
                    <button
                      className="available-btn"
                      onClick={() => availableMutation.mutate(drone._id)}
                    >
                      ✅
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 כפתור הוספה */}
      <button className="add-drone-btn" onClick={() => setPopupOpen(true)}>
        <Plus size={18} /> Add Drone
      </button>

      {/* 🔹 Popup */}
      {popupOpen && (
        <div className="popup-overlay" onClick={() => setPopupOpen(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Drone</h3>
            <input
              type="text"
              placeholder="Drone Model"
              value={newDrone.model}
              onChange={(e) => setNewDrone({ ...newDrone, model: e.target.value })}
            />
            <input
              type="number"
              placeholder="Battery Level (%)"
              value={newDrone.batteryLevel}
              onChange={(e) => setNewDrone({ ...newDrone, batteryLevel: e.target.value })}
            />
            <button className="submit-btn" onClick={handleAddDrone}>
              Add
            </button>
            <button className="cancel-btn" onClick={() => setPopupOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DroneTable;