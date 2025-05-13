import { useEffect, useState } from "react";
import { Prestazione, useAuth } from "../context/AuthContext";
import axios from "axios";

import img_prest_sanitaria from "../../public/icona-prest-sanitaria.jpg";
import img_prest_psicologica from "../../public/icona-prest-psicologica.jpg";

import ModificaPrestazione from "./ModificaPrestazione";
import AggiungiPrestazione from "./AggiungiPrestazione";

const Prestazioni = () => {
  const { user } = useAuth();

  const [prestazioni, setPrestazioni] = useState<Prestazione[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/get_prestazioni?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setPrestazioni(res.data.data);
        setLastPage(res.data.last_page);
      })
      .catch((err) => {
        console.error("Errore nel recupero prestazioni", err);
      });
  }, [currentPage, user?.token]);

  return (
    <div className="rounded-box w-3/3 h-[583px] w-1/3 mx-5 mb-5">
      <ul className="list bg-base-100 rounded-box shadow-md h-full">
        <div className="flex flex-row justify-between items-center">
          <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
            Le tue prestazioni
          </li>
          <button
            className="btn btn-square btn-ghost mr-5 mt-2"
            onClick={() => {
              (
                document.getElementById("add_prestazione") as HTMLDialogElement
              )?.showModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-[1.4em]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="14" y1="7" x2="14" y2="21" />
              <line x1="7" y1="14" x2="21" y2="14" />
            </svg>
          </button>
        </div>

        {prestazioni.map((prestazione: Prestazione) => (
          <li className="list-row">
            <div className="w-[490px] flex flex-row justify-stretch">
              <div className="w-1/12 flex justify-center mr-4">
                <img
                  className="size-8 rounded-box"
                  src={
                    prestazione.tipo_prestazione?.tipologia === "P"
                      ? img_prest_psicologica
                      : img_prest_sanitaria
                  }
                  alt="Avatar"
                />
              </div>
              <div className="w-10/12 mr-5">
                <div>
                  <strong>{prestazione.tipo_prestazione?.titolo}</strong>
                </div>
                <p className="list-col-wrap text-xs mt-0">
                  {prestazione.tipo_prestazione?.descrizione
                    ? prestazione.tipo_prestazione?.descrizione.length > 150
                      ? prestazione.tipo_prestazione?.descrizione.slice(
                          0,
                          150
                        ) + "..."
                      : prestazione.tipo_prestazione?.descrizione
                    : ""}
                </p>
              </div>
              <div className="w-1/12 text-end">
                <button
                  onClick={() => {
                    setSelectedId(prestazione.id_prestazione);
                    (
                      document.getElementById(
                        "edit_prestazione"
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
                    stroke="blue"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                  </svg>
                </button>
                <button className="btn btn-square btn-ghost">
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
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3-3h8a1 1 0 0 1 1 1v2H5V4a1 1 0 0 1 1-1z" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
        <div className="w-full h-full flex flex-row justify-center items-center">
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
      <ModificaPrestazione id_prestazione={selectedId} />
      <AggiungiPrestazione />
    </div>
  );
};

export default Prestazioni;
