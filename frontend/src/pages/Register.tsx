import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [cognome, setCognome] = useState("");
  const [ruolo, setRuolo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, cognome, ruolo, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registrazione fallita");
      }

      const data = await response.json();
      login({
        name: data.user.name,
        email: data.user.email,
        token: data.token,
      });
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

          <input
            type="text"
            className="input text-center w-3/4 mt-5"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            className="input text-center w-3/4"
            placeholder="Cognome"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            required
          />

          <input
            type="email"
            className="input text-center w-3/4"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label mt-5">Password</label>
          <input
            type="password"
            className="input text-center w-3/4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-neutral my-4 w-3/4">
            Registrati
          </button>
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

{
  /* <input
type="text"
placeholder="Nome"
value={name}
onChange={(e) => setName(e.target.value)}
required
className="mb-2 rounded-md p-1 text-center w-2/3"
/>
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
className="mb-2 rounded-md p-1 text-center w-2/3"
/>
<button
type="submit"
className="w-24 text-white border p-1 rounded-lg hover:underline hover:bg-white hover:text-blue-700"
>
Registrati
</button> */
}
