import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [erroreLogin, setErroreLogin] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
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

      console.log("Risposta API:", data);

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
        login({
          name: data.user.name,
          cognome: data.user.cognome,
          indirizzo: data.user.indirizzo,
          telefono: data.user.telefono,
          ruolo: data.user.ruolo,
          email: data.user.email,
          token: data.token,
        });
      } else if (data.user.ruolo === "struttura") {
        login({
          ragione_sociale: data.user.ragione_sociale,
          comune: data.user.comune,
          provincia: data.user.provincia,
          via: data.user.via,
          numero_civico: data.user.numero_civico,
          cap: data.user.cap,
          ruolo: data.user.ruolo,
          email: data.user.email,
          token: data.token,
        });
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

          <label className="label">Email</label>
          <input
            type="email"
            className="input text-center w-3/4"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input text-center w-3/4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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
