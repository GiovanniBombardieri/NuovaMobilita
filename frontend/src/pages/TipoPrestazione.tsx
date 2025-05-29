import { useState, useEffect, useCallback } from "react";
import {
  useAuth,
  DatiTipoPrestazione,
  Prestazione,
} from "../context/AuthContext";
import axios from "axios";

const TipoPrestazione = () => {
  const { user } = useAuth();

  const [tipoPrestazioni, setTipoPrestazioni] = useState<DatiTipoPrestazione[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTipoPrestazioneSelected, setIsTipoPrestazioneSelected] =
    useState("");
  const [loadingDatiPrestazione, setLoadingDatiPrestazione] = useState(false);

  const [prestazione, setPrestazione] = useState<Prestazione | null>(null);
  const [id_tipo_prestazione, setIdTipoPrestazione] = useState("");
  const [titolo, setTitolo] = useState("");
  const [tipologia, setTipologia] = useState("");
  const [costo, setCosto] = useState<number>();
  const [descrizione, setDescrizione] = useState("");

  useEffect(() => {
    if (prestazione) {
      setIsTipoPrestazioneSelected(prestazione.id_tipo_prestazione);
    }
  }, [prestazione]);

  // Carico i dati della prestazione
  const caricaTipoFunzione = useCallback(
    (id_tipo_prestazione: string) => {
      if (!id_tipo_prestazione) return;

      setLoadingDatiPrestazione(true);
      axios
        .get(
          `http://backend:8000/api/get_tipo_prestazione_singola/${id_tipo_prestazione}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((res) => {
          const dati = res.data;
          setPrestazione(dati);

          // Inizializzo gli stati degli input
          setTitolo(dati?.titolo);
          setTipologia(dati?.tipologia);
          setDescrizione(dati?.descrizione);
          setIdTipoPrestazione(dati?.id_tipo_prestazione);
        })
        .catch((err) => {
          console.error("Errore nel recupero del tipo di prestazione", err);
        })
        .finally(() => {
          setLoadingDatiPrestazione(false);
        });
    },
    [user?.token]
  );

  // Funzione per avere i tipi di prestazione presenti nel db
  useEffect(() => {
    axios
      .get(`http://backend:8000/api/get_tipo_prestazioni?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setTipoPrestazioni(res.data.data);
        setLastPage(res.data.last_page);
      })
      .catch((err) => {
        console.error("Errore nel recupero dei tipi di prestazioni", err);
      });
  }, [currentPage, user?.token]);

  // Funzione per aggiungere la prestazione una volta scelto il tipo
  const addPrestazione = async () => {
    if (!user?.token) return;
    console.log(tipologia);

    try {
      await axios.post(
        "http://backend:8000/api/create_prestazione",
        { id_tipo_prestazione, titolo, tipologia, costo, descrizione },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      (
        document.getElementById("cerca_tipo_prestazione") as HTMLDialogElement
      )?.close();

      alert("Prestazione aggiunta con successo!");

      setTitolo("");
      setTipologia("");
      setDescrizione("");
    } catch (error) {
      console.error("Errore durante la creazione della prestazione: ", error);
      alert("Errore durante l'aggiunta della prestazione!");
    }
  };

  return (
    <dialog
      id="cerca_tipo_prestazione"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        {isTipoPrestazioneSelected && !loadingDatiPrestazione ? (
          <>
            <h3 className="font-bold text-lg mb-4">Aggiungi prestazione</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addPrestazione();
              }}
            >
              {/** CAMPO TITOLO */}
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-1/5">Titolo</label>
                  <input
                    type="text"
                    className="input input-bordered w-4/5"
                    value={titolo}
                    onChange={(e) => setTitolo(e.target.value)}
                    required
                    readOnly
                  />
                </div>
              </div>

              {/** CAMPO TIPOLOGIA */}
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-1/5 text-wrap">
                    Tipologia prestazione
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-4/5"
                    value={tipologia === "P" ? "Psicologica" : "Motoria"}
                    readOnly
                  />
                </div>
              </div>

              {/** CAMPO COSTO */}
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-1/5">Costo (€)</label>
                  <input
                    type="number"
                    min={0}
                    className="input input-bordered w-4/5"
                    value={costo}
                    onChange={(e) => {
                      const valore = e.target.value.replace(",", ".");
                      const numero = parseFloat(valore);
                      setCosto(isNaN(numero) ? 0 : numero);
                    }}
                    required
                  />
                </div>
              </div>

              {/** CAMPO DESCRIZIONE */}
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-1/5">Descrizione</label>
                  <textarea
                    className="input input-bordered w-4/5 h-60 resize-none whitespace-normal"
                    value={descrizione}
                    onChange={(e) => setDescrizione(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary mr-2">
                  Salva
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsTipoPrestazioneSelected("");
                  }}
                >
                  Indietro
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="flex justify-end my-0">
              <button
                type="button"
                className="btn bg-red-500 btn-circle"
                onClick={() =>
                  (
                    document.getElementById(
                      "cerca_tipo_prestazione"
                    ) as HTMLDialogElement
                  )?.close()
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white font-bold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h3 className="font-bold text-lg mb-4 text-center">
              Cerca tipo prestazione
            </h3>
            <div className="w-full">
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

            {tipoPrestazioni
              .filter((tipo_prestazione) =>
                tipo_prestazione.titolo
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((tipo_prestazione: DatiTipoPrestazione) => (
                <ul className="list bg-base-100 rounded-box shadow-md h-full my-5">
                  <li
                    className="list-row"
                    key={tipo_prestazione.id_tipo_prestazione}
                  >
                    <div>
                      <div className="font-bold">{tipo_prestazione.titolo}</div>
                      <div>
                        {tipo_prestazione.tipologia === "P"
                          ? "Psicologica"
                          : "Motoria"}
                      </div>
                      <div>{tipo_prestazione.descrizione}</div>
                    </div>
                    <button
                      onClick={() => {
                        caricaTipoFunzione(
                          tipo_prestazione.id_tipo_prestazione
                        );
                      }}
                      className="btn btn-square btn-ghost"
                    >
                      <svg
                        className="h-[2em] w-[2em] text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16l4-4-4-4" />
                        <path d="M8 12h8" />
                      </svg>
                    </button>
                  </li>
                </ul>
              ))}
            <div className="w-full h-full flex flex-row justify-center items-center">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  «
                </button>
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
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  »
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default TipoPrestazione;
