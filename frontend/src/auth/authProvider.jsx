import React, { useState, useEffect, useMemo } from "react";
import { AuthContext } from "./authContext";
import Cookies from "js-cookie";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const userRaw = Cookies.get("user");
      const token = Cookies.get("token");

      if (userRaw && token) {
        const parsedUser = JSON.parse(userRaw);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const contextValue = useMemo(
    () => ({ user, setUser, authLoading }),
    [user, authLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {authLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
