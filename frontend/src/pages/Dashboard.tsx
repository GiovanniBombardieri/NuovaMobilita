import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import UserDetails from "./userDetail";
import ServiceOverview from "./ServiceOverview";
import StructureMaps from "./StructuresMap";

const Dashboard = () => {
  const { user } = useAuth();

  const userLocation = user?.location
    ? user.location
    : {
        lat: 41.9028,
        lng: 12.4964,
      };
  return (
    <div className="h-screen">
      <Navbar />
      <ServiceOverview />
      <div className="flex justify-between">
        <UserDetails />
        <StructureMaps
          structures={[
            { id: 1, name: "Ospedale A", lat: 41.8902, lng: 12.4922 },
            { id: 2, name: "Clinica B", lat: 41.9002, lng: 12.4962 },
          ]}
          userLocation={userLocation}
        />
      </div>
    </div>
  );
};

export default Dashboard;
