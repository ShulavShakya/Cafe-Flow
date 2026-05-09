import React, { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const access =
      localStorage.getItem("access") || sessionStorage.getItem("access");
    const refresh =
      localStorage.getItem("refresh") || sessionStorage.getItem("refresh");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");
    const email =
      localStorage.getItem("email") || sessionStorage.getItem("email");

    if (access && refresh && role && email) {
      setUser({ access, refresh, role, email });
    } else {
      setUser(null);
    }

    setAuthLoading(false);
  }, []);

  const login = ({ access, refresh, role, email, keepSignedIn }) => {
    const storage = keepSignedIn ? localStorage : sessionStorage;

    storage.setItem("access", access);
    storage.setItem("refresh", refresh);
    storage.setItem("role", role);
    storage.setItem("email", email);

    setUser({ access, refresh, role, email });
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
