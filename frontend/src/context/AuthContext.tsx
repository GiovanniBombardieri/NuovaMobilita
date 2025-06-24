import { createContext, useContext, useState, ReactNode } from "react";

// Definition of the type for the user role
export interface User {
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: string;
  token: string;
  city: string | undefined;
  province: string | undefined;
  street: string | undefined;
  civic_number: string | undefined;
  cap: string | undefined;
  location?: {
    lat: number;
    lng: number;
  };
}

// Definition of the type for the structure role
export interface Structure {
  structure_id: string;
  corporate: string;
  city: string;
  province: string;
  street: string;
  civic_number: string;
  cap: string;
  role: string;
  email: string;
  phone: string;
  token: string;
  location?: {
    lat: number;
    lng: number;
  };
}

// Definition of the type for the role useful for geocody
export interface GeocodingStructure {
  structure_id: string;
  position_id: string;
  contact_id: string;
  web_site_id: string;
  corporate: string;
  change_time: string;
  active_record: number;
  position: {
    city: string;
    province: string;
    street: string;
    civic_number: string;
    cap: string;
  };
}

export interface StructureDetail {
  structure: {
    structure_id: string;
    corporate: string;
  };
  position: {
    cap: number;
    city: string;
    civic_number: string;
    province: string;
    street: string;
  };
  contact: {
    email?: string;
    phone?: string;
  }[];
}

// Definition of the type for performance
export interface Performance {
  performance_id: string;
  structure_id: string;
  performance_type_id: string;
  value_id: string;
  personalized_description: string;
  change_time: Date;
  active_record: number;
  performance_type?: {
    performance_type_id: string;
    type: string;
    title: string;
    description: string;
    change_time: Date;
    active_record: number;
  };
  value?: {
    value_id: string;
    numerical_value: number;
    validity_start: Date;
    validity_end: Date;
    change_time: Date;
    active_record: number;
  };
}

export interface StructureCompleteData {
  structure_id: string;
  role: string;
  email: string;
  structure?: {
    position_id: string;
    web_site_id: string;
    corporate: string;
    position?: {
      city: string;
      province: string;
      street: string;
      civic_number: string;
      cap: string;
    };
  };
}

export interface PerformanceTypeData {
  performance_type_id: string;
  type: string;
  title: string;
  description: string;
}

// Definition of the type for the context
interface AuthContextType {
  user: User | Structure | null;
  login: (userData: User | Structure) => void;
  logout: () => void;
}

// Creation of the context with default Null value
const AuthContext = createContext<AuthContextType | null>(null);

// Personalized hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// Providers that wraps the entire app to manage authentication
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | Structure | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData: User | Structure) => {
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
