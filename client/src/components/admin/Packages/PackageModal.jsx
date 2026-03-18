import { useState } from "react";
import "./PackageModal.css";

const PackageModal = ({ pkg, onClose, onDelete, onUpdate }) => {
  if (!pkg) return null;

  const isCreated = pkg.status === "CREATED";
  const [form, setForm] = useState({
    pickupAddress: pkg.pickupLocation?.address || "",
    deliveryAddress: pkg.deliveryLocation?.address || "",
    weightRange: pkg.weightRange || "",
    deliveryType: pkg.deliveryType || ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedData = {
      pickupLocation: {
        ...pkg.pickupLocation,
        address: form.pickupAddress || pkg.pickupLocation?.address
      },
      deliveryLocation: {
        ...pkg.deliveryLocation,
        address: form.deliveryAddress || pkg.deliveryLocation?.address
      },
      weightRange: form.weightRange || pkg.weightRange,
      deliveryType: form.deliveryType || pkg.deliveryType
    };
    onUpdate(updatedData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>📦 Package Details</h2>

        <div className="modal-grid">
          <p><strong>ID:</strong> {pkg._id}</p>
          <p><strong>Status:</strong> {pkg.status}</p>
          <p><strong>Sender:</strong> {pkg.senderId?.name}</p>
          <p><strong>Receiver:</strong> {pkg.receiver?.name}</p>
          <p><strong>Phone:</strong> {pkg.receiver?.phone}</p>

          {isCreated ? (
            <>
              <input
                name="pickupAddress"
                placeholder="Pickup Address"
                value={form.pickupAddress}
                onChange={handleChange}
              />
              <input
                name="deliveryAddress"
                placeholder="Delivery Address"
                value={form.deliveryAddress}
                onChange={handleChange}
              />
              <select name="weightRange" value={form.weightRange} onChange={handleChange}>
                <option value="">Select Weight</option>
                <option value="0-5">0-5</option>
                <option value="5-10">5-10</option>
                <option value="10-20">10-20</option>
              </select>
              <select name="deliveryType" value={form.deliveryType} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="REGULAR">Regular</option>
                <option value="FAST">Fast</option>
              </select>
            </>
          ) : (
            <>
              <p><strong>Weight:</strong> {pkg.weightRange}</p>
              <p><strong>Type:</strong> {pkg.deliveryType}</p>
              <p><strong>Pickup:</strong> {pkg.pickupLocation?.address}</p>
              <p><strong>Delivery:</strong> {pkg.deliveryLocation?.address}</p>
            </>
          )}
        </div>

        {isCreated && (
          <div className="modal-actions">
            <button className="edit-btn" onClick={handleSave}>Save</button>
            <button className="delete-btn" onClick={() => onDelete(pkg._id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageModal;