import React from "react";
import { Route, Navigate } from "react-router-dom";

const PRoute = ({ children, path = "", element: Element }) => {
  const authenticated = Boolean(localStorage.getItem("auth"));
  return (
    <Route
      path={path}
      element={authenticated ? <Element /> : <Navigate to="/login" replace />}
    >
      {/* {children} */}
    </Route>
  );
};

export default PRoute;
