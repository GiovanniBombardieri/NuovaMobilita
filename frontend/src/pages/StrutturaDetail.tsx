import { DettagliStruttura, useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Prestazione } from "../context/AuthContext";

const StrutturaDetail = ({ id_struttura }: { id_struttura: string | null }) => {
  const { user } = useAuth();
  const [prestazioniAzienda, setPrestazioniAzienda] = useState<Prestazione[]>(
    []
  );
  const [dettaglioStruttura, setDettaglioStruttura] =
    useState<DettagliStruttura | null>();
  const [dettagliPrestazioniSelected, setDettagliPrestazioniSelected] =
    useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (id_struttura !== null) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/get_prestazioni_azienda/${id_struttura}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((res) => {
          setPrestazioniAzienda(res.data.prestazioni);
        })
        .catch((err) => {
          console.error(
            "Errore nel recupero delle prestazioni dell'azienda",
            err
          );
        });
    }
  }, [user?.token, id_struttura]);

  useEffect(() => {
    if (id_struttura !== null) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/get_dettaglio_struttura/${id_struttura}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((res) => {
          setDettaglioStruttura(res.data);
        })
        .catch((err) => {
          console.error(
            "Errore nel recupero dei dettagli della struttura selezionata",
            err
          );
        });
    }
  }, [user?.token, id_struttura]);

  return (
    <dialog
      id="struttura_detail"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        {dettagliPrestazioniSelected ? (
          <>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg mb-4">Dettaglio Struttura</h3>
              <button
                type="button"
                className="btn bg-red-500 btn-circle"
                onClick={() =>
                  (
                    document.getElementById(
                      "struttura_detail"
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
            <div className="card bg-base-100 shadow-xl w-2/2 h-full">
              <div className="card-body flex flex-col p-5 justify-between items-center">
                <h3 className="card-title mb-5 text-3xl">
                  {dettaglioStruttura?.struttura?.ragione_sociale}
                </h3>

                {/** EMAIL */}
                <div className="flex flex-row items-center text-center w-full mb-5">
                  <div className="flex w-1/3 justify-start">
                    <h3 className="card-title">E-mail:</h3>
                  </div>
                  <div className="flex w-2/3 justify-center">
                    {dettaglioStruttura?.recapiti?.some((r) => r.email) ? (
                      <div className="flex flex-col items-center">
                        {dettaglioStruttura.recapiti
                          .filter((r) => r.email)
                          .map((r, idx) => (
                            <p key={idx}>{r.email}</p>
                          ))}
                      </div>
                    ) : (
                      <p>Email non presente</p>
                    )}
                  </div>
                </div>

                {/** TELEFONO */}
                <div className="flex flex-row items-center text-center w-full mb-5">
                  <div className="flex w-1/3 justify-start">
                    <h3 className="card-title">Telefono:</h3>
                  </div>
                  <div className="flex w-2/3 justify-center">
                    {dettaglioStruttura?.recapiti?.some((r) => r.telefono) ? (
                      <div className="flex flex-col items-center">
                        {dettaglioStruttura.recapiti
                          .filter((r) => r.telefono)
                          .map((r, idx) => (
                            <p key={idx}>{r.telefono}</p>
                          ))}
                      </div>
                    ) : (
                      <p>Telefono non presente</p>
                    )}
                  </div>
                </div>

                {/** POSIZIONE */}
                <div className="flex flex-row items-center text-center w-full mb-5">
                  <div className="flex w-1/3 justify-start">
                    <h3 className="card-title">Posizione:</h3>
                  </div>
                  <div className="flex w-2/3 justify-center">
                    <p>
                      {dettaglioStruttura?.posizione?.via}{" "}
                      {dettaglioStruttura?.posizione?.numero_civico},{" "}
                      {dettaglioStruttura?.posizione?.cap}{" "}
                      {dettaglioStruttura?.posizione?.comune} (
                      {dettaglioStruttura?.posizione?.provincia})
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setDettagliPrestazioniSelected(false)}
                >
                  Vedi Prestazioni
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-bold text-lg mb-4">Prestazioni Struttura</h3>

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

            {prestazioniAzienda.length === 0 ? (
              <p>Nessuna prestazione trovata per questa struttura.</p>
            ) : (
              <>
                {prestazioniAzienda
                  .filter((prestazione) =>
                    prestazione.tipo_prestazione?.titolo
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((prestazione: Prestazione) => (
                    <ul className="list bg-base-100 rounded-box shadow-md h-full my-5">
                      <li className="list-row" key={prestazione.id_prestazione}>
                        <div>
                          <div className="font-bold">
                            {prestazione.tipo_prestazione?.titolo}
                          </div>
                          <div className="mt-3">
                            {prestazione.descrizione_personalizzata
                              ? prestazione.descrizione_personalizzata
                              : prestazione.tipo_prestazione?.descrizione}
                          </div>
                          <div className="mt-5 flex justify-end">
                            <label className="input w-28">
                              <input
                                className="text-end pointer-events-none select-none"
                                value={prestazione.valore?.valore_numerico}
                              />
                              <span className="label">€</span>
                            </label>
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))}
                <button
                  className="btn btn-sm btn-secondary mb-4"
                  onClick={() => setDettagliPrestazioniSelected(true)}
                >
                  Indietro
                </button>
              </>
            )}
          </>
        )}
      </div>
    </dialog>
  );
};

export default StrutturaDetail;
