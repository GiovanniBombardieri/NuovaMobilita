import { useState, useEffect } from "react";
import axios from "axios";
import {
  useAuth,
  User,
  Struttura,
  StrutturaGeocoding,
} from "../context/AuthContext";
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

const geocodeAddress = async (address: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }
  throw new Error("Geocoding fallito.");
};

const Dashboard = () => {
  const { user } = useAuth();
  const [strutture, setStrutture] = useState<Struttura[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStruttureConGeocode = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/get_strutture`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const struttureConCoordinate = await Promise.all(
          res.data.data.map(async (struttura: StrutturaGeocoding) => {
            const fullAddress = `${struttura.posizione.via} ${struttura.posizione.numero_civico}, ${struttura.posizione.cap} ${struttura.posizione.comune}, ${struttura.posizione.provincia}`;

            try {
              const location = await geocodeAddress(fullAddress);
              return { ...struttura, location };
            } catch (err) {
              console.warn(`Geocoding fallito per ${fullAddress}`, err);
              return struttura;
            }
          })
        );

        setStrutture(struttureConCoordinate);
        setIsLoading(true);
      } catch (err) {
        console.error("Errore nel recupero delle strutture", err);
        setIsLoading(false);
      }
    };

    if (user?.token) {
      fetchStruttureConGeocode();
    }
  }, [user?.token]);

  const struttureMappate = strutture
    .filter(
      (s): s is Struttura & { location: { lat: number; lng: number } } =>
        !!s.location
    )
    .map((s, index) => ({
      id: index + 1,
      name: s.ragione_sociale,
      lat: s.location.lat,
      lng: s.location.lng,
    }));

  useEffect(() => {
    if (struttureMappate) {
      setIsLoading(true);
    }
  }, [struttureMappate]);

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
              {isLoading ? (
                <StructureMaps
                  structures={struttureMappate}
                  userLocation={userLocation}
                />
              ) : null}
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
            {isLoading ? (
              <StructureMaps
                structures={struttureMappate}
                userLocation={userLocation}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
