import { useAuth, User, Struttura } from "../context/AuthContext";
import { useState } from "react";

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

const ModificaProfilo = () => {
  const { user, login } = useAuth();

  const [email, setEmail] = useState(user?.email || "");

  // Utente
  const [name, setName] = useState(isUser(user) ? user.name : "");
  const [cognome, setCognome] = useState(isUser(user) ? user.cognome : "");
  const [telefono, setTelefono] = useState(
    isUser(user) ? user.telefono || "" : ""
  );
  const [comuneUtente, setComuneUtente] = useState(
    isUser(user) ? user.comune : ""
  );
  const [provinciaUtente, setProvinciaUtente] = useState(
    isUser(user) ? user.provincia : ""
  );
  const [capUtente, setCapUtente] = useState(isUser(user) ? user.cap : "");
  const [viaUtente, setViaUtente] = useState(isUser(user) ? user.via : "");
  const [numero_civicoUtente, setNumeroCivicoUtente] = useState(
    isUser(user) ? user.numero_civico : ""
  );

  // Struttura
  const [ragione_sociale, setRagioneSociale] = useState(
    isStruttura(user) ? user.ragione_sociale : ""
  );
  const [telefonoStruttura, setTelefonoStruttura] = useState(
    isStruttura(user) ? user.telefono || "" : ""
  );

  const [comune, setComune] = useState(isStruttura(user) ? user.comune : "");
  const [provincia, setProvincia] = useState(
    isStruttura(user) ? user.provincia : ""
  );
  const [cap, setCap] = useState(isStruttura(user) ? user.cap : "");
  const [via, setVia] = useState(isStruttura(user) ? user.via : "");
  const [numero_civico, setNumeroCivico] = useState(
    isStruttura(user) ? user.numero_civico : ""
  );

  const updateProfile = async () => {
    const updateData = isUser(user)
      ? {
          email,
          name,
          cognome,
          telefono,
          comuneUtente,
          provinciaUtente,
          capUtente,
          viaUtente,
          numero_civicoUtente,
        }
      : {
          ragione_sociale,
          email,
          telefonoStruttura,
          comune,
          provincia,
          cap,
          via,
          numero_civico,
        };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok)
        throw new Error(
          "Errore nel salvataggio dei dati aggiornati del profilo"
        );

      const updateUser = await response.json();

      (document.getElementById("edit_profile") as HTMLDialogElement)?.close();

      const fullAddress = `${updateUser.via} ${updateUser.numero_civico}, ${updateUser.cap} ${updateUser.comune}, ${updateUser.provincia}`;
      try {
        const location = await geocodeAddress(fullAddress);

        if (updateUser.ruolo === "utente") {
          login({
            name: updateUser.name,
            cognome: updateUser.cognome,
            telefono: updateUser.telefono,
            ruolo: updateUser.ruolo,
            email: updateUser.email,
            token: updateUser.access_token,
            comune: updateUser.comune,
            provincia: updateUser.provincia,
            via: updateUser.via,
            numero_civico: updateUser.numero_civico,
            cap: updateUser.cap,
            location: location,
          });

          window.location.reload();
        } else if (updateUser.ruolo === "struttura") {
          login({
            ragione_sociale: updateUser.ragione_sociale,
            comune: updateUser.comune,
            provincia: updateUser.provincia,
            via: updateUser.via,
            numero_civico: updateUser.numero_civico,
            cap: updateUser.cap,
            ruolo: updateUser.ruolo,
            email: updateUser.email,
            telefono: updateUser.telefono,
            token: updateUser.access_token,
            location: location,
          });

          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        const defaultLocation = {
          lat: 41.9028,
          lng: 12.4964,
        };
        if (updateUser.ruolo === "utente") {
          login({
            name: updateUser.name,
            cognome: updateUser.cognome,
            telefono: updateUser.telefono,
            ruolo: updateUser.ruolo,
            email: updateUser.email,
            token: updateUser.access_token,
            comune: updateUser.comune,
            provincia: updateUser.provincia,
            via: updateUser.via,
            numero_civico: updateUser.numero_civico,
            cap: updateUser.cap,
            location: defaultLocation,
          });

          window.location.reload();
        } else if (updateUser.ruolo === "struttura") {
          login({
            ragione_sociale: updateUser.ragione_sociale,
            comune: updateUser.comune,
            provincia: updateUser.provincia,
            via: updateUser.via,
            numero_civico: updateUser.numero_civico,
            cap: updateUser.cap,
            ruolo: updateUser.ruolo,
            email: updateUser.email,
            telefono: updateUser.telefono,
            token: updateUser.access_token,
            location: defaultLocation,
          });

          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Errore nel salvataggio del profilo", err);
    }
  };

  return (
    <dialog id="edit_profile" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Modifica profilo</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile();
          }}
        >
          {/** UTENTE */}
          {isUser(user) && (
            <>
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-3/5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Nome</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Cognome</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={cognome}
                    onChange={(e) => setCognome(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Telefono</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Comune</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={comuneUtente}
                    onChange={(e) => setComuneUtente(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Provincia (sigla)</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={provinciaUtente}
                    onChange={(e) => setProvinciaUtente(e.target.value)}
                    maxLength={2}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">CAP</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={capUtente}
                    onChange={(e) => setCapUtente(e.target.value)}
                    maxLength={5}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Via</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={viaUtente}
                    onChange={(e) => setViaUtente(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Numero civico</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={numero_civicoUtente}
                    onChange={(e) => setNumeroCivicoUtente(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/** STRUTTURA */}
          {isStruttura(user) && (
            <>
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Ragione Sociale</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={ragione_sociale}
                    onChange={(e) => setRagioneSociale(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-3/5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Telefono</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={telefonoStruttura}
                    onChange={(e) => setTelefonoStruttura(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Comune</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={comune}
                    onChange={(e) => setComune(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Provincia</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">CAP</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={cap}
                    onChange={(e) => setCap(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Via</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={via}
                    onChange={(e) => setVia(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Numero civico</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={numero_civico}
                    onChange={(e) => setNumeroCivico(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div className="modal-action">
            <button type="submit" className="btn btn-primary mr-2">
              Salva
            </button>
            <button
              className="btn"
              onClick={() =>
                (
                  document.getElementById("edit_profile") as HTMLDialogElement
                )?.close()
              }
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModificaProfilo;
