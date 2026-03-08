import { useState } from "react";
import "./DroneTable.css";

const AddDroneModal = ({ onClose, createMutation }) => {
  const [model, setModel] = useState("");

  const handleAdd = () => {
    if (!model) return;
    createMutation.mutate({ model });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Add New Drone</h3>
        <input
          type="text"
          placeholder="Drone Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddDroneModal;