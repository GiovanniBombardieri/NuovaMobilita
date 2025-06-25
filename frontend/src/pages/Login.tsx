import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const geocodeAddress = async (address: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/geocode?q=${encodeURIComponent(address)}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }
  throw new Error("Geocoding failed.");
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
          data?.errors?.email[0] || data?.message || "Error during login.";
        throw new Error(errorMessage);
      }

      if (!data.user || !data.access_token) {
        throw new Error("Missing data in the answer.");
      }

      // Differences Login data based on the selected role
      if (data.user.role === "user") {
        const fullAddress = `${data.user.user_position.street} ${data.user.user_position.civic_number}, ${data.user.user_position.cap} ${data.user.user_position.city}, ${data.user.user_position.province}`;
        try {
          const location = await geocodeAddress(fullAddress);

          await login({
            name: data.user.name,
            surname: data.user.surname,
            phone: data.user.phone,
            role: data.user.role,
            email: data.user.email,
            token: data.access_token,
            city: data.user.user_position.city,
            province: data.user.user_position.province,
            street: data.user.user_position.street,
            civic_number: data.user.user_position.civic_number,
            cap: data.user.user_position.cap,
            location: location,
          });
        } catch (error) {
          const defaultLocation = {
            lat: 41.9028,
            lng: 12.4964,
          };

          await login({
            name: data.user.name,
            surname: data.user.surname,
            phone: data.user.phone,
            role: data.user.role,
            email: data.user.email,
            token: data.access_token,
            city: data.user.user_position.city,
            province: data.user.user_position.province,
            street: data.user.user_position.street,
            civic_number: data.user.user_position.civic_number,
            cap: data.user.user_position.cap,
            location: defaultLocation,
          });

          console.error(error);
        }
      } else if (data.user.role === "structure") {
        const fullAddress = `${data.user.street} ${data.user.civic_number}, ${data.user.cap} ${data.user.city}, ${data.user.province}`;
        try {
          const location = await geocodeAddress(fullAddress);

          login({
            structure_id: data.user.structure_id,
            corporate: data.user.corporate,
            city: data.user.city,
            province: data.user.province,
            street: data.user.street,
            civic_number: data.user.civic_number,
            cap: data.user.cap,
            role: data.user.role,
            email: data.user.email,
            phone: data.user.phone,
            token: data.access_token,
            location: location,
          });
        } catch (error) {
          const defaultLocation = {
            lat: 41.9028,
            lng: 12.4964,
          };

          login({
            structure_id: data.user.structure_id,
            corporate: data.user.corporate,
            city: data.user.city,
            province: data.user.province,
            street: data.user.street,
            civic_number: data.user.civic_number,
            cap: data.user.cap,
            role: data.user.role,
            email: data.user.email,
            phone: data.user.phone,
            token: data.access_token,
            location: defaultLocation,
          });

          console.log(error);
        }
      }
      setTimeout(() => {
        navigate("/dashboard");
      }, 300);
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setLoginError(
          "Impossible to connect to the server. Check the connection or Cors for permits. Check the connection or CORS permits."
        );
      } else if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError("Unknown error.");
      }
      setLoginFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col items-center justify-center"
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 lg:w-1/4 flex flex-col items-center">
          <legend className="fieldset-legend">Login</legend>

          {/** EMAIL */}
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

          {/** PASSWORD */}
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

          <button
            type="submit"
            className="btn btn-neutral my-4 w-3/4"
            disabled={loading}
          >
            {loading ? "Logging..." : "Login"}
          </button>
        </fieldset>
      </form>

      {loginError && <div className="text-red-600 mt-3">{loginError}</div>}

      <hr className="my-8"></hr>

      <div className="flex flex-row items-center justify-center m-3">
        <p className="mr-3">Don't have an account?</p>
        <Link to="/register" className="btn btn-outline btn-primary">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
