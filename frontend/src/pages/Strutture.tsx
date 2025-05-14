import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth, StrutturaDatiCompleti } from "../context/AuthContext";

import img_struttura_sanitaria from "../../public/struttura-sanitaria.png";

const Strutture = () => {
  const { user } = useAuth();

  const [strutture, setStrutture] = useState<StrutturaDatiCompleti[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/get_strutture?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setStrutture(res.data.data);
        setLastPage(res.data.last_page);
      })
      .catch((err) => {
        console.error("Errore nel recupero delle strutture", err);
      });
  }, [currentPage, user?.token]);

  return (
    <div className="h-full w-auto overflow-auto">
      <ul className="list bg-base-100 rounded-box shadow-md h-full">
        <div className="flex flex-row justify-between items-center">
          <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
            Strutture
          </li>
        </div>

        {strutture.map((struttura: StrutturaDatiCompleti) => (
          <li className="list-row" key={struttura.id_struttura}>
            <div className="w-[490px] flex flex-row justify-stretch">
              <div className="w-1/12 flex justify-center items-center mr-4">
                <img
                  className="size-8 rounded-box"
                  src={img_struttura_sanitaria}
                  alt="Avatar"
                />
              </div>
              <div className="w-10/12 mr-5">
                <div>
                  <strong>{struttura.struttura?.ragione_sociale}</strong>
                </div>
                <p className="list-col-wrap text-xs mt-0">DESCRIZIONE</p>
              </div>
              <div className="w-1/12 text-end">
                <button
                  onClick={() => alert("Hai cliccato su bottone preferiti")}
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
    </div>
  );
};

export default Strutture;
