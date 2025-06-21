import { useAuth, User, Structure } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditProfile from "./EditProfile";

function isUser(user: User | Structure | null): user is User {
  return (user as User)?.role === "user";
}

function isStructure(user: User | Structure | null): user is Structure {
  return (user as Structure)?.role === "structure";
}

const UserDetails = () => {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowWelcome((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full lg:w-1/2 h-auto lg:h-full lg:overflow-auto">
      <div className="card bg-base-100 shadow-xl w-2/2 h-full p-5">
        <div className="flex flex-col md:flex-row md:justify-center md:items-center w-full md:h-1/3 md:pb-5">
          <figure>
            <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-5xl font-bold">
              {isUser(user)
                ? `${user.name.charAt(0)?.toUpperCase() ?? ""}${
                    user.surname.charAt(0)?.toUpperCase() ?? ""
                  }`
                : isStructure(user)
                ? `${
                    user.corporate.charAt(0)?.toUpperCase() +
                    user.corporate.charAt(1)?.toUpperCase()
                  }`
                : "UG"}
            </div>
          </figure>

          <AnimatePresence mode="wait">
            {showWelcome ? (
              <motion.span
                key="welcome"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.7 }}
                className="text-center font-bold text-2xl my-3 md:ml-10"
              >
                Welcome{" "}
                {isUser(user)
                  ? user.name
                  : isStructure(user)
                  ? user.corporate
                  : "Generic user"}
              </motion.span>
            ) : (
              <motion.span
                key="brand"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.7 }}
                className="text-center font-bold text-2xl my-3 md:ml-10"
              >
                Here are the data relating to your account
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="card-body flex flex-col p-0">
          <div className="h-2/3 px-10">
            {/** ROLE */}
            <div className="flex flex-col md:flex-row items-center text-center w-full mb-5">
              <div className="flex md:w-1/3 w-full justify-center">
                <h3 className="card-title">Role:</h3>
              </div>
              <div className="flex md:w-2/3 w-full justify-center">
                <p>
                  {user?.role
                    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    : ""}
                </p>
              </div>
            </div>

            {/** EMAIL */}
            <div className="flex flex-col md:flex-row items-center text-center w-full mb-5">
              <div className="flex md:w-1/3 w-full justify-center">
                <h3 className="card-title">E-mail:</h3>
              </div>
              <div className="flex md:w-2/3 w-full justify-center">
                <p>{user?.email}</p>
              </div>
            </div>

            {/** PHONE */}
            <div className="flex flex-col md:flex-row items-center text-center w-full mb-5">
              <div className="flex md:w-1/3 w-full justify-center">
                <h3 className="card-title">Phone:</h3>
              </div>
              {isUser(user) ? (
                user.phone ? (
                  <div className="flex md:w-2/3 w-full justify-center">
                    <p>{user.phone}</p>
                  </div>
                ) : (
                  <div className="flex md:w-2/3 w-full justify-center">
                    <p className="text-red-600 text-xs">Phone not entered</p>
                  </div>
                )
              ) : isStructure(user) && user?.phone ? (
                <div className="flex md:w-2/3 w-full justify-center">
                  <p>{user.phone}</p>
                </div>
              ) : (
                <div className="flex md:w-2/3 w-full justify-center">
                  <p className="text-red-600 text-xs">Phone not entered</p>
                </div>
              )}
            </div>

            {/** ADDRESS */}
            <div className="flex flex-col md:flex-row items-center text-center w-full mb-5">
              <div className="flex md:w-1/3 w-full justify-center">
                <h3 className="card-title">Address:</h3>
              </div>
              {isUser(user) ? (
                user?.city &&
                user?.street &&
                user?.civic_number &&
                user?.cap &&
                user?.province ? (
                  <div className="flex md:w-2/3 w-full justify-center">
                    <p>
                      {user.street} {user.civic_number}, {user.cap} {user.city},{" "}
                      {user.province}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col md:w-2/3 w-full justify-center text-xs items-center">
                    <p className="text-red-600">Incorrect address</p>
                    <p className="text-red-600">Enter all the required data</p>
                  </div>
                )
              ) : isStructure(user) &&
                user?.city &&
                user?.street &&
                user?.civic_number &&
                user?.cap &&
                user?.province ? (
                <div className="flex md:w-2/3 w-full justify-center">
                  <p>
                    {user.street} {user.civic_number}, {user.city} {user.cap} (
                    {user.province})
                  </p>
                </div>
              ) : (
                <div className="flex flex-col md:w-2/3 w-full justify-center text-xs items-center">
                  <p className="text-red-600">Incorrect address</p>
                  <p className="text-red-600">Enter all the required data</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-1/3 px-10 py-5 md:py-2">
            {/** Profile Edit button */}
            <button
              onClick={() =>
                (
                  document.getElementById("edit_profile") as HTMLDialogElement
                )?.showModal()
              }
              className="btn btn-outline btn-primary mt-4 w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536M9 11l6-6m2 2L13 9m0 0L9 13v4h4l4-4z"
                />
              </svg>
              Edit Profile
            </button>
          </div>

          {/** DIALOG */}
          <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
