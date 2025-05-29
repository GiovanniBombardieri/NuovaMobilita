import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  // Dati Comuni
  const [ruolo, setRuolo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Dati UTENTE
  const [name, setNameUtente] = useState("");
  const [cognome, setCognomeUtente] = useState("");
  // Dati STRUTTURA
  const [ragioneSociale, setRagioneSociale] = useState("");
  const [comune, setComune] = useState("");
  const [provincia, setProvincia] = useState("");
  const [cap, setCap] = useState("");
  const [via, setVia] = useState("");
  const [numeroCivico, setNumeroCivico] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let bodyData;

      if (ruolo === "utente") {
        bodyData = {
          ruolo,
          name,
          cognome,
          email,
          password,
        };
      } else if (ruolo === "struttura") {
        bodyData = {
          ruolo,
          ragione_sociale: ragioneSociale,
          comune,
          provincia,
          cap,
          via,
          numero_civico: numeroCivico,
          email,
          password,
        };
      }

      const response = await fetch("http://backend:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error("Registrazione fallita");
      }

      const data = await response.json();

      // Differenzio i dati di login in base al ruolo selezionato
      if (ruolo === "utente") {
        login({
          name: data.user.name,
          cognome: data.user.cognome,
          telefono: data.user.telefono,
          ruolo: data.user.ruolo,
          email: data.user.email,
          token: data.token,
          comune: data.user.comune,
          provincia: data.user.provincia,
          via: data.user.via,
          numero_civico: data.user.numero_civico,
          cap: data.user.cap,
        });
      } else if (ruolo === "struttura") {
        login({
          ragione_sociale: data.user.ragione_sociale,
          comune: data.user.comune,
          provincia: data.user.provincia,
          via: data.user.via,
          numero_civico: data.user.numero_civico,
          cap: data.user.cap,
          ruolo: data.user.ruolo,
          email: data.user.email,
          telefono: data.user.telefono,
          token: data.token,
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Errore nella registrazione:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <form
        onSubmit={handleRegister}
        className="w-full flex flex-col items-center justify-center"
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 w-1/4 flex flex-col items-center">
          <legend className="fieldset-legend">Registrazione</legend>

          {/* RADIO SELECT PER IL RUOLO CHE SI VUOLE REGISTRARE */}
          <div className="flex flex-row gap-4">
            <label className="label">Ruolo</label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="Ruolo"
                value="utente"
                checked={ruolo === "utente"}
                onChange={(e) => setRuolo(e.target.value)}
                className="radio radio-primary"
                required
              />
              Utente
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="Ruolo"
                value="struttura"
                checked={ruolo === "struttura"}
                onChange={(e) => setRuolo(e.target.value)}
                className="radio radio-primary"
                required
              />
              Struttura
            </label>
          </div>

          {/* CAMPI MOSTRATI IN BASE AL RUOLO SCELTO */}
          {/* UTENTE */}
          {ruolo && (
            <>
              {ruolo === "utente" && (
                <>
                  <input
                    type="text"
                    className="input text-center w-3/4 mt-5"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setNameUtente(e.target.value)}
                    required
                  />

                  <input
                    type="text"
                    className="input text-center w-3/4"
                    placeholder="Cognome"
                    value={cognome}
                    onChange={(e) => setCognomeUtente(e.target.value)}
                    required
                  />

                  <div className="divider"></div>

                  {/** CAMPO EMAIL */}
                  <label className="input validator w-3/4">
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
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </g>
                    </svg>
                    <input
                      type="email"
                      placeholder="Email"
                      className="input text-center"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                  <div className="validator-hint hidden">
                    Enter valid email address
                  </div>

                  {/** CAMPO PASSWORD */}
                  <label className="input validator w-3/4">
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
                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                        <circle
                          cx="16.5"
                          cy="7.5"
                          r=".5"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                    <input
                      type="password"
                      className="input text-center"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    />
                  </label>
                  <p className="validator-hint hidden">
                    Must be more than 8 characters, including
                    <br />
                    At least one number <br />
                    At least one lowercase letter <br />
                    At least one uppercase letter
                  </p>
                </>
              )}

              {/* STRUTTURA */}
              {ruolo === "struttura" && (
                <>
                  <input
                    type="text"
                    className="input text-center w-3/4 mt-5"
                    placeholder="Ragione Sociale"
                    value={ragioneSociale}
                    onChange={(e) => setRagioneSociale(e.target.value)}
                    required
                  />

                  <input
                    type="text"
                    className="input text-center w-3/4"
                    placeholder="Comune"
                    value={comune}
                    onChange={(e) => setComune(e.target.value)}
                    required
                  />

                  <div className="flex w-3/4">
                    <input
                      type="text"
                      className="input text-center w-3/5 mr-1"
                      placeholder="Provincia (sigla)"
                      value={provincia}
                      onChange={(e) => setProvincia(e.target.value)}
                      required
                    />

                    <input
                      type="text"
                      className="input text-center w-2/5"
                      placeholder="CAP"
                      value={cap}
                      onChange={(e) => setCap(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex w-3/4">
                    <input
                      type="text"
                      className="input text-center w-3/4 mr-1"
                      placeholder="Via"
                      value={via}
                      onChange={(e) => setVia(e.target.value)}
                      required
                    />

                    <input
                      type="text"
                      className="input text-center w-1/4"
                      placeholder="N°"
                      value={numeroCivico}
                      onChange={(e) => setNumeroCivico(e.target.value)}
                      required
                    />
                  </div>

                  <div className="divider"></div>

                  {/** CAMPO EMAIL */}
                  <label className="input validator w-3/4">
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
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </g>
                    </svg>
                    <input
                      type="email"
                      placeholder="Email"
                      className="input text-center"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                  <div className="validator-hint hidden">
                    Enter valid email address
                  </div>

                  {/** CAMPO PASSWORD */}
                  <label className="input validator w-3/4">
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
                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                        <circle
                          cx="16.5"
                          cy="7.5"
                          r=".5"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                    <input
                      type="password"
                      className="input text-center"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    />
                  </label>
                  <p className="validator-hint hidden">
                    Must be more than 8 characters, including
                    <br />
                    At least one number <br />
                    At least one lowercase letter <br />
                    At least one uppercase letter
                  </p>
                </>
              )}
            </>
          )}

          {ruolo && (
            <button type="submit" className="btn btn-neutral my-4 w-3/4">
              Registrati
            </button>
          )}
        </fieldset>
      </form>

      <hr className="my-8"></hr>

      <div className="flex flex-row items-center justify-center m-3">
        <p className="mr-3">Hai già l'account?</p>
        <Link to="/login" className="btn btn-outline btn-primary">
          Torna al login
        </Link>
      </div>
    </div>
  );
};

export default Register;
