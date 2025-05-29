import { useAuth, User, Struttura } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StrutturePreferite from "./StrutturePreferite";

import TipoPrestazione from "./TipoPrestazione";

function isStruttura(user: User | Struttura | null): user is Struttura {
  return (user as Struttura)?.ruolo === "struttura";
}

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://backend:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(() => {
        logout();
        navigate("/login");
      })
      .catch((error) => {
        console.error("Errore nel logout:", error);
      });
  };

  return (
    <div className="h-auto">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          {/* <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Nuova Mobilità</a>
        </div>
        <div className="navbar-end">
          {isStruttura(user) ? (
            <button
              className="btn btn-ghost btn-circle"
              onClick={() =>
                (
                  document.getElementById(
                    "cerca_tipo_prestazione"
                  ) as HTMLDialogElement
                )?.showModal()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />{" "}
              </svg>
            </button>
          ) : null}
          {isStruttura(user) ? null : (
            <button
              className="btn btn-ghost btn-circle mx-1"
              onClick={() =>
                (
                  document.getElementById(
                    "strutture_preferite"
                  ) as HTMLDialogElement
                )?.showModal()
              }
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[1.2em]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                </svg>

                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
          )}
          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-circle text-red-500 hover:text-white hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 m-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h6a2 2 0 002-2v-1"
              />
            </svg>
          </button>
        </div>
      </div>
      {/** DIALOG */}
      <TipoPrestazione />
      <StrutturePreferite />
    </div>
  );
};

export default Navbar;
