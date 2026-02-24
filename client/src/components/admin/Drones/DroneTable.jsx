import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Edit, Zap, Check, Settings } from "lucide-react";
import {
  getAllDrones,
  deleteDrone,
  sendDroneToCharging,
  sendDroneToMaintenance,
  setDroneAvailable
} from "../../../api/drone-function.js";
import "./DroneTable.css";

const DroneTable = () => {
  const queryClient = useQueryClient();
  const [selectedDrone, setSelectedDrone] = useState(null);

  // 🔹 Fetch drones
  const { data: drones = [], isLoading, isError } = useQuery({
    queryKey: ["drones"],
    queryFn: getAllDrones
  });

  // 🔹 DELETE drone
  const deleteMutation = useMutation({
    mutationFn: deleteDrone,
    onSuccess: () => queryClient.invalidateQueries(["drones"])
  });

  // 🔹 Charging
  const chargeMutation = useMutation({
    mutationFn: sendDroneToCharging,
    onSuccess: () => queryClient.invalidateQueries(["drones"])
  });

  // 🔹 Maintenance
  const maintenanceMutation = useMutation({
    mutationFn: sendDroneToMaintenance,
    onSuccess: () => queryClient.invalidateQueries(["drones"])
  });

  // 🔹 Set available
  const availableMutation = useMutation({
    mutationFn: setDroneAvailable,
    onSuccess: () => queryClient.invalidateQueries(["drones"])
  });

  if (isLoading) return <p>Loading drones...</p>;
  if (isError) return <p>Error loading drones</p>;

  // 🔹 Function to determine battery color
  const getBatteryClass = (level) => {
    if (level > 80) return "battery-high";
    if (level > 40) return "battery-medium";
    return "battery-low";
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
                  {/* Edit button */}
                  <button className="edit-btn">
                    <Edit size={16} />
                  </button>

                  {/* Delete button */}
                  <button
                    className="delete-btn"
                    onClick={() => deleteMutation.mutate(drone._id)}
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Charging button */}
                  {drone.status !== "charging" && (
                    <button
                      className="charge-btn"
                      onClick={() => chargeMutation.mutate(drone._id)}
                    >
                      ⚡
                    </button>
                  )}

                  {/* Maintenance button */}
                  {drone.status !== "maintenance" && (
                    <button
                      className="maintenance-btn"
                      onClick={() => maintenanceMutation.mutate(drone._id)}
                    >
                      🛠
                    </button>
                  )}

                  {/* Set Available */}
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
    </div>
  );
};

export default DroneTable;