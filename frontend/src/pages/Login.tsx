import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Risposta API:", data);

      if (!response.ok) {
        throw new Error(data.message || "Errore nel login");
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
      console.error("Errore nel login:", err);
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

{
  /* <h1 className="text-3xl text-center mb-5">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center p-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-2 rounded-md p-1 text-center w-2/3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 rounded-md p-1 text-center w-2/3"
        />
        <button
          type="submit"
          className="w-24 text-white border p-1 rounded-lg hover:underline hover:bg-white hover:text-blue-700"
        >
          Accedi
        </button>
      </form> */
}
