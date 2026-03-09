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
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./DeliveryDetails.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const DeliveryDetails = ({ delivery, onClose }) => {

  const lat = delivery?.pickupLocation?.coordinates?.[1];
  const lng = delivery?.pickupLocation?.coordinates?.[0];

  const [showMap, setShowMap] = useState(false);

  if (!delivery) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("delivery-overlay")) {
      onClose();
    }
  };

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
            <FlightTakeoffIcon className="info-icon"/>
            <div>
              <span className="info-title">Pickup Location</span>
              <p>{delivery.pickupLocation?.address}</p>
            </div>
          </div>

          <div className="info-block">
            <LocationOnIcon className="info-icon"/>
            <div>
              <span className="info-title">Delivery Location</span>
              <p>{delivery.deliveryLocation?.address}</p>
            </div>
          </div>

          <div className="info-block">
            <ScaleIcon className="info-icon"/>
            <div>
              <span className="info-title">Weight</span>
              <p>{delivery.weightRange} kg</p>
            </div>
          </div>

          <div className="info-block">
            <LocalShippingIcon className="info-icon"/>
            <div>
              <span className="info-title">Delivery Type</span>
              <p>{delivery.deliveryType}</p>
            </div>
          </div>

          <div className="info-block">
            <PaymentsIcon className="info-icon"/>
            <div>
              <span className="info-title">Price</span>
              <p>${delivery.price}</p>
            </div>
          </div>

          <div className="info-block">
            <AccessTimeIcon className="info-icon"/>
            <div>
              <span className="info-title">Created At</span>
              <p>{new Date(delivery.createdAt).toLocaleString()}</p>
            </div>
          </div>

        </div>

        <div className="actions">
          {delivery.status === "CREATED" && (
            <>
              <button onClick={() => handleUpdate(delivery._id)}>Update</button>
              <button onClick={() => handleDelete(delivery._id)}>Delete</button>
            </>
          )}
        </div>

        <div className="map-preview">
          <MapIcon
            style={{ fontSize: 36, color: "#2563eb", cursor: "pointer" }}
            onClick={() => setShowMap(!showMap)}
          />
        </div>

        {showMap && lat && lng && (
          <div style={{height:"260px", marginTop:"20px", borderRadius:"14px", overflow:"hidden"}}>
            <MapContainer
              center={[lat, lng]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, lng]} icon={markerIcon}/>
            </MapContainer>
          </div>
        )}

      </div>

    </div>
  );
};

export default DeliveryDetails;