import { useAuth, User, Struttura } from "../context/AuthContext";
import Navbar from "./Navbar";
import UserDetails from "./userDetail";
import ServiceOverview from "./ServiceOverview";
import StructureMaps from "./StructuresMap";
import Prestazioni from "./Prestazioni";
import Strutture from "./Strutture";

// Funzioni di type guard
function isUser(user: User | Struttura | null): user is User {
  return (user as User)?.ruolo === "utente";
}

function isStruttura(user: User | Struttura | null): user is Struttura {
  return (user as Struttura)?.ruolo === "struttura";
}

const Dashboard = () => {
  const { user } = useAuth();

  const userLocation = user?.location
    ? user.location
    : {
        lat: 41.9028,
        lng: 12.4964,
      };

  if (!user) return null;

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />

      {isStruttura(user) ? (
        // Layout per STRUTTURA
        <div className="flex-1 flex flex-row overflow-hidden">
          {/** Colonna sinistra */}
          <div className="flex flex-col w-2/3 h-full">
            <div className="flex-1 overflow-auto pt-4 pl-4 pb-2 pr-2">
              <ServiceOverview />
            </div>
            <div className="flex-1 flex flex-row justify-between overflow-hidden pl-4 pb-4 pt-2 pr-2 gap-4">
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
          {/** Colonna destra */}
          <div className="h-full w-1/3 pl-2 py-4 pr-4 overflow-auto">
            {isStruttura(user) ? <Prestazioni /> : null}
          </div>
        </div>
      ) : isUser(user) ? (
        // Layout per UTENTE
        <div className="flex-1 flex flex-row overflow-hidden">
          {/** Colonna sinistra */}
          <div className="flex flex-col w-2/3 h-full">
            <div className="flex-1 overflow-auto pt-4 pl-4 pb-2 pr-2">
              <ServiceOverview />
            </div>
            <div className="flex-1 flex flex-row justify-between overflow-hidden pl-4 pb-4 pt-2 pr-2 gap-4">
              <UserDetails />
              {isStruttura(user) ? <Prestazioni /> : <Strutture />}
            </div>
          </div>
          {/** Colonna destra */}
          <div className="h-full w-1/3 pl-2 py-4 pr-4 overflow-auto">
            <StructureMaps
              structures={[
                { id: 1, name: "Ospedale A", lat: 41.8902, lng: 12.4922 },
                { id: 2, name: "Clinica B", lat: 41.9002, lng: 12.4962 },
              ]}
              userLocation={userLocation}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
