import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

const Location = () => {
  const user = {
    username: "JohnDoe",
    location: [34.920881, -2.321294],
  };

  return (
    <div className="skills-section px-3 px-lg-4">
        <h2 className="h3 mb-3 competence announces-h3">Location</h2>
      <div className="announces-header">
        <MapContainer
          center={user.location}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={user.location}>
            <Popup>User's Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Location;
