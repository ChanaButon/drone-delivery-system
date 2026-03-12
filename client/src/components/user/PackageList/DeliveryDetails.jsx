import { useQueryClient } from "@tanstack/react-query";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ScaleIcon from "@mui/icons-material/Scale";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import MapIcon from "@mui/icons-material/Map";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { deleteDelivery, updateDelivery } from "../../../api/delivery-function";
import { showSuccess,showConfirm,showError  } from "../../../utils/popup";


import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./DeliveryDetails.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const DeliveryDetails = ({ delivery, onClose }) => {
  const queryClient = useQueryClient();
  const [showMap, setShowMap] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [pickupCity, setPickupCity] = useState("");
  const [pickupStreet, setPickupStreet] = useState("");
  const [pickupNumber, setPickupNumber] = useState("");

  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryStreet, setDeliveryStreet] = useState("");
  const [deliveryNumber, setDeliveryNumber] = useState("");

  const [weightRange, setWeightRange] = useState(delivery.weightRange);
  const [deliveryType, setDeliveryType] = useState(delivery.deliveryType);

  if (!delivery) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("delivery-overlay")) {
      onClose();
    }
  };

 const handleDelete = async (id) => {
  const confirmDelete = await showConfirm("Are you sure you want to delete this delivery?");
if (!confirmDelete) return;

  try {
    await deleteDelivery(id);

   queryClient.invalidateQueries({ queryKey: ["deliveries"] });

    showSuccess("Delivery deleted successfully");
    onClose();

  } catch (err) {
  
    showError("Delete failed");
  }
};

const handleSave = async () => {
  try {
    const payload = {
      pickupCity,
      pickupStreet,
      pickupNumber,
      deliveryCity,
      deliveryStreet,
      deliveryNumber,
      weightRange,
      deliveryType
    };

    await updateDelivery(delivery._id, payload);

    queryClient.invalidateQueries({ queryKey: ["deliveries"] });

    showSuccess("Delivery updated successfully");
    setIsEditing(false);
    onClose();

  } catch (err) {
    showError("Update failed");
  }
};



  const parseAddress = (address) => {
    if (!address) return ["", "", ""];
    const parts = address.split(",");
    const city = parts[1]?.trim() || "";
    const streetAndNumber = parts[0]?.trim() || "";
    const match = streetAndNumber.match(/(.*)\s(\d+)$/);
    if (!match) return [streetAndNumber, "", city];
    const [, street, number] = match;
    return [street, number, city];
  };

  const [pickupStreetDefault, pickupNumberDefault, pickupCityDefault] = parseAddress(delivery.pickupLocation?.address);
  const [deliveryStreetDefault, deliveryNumberDefault, deliveryCityDefault] = parseAddress(delivery.deliveryLocation?.address);

  const latPickup = delivery.pickupLocation?.coordinates?.[1];
  const lngPickup = delivery.pickupLocation?.coordinates?.[0];
  const latDelivery = delivery.deliveryLocation?.coordinates?.[1];
  const lngDelivery = delivery.deliveryLocation?.coordinates?.[0];

  return (
    <div className="delivery-overlay" onClick={handleOverlayClick}>
      <div className="delivery-card">
        <button className="close-btn" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className="delivery-header">
          <h2>Delivery #{delivery._id.slice(-6)}</h2>
          <span className={`pkg-status ${delivery.status.toLowerCase()}`}>
            {delivery.status}
          </span>
        </div>

        <div className="delivery-grid">
          <div className="info-block">
            <FlightTakeoffIcon className="info-icon" />
            <div>
              <span className="info-title">Pickup Location</span>
              <p>{delivery.pickupLocation?.address}</p>
            </div>
          </div>

          <div className="info-block">
            <LocationOnIcon className="info-icon" />
            <div>
              <span className="info-title">Delivery Location</span>
              <p>{delivery.deliveryLocation?.address}</p>
            </div>
          </div>

          <div className="info-block">
            <ScaleIcon className="info-icon" />
            <div>
              <span className="info-title">Weight</span>
              <p>{delivery.weightRange} kg</p>
            </div>
          </div>

          <div className="info-block">
            <LocalShippingIcon className="info-icon" />
            <div>
              <span className="info-title">Delivery Type</span>
              <p>{delivery.deliveryType}</p>
            </div>
          </div>

          <div className="info-block">
            <PaymentsIcon className="info-icon" />
            <div>
              <span className="info-title">Price</span>
              <p>${delivery.price}</p>
            </div>
          </div>

          <div className="info-block">
            <AccessTimeIcon className="info-icon" />
            <div>
              <span className="info-title">Created At</span>
              <p>{new Date(delivery.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="actions">
          {delivery.status === "CREATED" && (
            <>
              <button
  className="update"
  onClick={() => {
    setPickupCity(pickupCityDefault);
    setPickupStreet(pickupStreetDefault);
    setPickupNumber(pickupNumberDefault);

    setDeliveryCity(deliveryCityDefault);
    setDeliveryStreet(deliveryStreetDefault);
    setDeliveryNumber(deliveryNumberDefault);

    setIsEditing(true);
  }}
>
  Update
</button>
              <button className="delete" onClick={() => handleDelete(delivery._id)}>Delete</button>
            </>
          )}
        </div>

        <div className="map-preview">
          <MapIcon
            style={{ fontSize: 36, color: "#2563eb", cursor: "pointer" }}
            onClick={() => setShowMap(!showMap)}
          />
        </div>

        {showMap && latPickup && lngPickup && (
          <div style={{ height: "260px", marginTop: "20px", borderRadius: "14px", overflow: "hidden" }}>
            <MapContainer center={[latPickup, lngPickup]} zoom={15} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[latPickup, lngPickup]} icon={markerIcon} />
            </MapContainer>
          </div>
        )}

        {isEditing && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Delivery</h2>

              <h3>Pickup Location</h3>
              <input
                placeholder="City"
                value={pickupCity }
                onChange={(e) => setPickupCity(e.target.value)}
              />
              <input
                placeholder="Street"
                value={pickupStreet }
                onChange={(e) => setPickupStreet(e.target.value)}
              />
              <input
                placeholder="Number"
                value={pickupNumber }
                onChange={(e) => setPickupNumber(e.target.value)}
              />

              <h3>Delivery Location</h3>
              <input
                placeholder="City"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
              />
              <input
                placeholder="Street"
                value={deliveryStreet}
                onChange={(e) => setDeliveryStreet(e.target.value)}
              />
              <input
                placeholder="Number"
                value={deliveryNumber}
                onChange={(e) => setDeliveryNumber(e.target.value)}
              />

              <h3>Weight & Type</h3>
              <select value={weightRange} onChange={(e) => setWeightRange(e.target.value)}>
                <option value="0-5">0-5 kg</option>
                <option value="5-10">5-10 kg</option>
                <option value="10-20">10-20 kg</option>
              </select>

              <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)}>
                <option value="REGULAR">Regular</option>
                <option value="FAST">Fast</option>
              </select>
              <div className="modal-actions">
                <button onClick={handleSave} className="save-btn">Save</button>
                <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DeliveryDetails;