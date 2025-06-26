import { useState, useEffect } from "react";
import axios from "axios";
import {
  useAuth,
  User,
  Structure,
  GeocodingStructure,
} from "../context/AuthContext";
import Navbar from "./Navbar";
import UserDetails from "./userDetail";
import ServiceOverview from "./ServiceOverview";
import StructureMaps from "./StructuresMap";
import Performance from "./Perfomance";
import Structures from "./Structures";

// Type guard functions
function isUser(user: User | Structure | null): user is User {
  return (user as User)?.role === "user";
}

function isStructure(user: User | Structure | null): user is Structure {
  return (user as Structure)?.role === "structure";
}

const geocodeAddress = async (address: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/geocode?q=${encodeURIComponent(address)}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }
  throw new Error("Geocoding failed.");
};

const Dashboard = () => {
  const { user } = useAuth();
  const [structure, setStructure] = useState<Structure[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const fetchStructureWithGeocode = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/structures`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        const structureWithCoordinate = await Promise.all(
          res.data.data.map(async (structure: GeocodingStructure) => {
            const fullAddress = `${structure.position.street} ${structure.position.civic_number}, ${structure.position.cap} ${structure.position.city}, ${structure.position.province}`;

            try {
              const location = await geocodeAddress(fullAddress);
              return { ...structure, location };
            } catch (err) {
              console.warn(`Geocoding failed for ${fullAddress}`, err);
              return structure;
            }
          })
        );

        setStructure(structureWithCoordinate);
        setIsLoading(true);
      } catch (err) {
        console.error("Error in the recovery of the structures", err);
        setIsLoading(false);
      }
    };

    if (user?.token) {
      fetchStructureWithGeocode();
    }
  }, [user?.token]);

  const mappedStructure = structure
    .filter(
      (s): s is Structure & { location: { lat: number; lng: number } } =>
        !!s.location &&
        (!isStructure(user) || s.structure_id !== user.structure_id)
    )
    .map((s, index) => ({
      id: index + 1,
      name: s.corporate,
      lat: s.location.lat,
      lng: s.location.lng,
    }));

  useEffect(() => {
    if (mappedStructure) {
      setIsLoading(true);
    }
  }, [mappedStructure]);

  const userLocation = user?.location
    ? user.location
    : {
        lat: 41.9028,
        lng: 12.4964,
      };

  if (!user) return null;

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Navbar setLogoutLoading={setLogoutLoading} />

      {logoutLoading ? (
        <div className="w-full h-full flex flex-col justify-center items-center py-8">
          {user.role === "user" ? (
            <>
              <p className="text-xl">
                ✨ Grazie per aver utilizzato Nuova Mobilità!
              </p>
              <br />
              <p className="text-xl">
                {" "}
                Alla prossima esperienza insieme — ti aspettiamo per scoprire
                nuovi servizi e opportunità vicino a te! 🚀💙
              </p>
            </>
          ) : (
            <>
              <p className="text-xl">
                👏 Grazie per esserti affidato a Nuova Mobilità!
              </p>
              <br />
              <p className="text-xl">
                Continua a far crescere la tua visibilità e a offrire servizi di
                qualità: ti aspettiamo presto per nuove opportunità e successi
                condivisi. 🌐🚀
              </p>
            </>
          )}
          <br />
          <br />
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <>
          {isStructure(user) ? (
            // STRUCTURE LAYOUT
            <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
              {/** Left column */}
              <div className="flex flex-col w-full lg:w-2/3 h-full">
                <div className="flex-1 lg:overflow-auto pt-4 lg:pl-4 pl-1 pb-2 lg:pr-2 pr-1">
                  <ServiceOverview />
                </div>
                <div className="flex-1 flex flex-col lg:flex-row justify-between lg:overflow-hidden lg:pl-4 pl-1 pb-1 pt-2 lg:pr-2 pr-1 gap-4">
                  <UserDetails />
                  {isLoading ? (
                    <StructureMaps
                      structures={mappedStructure}
                      userLocation={userLocation}
                    />
                  ) : null}
                </div>
              </div>
              {/** Right column */}
              <div className="h-full  w-full lg:w-1/3 lg:pl-2 pl-1 lg:py-4 py-1 lg:pr-4 pr-1 overflow-auto">
                {isStructure(user) ? <Performance /> : null}
              </div>
            </div>
          ) : isUser(user) ? (
            // USER LAYOUT
            <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
              {/** Left column */}
              <div className="flex flex-col w-full lg:w-2/3 h-full">
                <div className="flex-1 lg:overflow-auto pt-4 lg:pl-4 pl-1 pb-2 lg:pr-2 pr-1">
                  <ServiceOverview />
                </div>
                <div className="flex-1 flex flex-col lg:flex-row justify-between lg:overflow-hidden lg:pl-4 pl-1 pb-4 pt-2 lg:pr-2 pr-1 gap-4">
                  <UserDetails />
                  {isStructure(user) ? <Performance /> : <Structures />}
                </div>
              </div>
              {/** Right column */}
              <div className="h-full w-full lg:w-1/3 lg:pl-2 pl-1 lg:py-4 py-1 lg:pr-4 pr-1 lg:overflow-auto">
                {isLoading ? (
                  <StructureMaps
                    structures={mappedStructure}
                    userLocation={userLocation}
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Dashboard;
