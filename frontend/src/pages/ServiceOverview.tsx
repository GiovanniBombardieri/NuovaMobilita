const ServiceOverview = () => {
  return (
    <div className="h-full w-full">
      <div className="card bg-base-100 w-full h-full shadow-l">
        <div className="card-body flex flex-col items-start text-start">
          <h3 className="card-title">
            👋🏼 Benvenutə nel tuo spazio dedicato alla ripartenza!
          </h3>
          <hr className="my-4 border-t border-gray-300 w-full" />
          <p>
            <strong>Questa piattaforma nasce con un obiettivo chiaro:</strong>{" "}
            diventare il ponte tra le persone che hanno vissuto un'amputazione e
            le strutture sanitarie più adatte ad accompagnarle in un percorso di
            recupero efficace, umano e personalizzato.
            <br />
            <br />
            Sappiamo quanto sia complesso orientarsi nel mondo sanitario dopo un
            evento così impattante: non tutte le strutture sono preparate ad
            affrontare questo tipo di percorso, e spesso mancano informazioni,
            strumenti adeguati o semplicemente la giusta esperienza.
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
        </div>
      </div>
    </div>
  );
};

export default ServiceOverview;
