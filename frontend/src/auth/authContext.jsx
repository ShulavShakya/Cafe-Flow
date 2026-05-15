import React, { createContext, useContext, useEffect, useState } from "react";
import { privateAPI } from "./config/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    }

    setAuthLoading(false);
  }, []);

  const login = ({ userData, keepSignedIn }) => {
    const storage = keepSignedIn ? localStorage : sessionStorage;

    storage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await privateAPI.post("/auth/logout");
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
