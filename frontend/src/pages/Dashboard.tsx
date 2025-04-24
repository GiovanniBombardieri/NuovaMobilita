import Navbar from "./Navbar";
import UserDetails from "./userDetail";
import ServiceOverview from "./ServiceOverview";

const Dashboard = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <ServiceOverview />
      <UserDetails />
    </div>
  );
};

export default Dashboard;
