import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AggiungiPrestazione = () => {
  const { user } = useAuth();

  const [titolo, setTitolo] = useState("");
  const [tipologia, setTipologia] = useState("");
  const [costo, setCosto] = useState<number>();
  const [descrizione, setDescrizione] = useState("");

  const addPrestazione = async () => {
    if (!user?.token) return;

    try {
      await axios.post(
        "http://localhost:8000/api/create_prestazione",
        { titolo, tipologia, costo, descrizione },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Prestazione aggiunta con successo!");

      setTitolo("");
      setTipologia("");
      setCosto(0);
      setDescrizione("");
      (
        document.getElementById("add_prestazione") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Errore durante la creazione della prestazione: ", error);
      alert("Errore durante l'aggiunta della prestazione!");
    }
  };

  return (
    <dialog id="add_prestazione" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
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
              />
            </div>
          </div>

          {/** CAMPO TIPOLOGIA */}
          <div>
            <div className="form-control mb-4 w-full flex items-center justify-between">
              <label className="label w-1/5 text-wrap">
                Tipologia prestazione
              </label>
              <select
                className="select select-bordered w-4/5"
                value={tipologia}
                onChange={(e) => setTipologia(e.target.value)}
                required
              >
                <option value="">-- Seleziona --</option>
                <option value="P">Psicologica</option>
                <option value="M">Motoria</option>
              </select>
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
                className="input input-bordered w-4/5 h-32 resize-none whitespace-normal"
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
              className="btn"
              onClick={() =>
                (
                  document.getElementById(
                    "add_prestazione"
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

export default AggiungiPrestazione;
