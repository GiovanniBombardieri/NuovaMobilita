import { createContext, useContext, useState, ReactNode } from "react";

// Definizione del tipo per il ruolo Utente
export interface User {
  name: string;
  cognome: string;
  email: string;
  telefono: string;
  ruolo: string;
  token: string;
  comune: string | undefined;
  provincia: string | undefined;
  via: string | undefined;
  numero_civico: string | undefined;
  cap: string | undefined;
  location?: {
    lat: number;
    lng: number;
  };
}

// Definizione del tipo per il ruolo Struttura
export interface Struttura {
  ragione_sociale: string;
  comune: string;
  provincia: string;
  via: string;
  numero_civico: string;
  cap: string;
  ruolo: string;
  email: string;
  telefono: string;
  token: string;
  location?: {
    lat: number;
    lng: number;
  };
}

// Definizione del tipo per il ruolo Struttura utile per il Geocoding
export interface StrutturaGeocoding {
  id_struttura: string;
  id_posizione: string;
  id_recapito: string;
  id_sito_web: string;
  ragione_sociale: string;
  time_modifica: string;
  record_attivo: number;
  posizione: {
    comune: string;
    provincia: string;
    via: string;
    numero_civico: string;
    cap: string;
  };
}

export interface DettagliStruttura {
  struttura: {
    id_struttura: string;
    ragione_sociale: string;
  };
  posizione: {
    cap: number;
    comune: string;
    numero_civico: string;
    provincia: string;
    via: string;
  };
  recapiti: {
    email?: string;
    telefono?: string;
  }[];
}

// Definizione del tipo per la prestazione
export interface Prestazione {
  id_prestazione: string;
  id_struttura: string;
  id_tipo_prestazione: string;
  id_valore: string;
  descrizione_personalizzata: string;
  time_modifica: Date;
  record_attivo: number;
  tipo_prestazione?: {
    id_tipo_prestazione: string;
    tipologia: string;
    titolo: string;
    descrizione: string;
    time_modifica: Date;
    record_attivo: number;
  };
  valore?: {
    id_valore: string;
    valore_numerico: number;
    inizio_validita: Date;
    fine_validita: Date;
    time_modifica: Date;
    record_attivo: number;
  };
}

export interface StrutturaDatiCompleti {
  id_struttura: string;
  ruolo: string;
  email: string;
  struttura?: {
    id_posizione: string;
    id_sito_web: string;
    ragione_sociale: string;
    posizione?: {
      comune: string;
      provincia: string;
      via: string;
      numero_civico: string;
      cap: string;
    };
  };
}

export interface DatiTipoPrestazione {
  id_tipo_prestazione: string;
  tipologia: string;
  titolo: string;
  descrizione: string;
}

// Definizione del tipo per il contesto
interface AuthContextType {
  user: User | Struttura | null;
  login: (userData: User | Struttura) => void;
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
  const [user, setUser] = useState<User | Struttura | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData: User | Struttura) => {
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
