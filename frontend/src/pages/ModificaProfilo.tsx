import { useAuth, User, Struttura } from "../context/AuthContext";
import { useState } from "react";

// Funzioni di type guard
function isUser(user: User | Struttura | null): user is User {
  return (user as User)?.ruolo === "utente";
}

function isStruttura(user: User | Struttura | null): user is Struttura {
  return (user as Struttura)?.ruolo === "struttura";
}

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
  const [capUtente, setCapUtente] = useState(isStruttura(user) ? user.cap : "");
  const [viaUtente, setViaUtente] = useState(isStruttura(user) ? user.via : "");
  const [numero_civicoUtente, setNumeroCivicoUtente] = useState(
    isUser(user) ? user.numero_civico : ""
  );

  // Struttura
  const [ragione_sociale, setRagioneSociale] = useState(
    isStruttura(user) ? user.ragione_sociale : ""
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
          comune,
          provincia,
          cap,
          via,
          numero_civico,
        }
      : { ragione_sociale, comune, provincia, cap, via, numero_civico };
    console.log(updateData);
    try {
      const response = await fetch("http://localhost:8000/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok)
        throw new Error(
          "Errore nel salvataggio dei dati aggiornati del profilo"
        );

      const updateUser = await response.json();

      login(updateUser);

      (document.getElementById("edit_profile") as HTMLDialogElement)?.close();
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
                  <label className="label w-2/5">Provincia</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={provinciaUtente}
                    onChange={(e) => setProvinciaUtente(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">CAP</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={capUtente}
                    onChange={(e) => setCapUtente(e.target.value)}
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
            <div>
              <button className="btn">Close</button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModificaProfilo;
