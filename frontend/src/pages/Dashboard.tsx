import Navbar from "./Navbar";
import UserDetails from "./userDetail";
import ServiceOverview from "./ServiceOverview";
import StructureMaps from "./StructuresMap";

const Dashboard = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <ServiceOverview />
      <div className="flex justify-between">
        <UserDetails />
        <StructureMaps />
      </div>
    </div>
  );
};

export default Dashboard;
