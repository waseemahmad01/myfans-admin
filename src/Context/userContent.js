import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    type: "User",
    password: "",
    status: "Active",
    phone: "",
    gender: "Male",
    image: {
      url: "",
      filename: "",
    },
    file: "",
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
