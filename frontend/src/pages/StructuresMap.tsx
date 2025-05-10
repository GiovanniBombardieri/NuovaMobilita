import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const userIcon = new L.Icon({
  iconUrl: "/markers/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/markers/marker-shadow.png",
  shadowSize: [41, 41],
});

type Structure = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

type Props = {
  structures: Structure[];
  userLocation?: { lat: number; lng: number };
};

const StructureMaps = ({ structures, userLocation }: Props) => {
  const defaultPosition = userLocation || { lat: 41.9028, lng: 12.4964 };

  return (
    <MapContainer
      center={[defaultPosition.lat, defaultPosition.lng] as [number, number]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-1/3 mb-5 mx-5 rounded-lg shadow"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>Tu sei qui</Popup>
        </Marker>
      )}

      {structures.map((structure) => (
        <Marker key={structure.id} position={[structure.lat, structure.lng]}>
          <Popup>{structure.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default StructureMaps;
