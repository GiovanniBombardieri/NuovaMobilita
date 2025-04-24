import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div>
      <header className="w-1/2 h-full m-5">
        <div className="card bg-base-100 w-1/2 shadow-xl">
          <AnimatePresence mode="wait">
            {showWelcome ? (
              <motion.span
                key="welcome"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.7 }}
                className="btn btn-ghost text-xl my-10"
              >
                Benvenuto {user?.name}
              </motion.span>
            ) : (
              <motion.span
                key="brand"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.7 }}
                className="btn btn-ghost text-xl my-10"
              >
                Ecco i dati relativi al tuo account
              </motion.span>
            )}
          </AnimatePresence>

          <figure className="px-10">
            <div className="w-48 h-48 rounded-full bg-primary text-white flex items-center justify-center text-7xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          </figure>
          <div className="card-body flex flex-row items-center text-center">
            <h3 className="card-title">E-mail:</h3>
            <p>{user?.email}</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default UserDetails;
