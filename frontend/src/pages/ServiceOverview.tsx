import { useAuth, User, Struttura } from "../context/AuthContext";

function isStruttura(user: User | Struttura | null): user is Struttura {
  return (user as Struttura)?.ruolo === "struttura";
}

const ServiceOverview = () => {
  const { user } = useAuth();

  return (
    <div className="h-full w-full">
      <div className="card bg-base-100 w-full h-full shadow-l">
        <div className="card-body flex flex-col items-start text-start">
          {isStruttura(user) ? (
            <>
              <h3 className="card-title">
                👋🏼 Benvenutə nella piattaforma dedicata al recupero
                post-amputazione!
              </h3>
              <hr className="my-4 border-t border-gray-300 w-full" />
              <p>
                Hai appena acceduto al tuo spazio riservato: un ambiente pensato
                per facilitare l’incontro tra strutture qualificate come la tua
                e le persone che stanno affrontando un percorso di
                riabilitazione dopo un’amputazione.
                <br />
                <br />
                Questa piattaforma nasce con un obiettivo chiaro: mettere in
                connessione chi ha bisogno di supporto concreto con realtà in
                grado di offrirlo, valorizzando competenze, servizi e approcci
                personalizzati.
                <br />
                <br />
                Sappiamo quanto sia importante garantire un’assistenza efficace,
                umana e su misura. Per questo, qui troverai strumenti per
                presentare al meglio la tua struttura, ricevere richieste
                mirate, e accompagnare ogni paziente nel percorso più adatto
                alle sue esigenze.
              </p>
              <span className="border-l-4 border-gray-500 pl-4 inline-block align-middle mb-10">
                Insieme, possiamo fare la differenza.
              </span>
              <p>
                Aggiorna i tuoi servizi, gestisci le richieste e contribuisci
                attivamente a costruire una rete sanitaria più accessibile e
                consapevole.
              </p>
            </>
          ) : (
            <>
              <h3 className="card-title">
                👋🏼 Benvenutə nel tuo spazio dedicato alla ripartenza!
              </h3>
              <hr className="my-4 border-t border-gray-300 w-full" />
              <p>
                <strong>
                  Questa piattaforma nasce con un obiettivo chiaro:
                </strong>{" "}
                diventare il ponte tra le persone che hanno vissuto
                un'amputazione e le strutture sanitarie più adatte ad
                accompagnarle in un percorso di recupero efficace, umano e
                personalizzato.
                <br />
                <br />
                Sappiamo quanto sia complesso orientarsi nel mondo sanitario
                dopo un evento così impattante: non tutte le strutture sono
                preparate ad affrontare questo tipo di percorso, e spesso
                mancano informazioni, strumenti adeguati o semplicemente la
                giusta esperienza.
                <br />
                <br />
                <strong>
                  Qui trovi solo strutture realmente pronte ad aiutarti.
                </strong>{" "}
                Centri ortopedici, fisioterapici, ospedali e professionisti
                qualificati, selezionati per offrire le competenze e i servizi
                migliori per il tuo tipo di recupero.
              </p>
              <span className="border-l-4 border-gray-500 pl-4 inline-block align-middle mb-10">
                Il nostro obiettivo è rendere il tuo percorso più semplice, più
                diretto e meno solitario.
              </span>
              <p>
                Naviga con facilità, scopri prestazioni specifiche, contatta i
                centri più adatti a te e costruisci il tuo percorso, passo dopo
                passo.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceOverview;
