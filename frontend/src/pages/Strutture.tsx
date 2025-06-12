import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth, StrutturaDatiCompleti } from "../context/AuthContext";

import img_struttura_sanitaria from "../../public/struttura-sanitaria.png";
import StrutturaDetail from "./StrutturaDetail";

const Strutture = () => {
  const { user } = useAuth();

  const [strutture, setStrutture] = useState<StrutturaDatiCompleti[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStrutturaId, setSelectedStrutturaId] = useState<string | null>(
    null
  );

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/get_strutture_paginate?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setStrutture(res.data.data);
        setLastPage(res.data.last_page);
      })
      .catch((err) => {
        console.error("Errore nel recupero delle strutture", err);
      });
  }, [currentPage, user?.token]);

  const addPreferredStructure = async (id_struttura: string) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/add_struttura_preferita/${id_struttura}`,
        { id_struttura },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      alert("Struttura aggiunta tra i propri preferiti!");
      window.location.reload();
    } catch (error) {
      console.error(
        "Errore durante l'aggiunta della struttura tra i preferiti ",
        error
      );
      alert(
        "Si è verificato un errore durante l'aggiunta della struttura tra i propri preferiti"
      );
    }
  };

  return (
    <div className="h-auto lg:h-full w-full lg:w-1/2 lg:overflow-auto">
      <ul className="list bg-base-100 rounded-box shadow-md h-full w-full items-center">
        <div className="flex flex-row justify-between items-center">
          <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
            Strutture
          </li>
        </div>

        <div className="w-full flex justify-center items-center py-4 px-8">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Cerca per titolo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>

        {strutture
          .filter((struttura) =>
            struttura.struttura?.ragione_sociale
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((struttura: StrutturaDatiCompleti) => (
            <li
              className="w-[95%] py-2 px-4 border-b-2"
              key={struttura.id_struttura}
            >
              <div className="flex flex-row w-full">
                <div className="w-1/12 flex justify-center items-center mr-4">
                  <img
                    className="size-8 rounded-box"
                    src={img_struttura_sanitaria}
                    alt="Avatar"
                  />
                </div>
                <div className="w-11/12 flex items-center justify-between text-lg">
                  <div>
                    <strong>{struttura.struttura?.ragione_sociale}</strong>
                  </div>
                  <div>
                    <div className="tooltip" data-tip="Dettaglio">
                      <button
                        onClick={() => {
                          setSelectedStrutturaId(struttura.id_struttura);
                          (
                            document.getElementById(
                              "struttura_detail"
                            ) as HTMLDialogElement
                          )?.showModal();
                        }}
                        className="btn btn-square btn-ghost"
                      >
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </div>

                    <div className="tooltip" data-tip="Preferito">
                      <button
                        onClick={() => {
                          addPreferredStructure(struttura.id_struttura);
                        }}
                        className="btn btn-square btn-ghost"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-[1.2em]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="red"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}

        <div className="w-full h-full flex flex-row justify-center items-center my-5">
          <div className="join">
            {[...Array(lastPage)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`join-item btn ${
                  currentPage === index + 1 ? "btn-active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </ul>
      <StrutturaDetail
        key={selectedStrutturaId}
        id_struttura={selectedStrutturaId}
      />
    </div>
  );
};

export default Strutture;
