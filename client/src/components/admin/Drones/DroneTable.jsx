import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Edit, Plus, Zap, Check, Settings } from "lucide-react";
import {
  getAllDrones,
  deleteDrone,
  createDrone,
  sendDroneToCharging,
  sendDroneToMaintenance,
  setDroneAvailable,
  
} from "../../../api/drone-function.js";
import AddDroneModal from "./AddDroneModal";
import DeleteDroneModal from "./DeleteDroneModal";
import ManageDroneModal from "./ManageDroneModal";
import "./DroneTable.css";

const DroneTable = () => {
  const queryClient = useQueryClient();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteDroneSelected, setDeleteDroneSelected] = useState(null);
  const [manageDroneSelected, setManageDroneSelected] = useState(null);

  const { data: drones = [], isLoading, isError } = useQuery({
    queryKey: ["drones"],
    queryFn: getAllDrones
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drones.map((drone) => (
            <tr key={drone._id}>
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
                  <button className="edit-btn" onClick={() => setManageDroneSelected(drone)}>
                    <Edit size={16} />
                  </button>
                  <button className="delete-btn" onClick={() => setDeleteDroneSelected(drone)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-drone-btn" onClick={() => setAddModalOpen(true)}>
        <Plus size={18} /> Add Drone
      </button>

      {addModalOpen && (
        <AddDroneModal
          onClose={() => setAddModalOpen(false)}
          createMutation={createMutation}
        />
      )}

      {deleteDroneSelected && (
        <DeleteDroneModal
          drone={deleteDroneSelected}
          onClose={() => setDeleteDroneSelected(null)}
          deleteMutation={deleteMutation}
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