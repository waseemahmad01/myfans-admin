import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const data = localStorage.getItem("auth");
  const [auth, setAuth] = useState(data ? JSON.parse(data) : null);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
