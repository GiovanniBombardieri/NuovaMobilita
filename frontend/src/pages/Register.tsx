import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  // Data of both
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // User data
  const [name, setUserName] = useState("");
  const [surname, setUserSurname] = useState("");
  // Structure data
  const [corporate, setCorporate] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [cap, setCap] = useState("");
  const [street, setStreet] = useState("");
  const [civicNumber, setCivicNumber] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let bodyData;

      if (role === "user") {
        bodyData = {
          role,
          name,
          surname,
          email,
          password,
        };
      } else if (role === "structure") {
        bodyData = {
          role,
          //corporate: ragioneSociale,
          corporate,
          city,
          province,
          cap,
          street,
          //civic_number: numeroCivico,
          civicNumber,
          email,
          password,
        };
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error("Failed Register");
      }

      const data = await response.json();

      // Differenzio i dati di login in base al role selezionato
      if (role === "user") {
        login({
          name: data.user.name,
          surname: data.user.surname,
          phone: data.user.phone,
          role: data.user.role,
          email: data.user.email,
          token: data.token,
          city: data.user.city,
          province: data.user.province,
          street: data.user.street,
          civic_number: data.user.civic_number,
          cap: data.user.cap,
        });
      } else if (role === "structure") {
        login({
          corporate: data.user.corporate,
          city: data.user.city,
          province: data.user.province,
          street: data.user.street,
          civic_number: data.user.civic_number,
          cap: data.user.cap,
          role: data.user.role,
          email: data.user.email,
          phone: data.user.phone,
          token: data.token,
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error in registration:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <form
        onSubmit={handleRegister}
        className="w-full flex flex-col items-center justify-center"
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 lg:w-1/4 flex flex-col items-center">
          <legend className="fieldset-legend">Registration</legend>

          <div className="flex flex-row gap-4">
            <label className="label">Role</label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="Role"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
                className="radio radio-primary"
                required
              />
              User
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="Role"
                value="structure"
                checked={role === "structure"}
                onChange={(e) => setRole(e.target.value)}
                className="radio radio-primary"
                required
              />
              Structure
            </label>
          </div>

          {/* Fields shown on the basis of the role chosen */}
          {/* User */}
          {role && (
            <>
              {role === "user" && (
                <>
                  <input
                    type="text"
                    className="input text-center w-3/4 mt-5"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />

                  <input
                    type="text"
                    className="input text-center w-3/4"
                    placeholder="Surname"
                    value={surname}
                    onChange={(e) => setUserSurname(e.target.value)}
                    required
                  />

                  <div className="divider"></div>

                  {/** EMAIL */}
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

                  {/** PASSWORD */}
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

              {/* STRUCTURE */}
              {role === "structure" && (
                <>
                  <input
                    type="text"
                    className="input text-center w-3/4 mt-5"
                    placeholder="Corporate"
                    value={corporate}
                    onChange={(e) => setCorporate(e.target.value)}
                    required
                  />

                  <input
                    type="text"
                    className="input text-center w-3/4"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />

                  <div className="flex w-3/4">
                    <input
                      type="text"
                      className="input text-center w-3/5 mr-1"
                      placeholder="Province (acronym)"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      required
                      maxLength={2}
                    />

                    <input
                      type="text"
                      className="input text-center w-2/5"
                      placeholder="CAP"
                      value={cap}
                      onChange={(e) => setCap(e.target.value)}
                      required
                      maxLength={5}
                    />
                  </div>

                  <div className="flex w-3/4">
                    <input
                      type="text"
                      className="input text-center w-3/4 mr-1"
                      placeholder="Street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                    />

                    <input
                      type="text"
                      className="input text-center w-1/4"
                      placeholder="N°"
                      value={civicNumber}
                      onChange={(e) => setCivicNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="divider"></div>

                  {/** EMAIL */}
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

          {role && (
            <button type="submit" className="btn btn-neutral my-4 w-3/4">
              Register
            </button>
          )}
        </fieldset>
      </form>

      <hr className="my-8"></hr>

      <div className="flex flex-row items-center justify-center m-3">
        <p className="mr-3">Do you already have the account?</p>
        <Link to="/login" className="btn btn-outline btn-primary">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default Register;
