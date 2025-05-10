import img_prest_sanitaria from "../../public/icona-prest-sanitaria.jpg";
import img_prest_psicologica from "../../public/icona-prest-psicologica.jpg";

const Prestazioni = () => {
  return (
    <div className="rounded-box w-3/3 h-[583px] w-1/3 mx-5 mb-5">
      <ul className="list bg-base-100 rounded-box shadow-md h-full">
        <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
          Le tue prestazioni
        </li>

        <li className="list-row">
          <div className="w-[490px] flex flex-row justify-stretch">
            <div className="w-1/12 flex justify-center mr-4">
              <img
                className="size-8 rounded-box"
                src={img_prest_sanitaria}
                alt="Avatar"
              />
            </div>
            <div className="w-10/12 mr-5">
              <div>
                <strong>Riabilitazione dell'arto fantasma</strong>
              </div>
              <p className="list-col-wrap text-xs mt-0">
                Questa tecnica mira a ridurre o eliminare il dolore dell’arto
                fantasma, una condizione in cui il paziente percepisce
                sensazioni (spesso dolorose) nell’arto amputato. Le strategie
                includono la mirror therapy (terapia con specchio), esercizi
                mentali di visualizzazione, stimolazione sensoriale del moncone
                e tecniche di rilassamento.i
              </p>
            </div>
            <div className="w-1/12 text-end">
              <button className="btn btn-square btn-ghost">
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
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
            </div>
          </div>
        </li>

        <li className="list-row">
          <div className="w-[490px] flex flex-row justify-stretch">
            <div className="w-1/12 flex justify-center mr-4">
              <img
                className="size-8 rounded-box"
                src={img_prest_sanitaria}
                alt="Avatar"
              />
            </div>
            <div className="w-10/12 mr-5">
              <div>
                Training alla deambulazione con protesi (Gait Training
                Protesico)
              </div>
              <p className="list-col-wrap text-xs">
                Questa tecnica si concentra sull’addestramento del paziente
                all’uso corretto della protesi per camminare in modo efficiente
                e sicuro. Include esercizi di equilibrio, coordinazione,
                rinforzo muscolare, e progressioni su superfici diverse.
              </p>
            </div>
            <div className="w-1/12 text-end">
              <button className="btn btn-square btn-ghost">
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
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
            </div>
          </div>
        </li>

        <li className="list-row">
          <div className="w-[490px] flex flex-row justify-stretch">
            <div className="w-1/12 flex justify-center mr-4">
              <img
                className="size-10 rounded-box"
                src={img_prest_psicologica}
                alt="Avatar"
              />
            </div>
            <div className="w-10/12 mr-5">
              <div>Terapia dell’Immagine Corporea (Body Image Therapy)</div>
              <p className="list-col-wrap text-xs">
                Lavora sul modo in cui il paziente percepisce il proprio corpo
                dopo l’amputazione. Include esercizi di visualizzazione, uso di
                specchi, tecniche artistiche o dialogo guidato per affrontare
                l’alterazione dello schema corporeo.
              </p>
            </div>
            <div className="w-1/12 text-end">
              <button className="btn btn-square btn-ghost">
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
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
            </div>
          </div>
        </li>

        <li className="list-row">
          <div className="w-[490px] flex flex-row justify-stretch">
            <div className="w-1/12 flex justify-center mr-4">
              <img
                className="size-10 rounded-box"
                src={img_prest_psicologica}
                alt="Avatar"
              />
            </div>
            <div className="w-10/12 mr-5">
              <div>Terapia Cognitivo-Comportamentale (CBT)</div>
              <p className="list-col-wrap text-xs">
                Lavora sul modo in cui il paziente percepisce il proprio corpo
                dopo l’amputazione. Include esercizi di visualizzazione, uso di
                specchi, tecniche artistiche o dialogo guidato per affrontare
                l’alterazione dello schema corporeo.
              </p>
            </div>
            <div className="w-1/12 text-end">
              <button className="btn btn-square btn-ghost">
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
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Prestazioni;
