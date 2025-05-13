import { Prestazione, useAuth } from "../context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";

const ModificaPrestazione = ({
  id_prestazione,
}: {
  id_prestazione: string | null;
}) => {
  const { user } = useAuth();
  const [prestazione, setPrestazione] = useState<Prestazione | null>(null);

  // Titolo
  const [titolo, setTitolo] = useState(
    prestazione?.tipo_prestazione?.titolo || ""
  );
  useEffect(() => {
    if (prestazione?.tipo_prestazione?.titolo) {
      setTitolo(prestazione.tipo_prestazione.titolo);
    }
  }, [prestazione]);

  // Tipologia
  const [tipologia, setTipologia] = useState(
    prestazione?.tipo_prestazione?.tipologia || ""
  );
  useEffect(() => {
    if (prestazione?.tipo_prestazione?.tipologia) {
      if (prestazione.tipo_prestazione.tipologia === "P") {
        setTipologia("Psicologica");
      } else if (prestazione.tipo_prestazione.tipologia === "M") {
        setTipologia("Motoria");
      }
    }
  }, [prestazione]);

  // Costo
  const [costo, setCosto] = useState<number>(
    prestazione?.valore?.valore_numerico || 0
  );
  useEffect(() => {
    if (prestazione?.valore?.valore_numerico) {
      setCosto(prestazione.valore.valore_numerico);
    }
  }, [prestazione]);

  // Descrizione
  const [descrizione, setDescrizione] = useState(
    prestazione?.tipo_prestazione?.descrizione || ""
  );
  useEffect(() => {
    if (prestazione?.tipo_prestazione?.descrizione) {
      setDescrizione(prestazione.tipo_prestazione.descrizione);
    }
  }, [prestazione]);

  // Carico i dati della prestazione
  useEffect(() => {
    if (!id_prestazione) return;

    axios
      .get(`http://localhost:8000/api/get_prestazioni/${id_prestazione}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPrestazione(res.data);
      })
      .catch((err) => {
        console.error("Errore nel recupero prestazioni", err);
      });
  }, [id_prestazione, user?.token]);

  const updatePrestazione = async () => {
    if (!id_prestazione || !user?.token) return;

    try {
      await axios.put(
        `http://localhost:8000/api/update_prestazione/${id_prestazione}`,
        {
          titolo,
          descrizione,
          tipologia,
          costo,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Prestazione aggiornata con successo");
      (
        document.getElementById("edit_prestazione") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Errore durante l'aggiornamento: ", error);
      alert(
        "Si è verificato un errore durante l'aggiornamento della prestazione."
      );
    }
  };

  return (
    <dialog
      id="edit_prestazione"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Modifica prestazione</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updatePrestazione();
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
                value={tipologia}
                onChange={(e) => setTipologia(e.target.value)}
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
              />
            </div>
          </div>

          {/** CAMPO DESCRIZIONE */}
          <div>
            <div className="form-control mb-4 w-full flex items-center justify-between">
              <label className="label w-1/5">Descrizione</label>
              <textarea
                className="input input-bordered w-4/5 h-32 resize-none whitespace-normal"
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
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
              onClick={() =>
                (
                  document.getElementById(
                    "edit_prestazione"
                  ) as HTMLDialogElement
                )?.close()
              }
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModificaPrestazione;
