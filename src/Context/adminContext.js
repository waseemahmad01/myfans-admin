import React, { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { t } = useTranslation();
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    type: "Admin",
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
    <AdminContext.Provider value={[admin, setAdmin]}>
      {children}
    </AdminContext.Provider>
  );
};
