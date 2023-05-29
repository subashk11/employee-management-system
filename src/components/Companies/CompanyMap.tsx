import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import redIcon from "../../Resources/location.png";
import "leaflet/dist/images/marker-shadow.png";

// Create a custom red icon
const redMarker = new L.Icon({
  iconUrl: redIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "marker-shadow.png",
  shadowSize: [41, 41],
});

const Map = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    if (map) {
      map.setView([latitude, longitude], 13);
    }
  }, [latitude, longitude, map]);


  return (
    <div style={{ border: "2px solid red" }}>
      <MapContainer center={[latitude, longitude]} zoom={11} style={{ height: "400px" }}  whenReady={() => {}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data © OpenStreetMap contributors"
        />
        <Marker position={[latitude, longitude]} icon={redMarker}>
          <Popup>
            Latitude: {latitude}, Longitude: {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
