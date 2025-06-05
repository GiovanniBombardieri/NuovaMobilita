import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const geocodeAddress = async (address: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }
  throw new Error("Geocoding fallito.");
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [erroreLogin, setErroreLogin] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type");
      const data =
        contentType && contentType.includes("application/json")
          ? await response.json()
          : null;

      if (!response.ok) {
        const errorMessage =
          data?.errors?.email[0] || data?.message || "Errore durante il login.";
        throw new Error(errorMessage);
      }

      if (!data.user || !data.access_token) {
        throw new Error("Dati mancanti nella risposta");
      }

      // Differenzio i dati di login in base al ruolo selezionato
      if (data.user.ruolo === "utente") {
        const fullAddress = `${data.user.user_position.via} ${data.user.user_position.numero_civico}, ${data.user.user_position.cap} ${data.user.user_position.comune}, ${data.user.user_position.provincia}`;
        try {
          const location = await geocodeAddress(fullAddress);

          login({
            name: data.user.name,
            cognome: data.user.cognome,
            telefono: data.user.telefono,
            ruolo: data.user.ruolo,
            email: data.user.email,
            token: data.access_token,
            comune: data.user.user_position.comune,
            provincia: data.user.user_position.provincia,
            via: data.user.user_position.via,
            numero_civico: data.user.user_position.numero_civico,
            cap: data.user.user_position.cap,
            location: location,
          });
        } catch (error) {
          const defaultLocation = {
            lat: 41.9028,
            lng: 12.4964,
          };

          login({
            name: data.user.name,
            cognome: data.user.cognome,
            telefono: data.user.telefono,
            ruolo: data.user.ruolo,
            email: data.user.email,
            token: data.access_token,
            comune: data.user.user_position.comune,
            provincia: data.user.user_position.provincia,
            via: data.user.user_position.via,
            numero_civico: data.user.user_position.numero_civico,
            cap: data.user.user_position.cap,
            location: defaultLocation,
          });

          console.error(error);
        }
      } else if (data.user.ruolo === "struttura") {
        const fullAddress = `${data.user.via} ${data.user.numero_civico}, ${data.user.cap} ${data.user.comune}, ${data.user.provincia}`;
        try {
          const location = await geocodeAddress(fullAddress);

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
            token: data.access_token,
            location: location,
          });
        } catch (error) {
          const defaultLocation = {
            lat: 41.9028,
            lng: 12.4964,
          };

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
            token: data.access_token,
            location: defaultLocation,
          });

          console.log(error);
        }
      }
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setErroreLogin(
          "Impossibile connettersi al server. Verifica la connessione o i permessi CORS."
        );
      } else if (err instanceof Error) {
        setErroreLogin(err.message);
      } else {
        setErroreLogin("Errore sconosciuto.");
      }
      setLoginFailed(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col items-center justify-center"
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 w-1/4 flex flex-col items-center">
          <legend className="fieldset-legend">Login</legend>

          {/** CAMPO EMAIL */}
          <label
            className={`input w-3/4 text-center ${
              loginFailed ? "border-red-600" : ""
            }`}
          >
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
          <div className="validator-hint hidden">Enter valid email address</div>

          {/** CAMPO PASSWORD */}
          <label
            className={`input w-3/4 text-center ${
              loginFailed ? "border-red-600" : ""
            }`}
          >
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
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
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

          <button type="submit" className="btn btn-neutral my-4 w-3/4">
            Login
          </button>
        </fieldset>
      </form>

      {erroreLogin && <div className="text-red-600 mt-3">{erroreLogin}</div>}

      <hr className="my-8"></hr>

      <div className="flex flex-row items-center justify-center m-3">
        <p className="mr-3">Non hai un account?</p>
        <Link to="/register" className="btn btn-outline btn-primary">
          Registrati
        </Link>
      </div>
    </div>
  );
};

export default Login;
