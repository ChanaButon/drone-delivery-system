import "./DroneTable.css";

const DeleteDroneModal = ({ drone, onClose, deleteMutation }) => {
  const handleDelete = () => {
    deleteMutation.mutate(drone._id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Are you sure?</h3>
        <p>Do you really want to delete {drone.model}?</p>
        <div className="modal-actions">
          <button className="danger-btn" onClick={handleDelete}>
            Yes, Delete
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDroneModal;