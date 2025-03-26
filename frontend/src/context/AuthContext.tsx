import { createContext, useContext, useState, ReactNode } from "react";

// Definizione del tipo per l'utente
interface User {
  name: string;
  email: string;
  token: string;
}

// Definizione del tipo per il contesto
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Creazione del contesto con valore di default null
const AuthContext = createContext<AuthContextType | null>(null);

// Hook personalizzato per usare il contesto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// Provider che avvolge l'intera app per gestire l'autenticazione
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
