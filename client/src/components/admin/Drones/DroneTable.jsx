import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Edit, Plus, Zap, Check, Settings,Battery, BatteryLow} from "lucide-react";
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
import "./DroneTable.css";

const DroneTable = () => {
  const queryClient = useQueryClient();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [manageDroneSelected, setManageDroneSelected] = useState(null);

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

      <button className="add-drone-btn" onClick={() => setAddModalOpen(true)}>
        <Plus size={18} /> Add Drone
      </button>

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