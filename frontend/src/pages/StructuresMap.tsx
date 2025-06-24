import { useAuth, User, Structure } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function isStructure(user: User | Structure | null): user is Structure {
  return (user as Structure)?.role === "structure";
}

const userIcon = new L.Icon({
  iconUrl: "/markers/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  // shadowUrl: "/markers/marker-shadow.png",
  shadowSize: [41, 41],
});
const structureIcon = new L.Icon({
  iconUrl: "/markers/marker-icon-blue.png",
  iconSize: [25, 30],
  iconAnchor: [12, 30],
  popupAnchor: [1, -25],
  // shadowUrl: "/markers/marker-shadow.png",
  shadowSize: [30, 30],
});

type StructureMap = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

type Props = {
  structures: StructureMap[];
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
        isStructure(user)
          ? "lg:w-1/2 lg:h-full h-[500px] lg:overflow-auto"
          : "w-full lg:h-full h-[500px]"
      } rounded-lg shadow overflow-scroll`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {structures.map((structure) => (
        <Marker
          key={structure.id}
          position={[structure.lat, structure.lng]}
          icon={structureIcon}
        >
          <Popup>{structure.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default StructureMaps;
