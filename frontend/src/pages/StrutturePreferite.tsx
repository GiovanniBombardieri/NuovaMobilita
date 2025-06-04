import { useEffect, useState } from "react";
import axios from "axios";
import { DettagliStruttura, useAuth } from "../context/AuthContext";
import img_struttura_sanitaria from "../../public/struttura-sanitaria.png";
import StrutturaDetail from "./StrutturaDetail";

const StrutturePreferite = () => {
  const { user } = useAuth();
  const [strutturePreferite, setStrutturePreferite] = useState<
    DettagliStruttura[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStrutturaId, setSelectedStrutturaId] = useState<string | null>(
    null
  );

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/get_strutture_preferite`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setStrutturePreferite(res.data.data);
      })
      .catch((err) => {
        console.error("Errore nel recupero delle strutture preferite", err);
      });
  }, [user?.token]);

  const removePreferredStructure = async ($id_struttura: string) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/remove_struttura_preferita/${$id_struttura}`,
        { $id_struttura },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      alert("Struttura rimossa dai propri preferiti!");
      window.location.reload();
    } catch (error) {
      console.error(
        "Errore durante la rimozione della struttura dai propri preferiti ",
        error
      );
      alert(
        "Si è verificato un errore durante la rimoione della struttura dai propri preferiti"
      );
    }
  };

  return (
    <dialog
      id="strutture_preferite"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Le mie strutture preferite</h3>

        <div className="flex justify-center items-center">
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

        {strutturePreferite
          .filter((strutturePreferite) =>
            strutturePreferite.struttura?.ragione_sociale
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((strutturePreferite: DettagliStruttura) => (
            <li
              className="list-row list-none my-5"
              key={strutturePreferite.struttura?.id_struttura}
            >
              <div className="flex flex-row justify-stretch">
                <div className="w-1/12 flex justify-center items-center mr-4">
                  <img
                    className="size-8 rounded-box"
                    src={img_struttura_sanitaria}
                    alt="Avatar"
                  />
                </div>
                <div className="w-10/12 mr-5 flex items-center text-lg">
                  <strong>
                    {strutturePreferite.struttura?.ragione_sociale}
                  </strong>
                </div>
                <div className="tooltip" data-tip="Dettaglio">
                  <button
                    onClick={() => {
                      setSelectedStrutturaId(
                        strutturePreferite.struttura?.id_struttura
                      );
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
                <div>
                  <button
                    onClick={() => {
                      removePreferredStructure(
                        strutturePreferite.struttura?.id_struttura
                      );
                    }}
                    className="btn btn-square btn-ghost text-red-500"
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
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6 18.09 19.39A2 2 0 0 1 16.11 21H7.89A2 2 0 0 1 5.91 19.39L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}

        <div className="flex justify-end">
          <button
            className="btn"
            onClick={() =>
              (
                document.getElementById(
                  "strutture_preferite"
                ) as HTMLDialogElement
              )?.close()
            }
          >
            Close
          </button>
        </div>
        <StrutturaDetail id_struttura={selectedStrutturaId} />
      </div>
    </dialog>
  );
};

export default StrutturePreferite;
