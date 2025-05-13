import { useAuth, User, Struttura } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Funzioni di type guard
function isStruttura(user: User | Struttura | null): user is Struttura {
  return (user as Struttura)?.ruolo === "struttura";
}

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
  const { user } = useAuth();
  const defaultPosition = userLocation || { lat: 41.9028, lng: 12.4964 };

  return (
    <MapContainer
      center={[defaultPosition.lat, defaultPosition.lng] as [number, number]}
      zoom={10}
      scrollWheelZoom={true}
      className={`${
        isStruttura(user) ? "w-1/2 h-full overflow-auto" : "w-full h-full"
      } rounded-lg shadow`}
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
