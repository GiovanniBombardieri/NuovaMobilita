import { useAuth, User, Struttura } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModificaProfilo from "./ModificaProfilo";

// Funzioni di type guard
function isUser(user: User | Struttura | null): user is User {
  return (user as User)?.ruolo === "utente";
}

function isStruttura(user: User | Struttura | null): user is Struttura {
  return (user as Struttura)?.ruolo === "struttura";
}

const UserDetails = () => {
  const { user } = useAuth();
  const { login } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);
  const [telefono, setTelefono] = useState(isUser(user) ? user.telefono : "");
  const [indirizzo, setIndirizzo] = useState(
    isUser(user) ? user.indirizzo : ""
  );

  const updateProfile = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ telefono, indirizzo }),
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

  useEffect(() => {
    const timer = setInterval(() => {
      setShowWelcome((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-1/3 h-full mx-5 mb-5">
      <div className="card bg-base-100 shadow-xl w-2/2">
        <AnimatePresence mode="wait">
          {showWelcome ? (
            <motion.span
              key="welcome"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.7 }}
              className="text-center font-bold text-2xl my-8"
            >
              Benvenuto{" "}
              {isUser(user)
                ? user.name
                : isStruttura(user)
                ? user.ragione_sociale
                : "Utente generico"}
            </motion.span>
          ) : (
            <motion.span
              key="brand"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.7 }}
              className="text-center font-bold text-2xl my-8"
            >
              Ecco i dati relativi al tuo account
            </motion.span>
          )}
        </AnimatePresence>

        <figure className="px-10">
          <div className="w-48 h-48 rounded-full bg-primary text-white flex items-center justify-center text-7xl font-bold">
            {isUser(user)
              ? `${user.name.charAt(0)?.toUpperCase() ?? ""}${
                  user.cognome.charAt(0)?.toUpperCase() ?? ""
                }`
              : isStruttura(user)
              ? `${
                  user.ragione_sociale.charAt(0)?.toUpperCase() +
                  user.ragione_sociale.charAt(1)?.toUpperCase()
                }`
              : "UG"}
          </div>
        </figure>
        <div className="card-body flex flex-col">
          {/** RUOLO */}
          <div className="flex flex-row items-center text-center">
            <h3 className="card-title mr-3">Ruolo:</h3>
            <p>
              {user?.ruolo
                ? user.ruolo.charAt(0).toUpperCase() + user.ruolo.slice(1)
                : ""}
            </p>
          </div>

          {/** EMAIL */}
          <div className="flex flex-row items-center text-center">
            <h3 className="card-title mr-3">E-mail:</h3>
            <p>{user?.email}</p>
          </div>

          {/** TELEFONO */}
          <div className="flex flex-row items-center text-center">
            <h3 className="card-title mr-3">Telefono:</h3>
            {isUser(user) ? (
              user.telefono ? (
                <p>{user.telefono}</p>
              ) : (
                <p className="text-red-600">Telefono non inserito</p>
              )
            ) : (
              <p className="text-red-600">Ruolo non corretto</p>
            )}
          </div>

          {/** INDIRIZZO */}
          <div className="flex flex-row items-center text-center">
            <h3 className="card-title mr-3">Indirizzo:</h3>
            {isUser(user) ? (
              user?.indirizzo ? (
                <p>{user.indirizzo}</p>
              ) : (
                <p className="text-red-600">Indirizzo non inserito</p>
              )
            ) : isStruttura(user) ? (
              <p>
                {user.via} {user.numero_civico}, {user.comune} {user.cap} (
                {user.provincia})
              </p>
            ) : (
              <p className="text-red-600">Ruolo non corretto</p>
            )}
          </div>

          {/** PULSANTE MODIFICA PROFILO */}
          <button
            // onClick={handleEditProfile}
            onClick={() =>
              (
                document.getElementById("edit_profile") as HTMLDialogElement
              )?.showModal()
            }
            className="btn btn-outline btn-primary mt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M9 11l6-6m2 2L13 9m0 0L9 13v4h4l4-4z"
              />
            </svg>
            Modifica profilo
          </button>

          {/** DIALOG */}
          <ModificaProfilo />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

{
  /* <dialog id="edit_profile" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg mb-4">Modifica profilo</h3>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateProfile();
      }}
    >
      <div className="form-control mb-4">
        <label className="label mx-3">Telefono</label>
        <input
          type="text"
          className="input input-bordered"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <div className="form-control mb-4">
        <label className="label mx-3">Indirizzo</label>
        <input
          type="text"
          className="input input-bordered"
          value={indirizzo}
          onChange={(e) => setIndirizzo(e.target.value)}
        />
      </div>

      <div className="modal-action">
        <button type="submit" className="btn btn-primary mr-2">
          Salva
        </button>
        <form method="dialog">
          <button className="btn">Close</button>
        </form>
      </div>
    </form>
  </div>
</dialog> */
}
