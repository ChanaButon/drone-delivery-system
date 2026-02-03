import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import droneIconImg from "../../assets/drone.png";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

const droneIcon = new L.Icon({
  iconUrl: droneIconImg,
  iconSize: [40, 40],
});

const initialDrones = [
  { id: "Drone 1", lat: 32.0853, lng: 34.7818, delivery: "#1234" },
  { id: "Drone 2", lat: 32.0860, lng: 34.7800, delivery: "#5678" },
];

const MapView = () => {
  const [drones, setDrones] = useState(initialDrones);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrones((prevDrones) =>
        prevDrones.map((d) => ({
          ...d,
          lat: d.lat + (Math.random() - 0.5) * 0.0005,
          lng: d.lng + (Math.random() - 0.5) * 0.0005,
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="map-view">
      <h2>מיקום רחפנים בזמן אמת</h2>
      <MapContainer center={[32.0853, 34.7818]} zoom={15} scrollWheelZoom style={{ height: "500px", borderRadius: "10px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {drones.map((d) => (
          <Marker key={d.id} position={[d.lat, d.lng]} icon={droneIcon}>
            <Popup>
              <strong>{d.id}</strong>
              <br />
              משלוח: {d.delivery}
              <br />
              מיקום: {d.lat.toFixed(5)}, {d.lng.toFixed(5)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
