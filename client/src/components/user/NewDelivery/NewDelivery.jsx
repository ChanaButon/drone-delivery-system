// NewDelivery.js
import { useState } from "react";
import "./NewDelivery.css";

const NewDelivery = () => {
  const [formData, setFormData] = useState({
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    pickupAddress: "",
    weight: "",
    deliveryType: "REGULAR"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // כאן תשלחי את הנתונים ל-Backend
  };

  return (
    <div className="new-delivery">
      <h2>New Delivery</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="receiverName"
          placeholder="Recipient Name"
          value={formData.receiverName}
          onChange={handleChange}
          required
        />
        <input
          name="receiverPhone"
          placeholder="Recipient Phone"
          value={formData.receiverPhone}
          onChange={handleChange}
        />
        <input
          name="receiverAddress"
          placeholder="Destination Address"
          value={formData.receiverAddress}
          onChange={handleChange}
          required
        />
        <input
          name="pickupAddress"
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={handleChange}
          required
        />
        <input
          name="weight"
          placeholder="Package Weight (kg)"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <select
          name="deliveryType"
          value={formData.deliveryType}
          onChange={handleChange}
        >
          <option value="REGULAR">Standard</option>
          <option value="FAST">Express</option>
        </select>
        <button type="submit">Launch Delivery Drone</button>
      </form>
    </div>
  );
};

export default NewDelivery;