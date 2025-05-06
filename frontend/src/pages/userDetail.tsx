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
  const [showWelcome, setShowWelcome] = useState(true);

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
            <div className="flex w-1/3 justify-start">
              <h3 className="card-title">Ruolo:</h3>
            </div>
            <div className="flex w-2/3 justify-center">
              <p>
                {user?.ruolo
                  ? user.ruolo.charAt(0).toUpperCase() + user.ruolo.slice(1)
                  : ""}
              </p>
            </div>
          </div>

          {/** EMAIL */}
          <div className="flex flex-row items-center text-center w-full">
            <div className="flex w-1/3 justify-start">
              <h3 className="card-title">E-mail:</h3>
            </div>
            <div className="flex w-2/3 justify-center">
              <p>{user?.email}</p>
            </div>
          </div>

          {/** TELEFONO */}
          <div className="flex flex-row items-center text-center w-full">
            <div className="flex w-1/3 justify-start">
              <h3 className="card-title">Telefono:</h3>
            </div>
            {isUser(user) ? (
              user.telefono ? (
                <div className="flex w-2/3 justify-center">
                  <p>{user.telefono}</p>
                </div>
              ) : (
                <p className="text-red-600 text-xs">Telefono non inserito</p>
              )
            ) : (
              <p className="text-red-600 text-xs">Telefono non inserito</p>
            )}
          </div>

          {/** INDIRIZZO */}
          <div className="flex flex-row items-center text-center w-full">
            <div className="flex w-1/3 justify-start">
              <h3 className="card-title">Indirizzo:</h3>
            </div>
            {isUser(user) ? (
              user?.comune &&
              user?.via &&
              user?.numero_civico &&
              user?.cap &&
              user?.provincia ? (
                <div className="flex w-2/3 justify-center">
                  <p>
                    {user.via} {user.numero_civico}, {user.cap} {user.comune},{" "}
                    {user.provincia}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col w-2/3 text-xs items-center">
                  <p className="text-red-600">Indirizzo non corretto</p>
                  <p className="text-red-600">
                    Inserire tutti i dati richiesti
                  </p>
                </div>
              )
            ) : isStruttura(user) &&
              user?.comune &&
              user?.via &&
              user?.numero_civico &&
              user?.cap &&
              user?.provincia ? (
              <div className="flex w-2/3 justify-center">
                <p>
                  {user.via} {user.numero_civico}, {user.comune} {user.cap} (
                  {user.provincia})
                </p>
              </div>
            ) : (
              <div className="flex flex-col w-2/3 text-xs items-center">
                <p className="text-red-600">Indirizzo non corretto</p>
                <p className="text-red-600">Inserire tutti i dati richiesti</p>
              </div>
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
