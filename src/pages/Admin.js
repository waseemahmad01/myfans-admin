import * as React from "react";
import { useState, useEffect, useContext } from "react";
// import DashboardLayout from "../layouts/dashboard";
// import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// import DashboardApp from "../pages/DashboardApp";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthContext } from "src/Context/authContext";
export default function Admin() {
  // const [user, setUser] = useState("");
  const [toggleForm, settoggleForm] = useState(true);
  const [auth, setAuth] = useContext(AuthContext);
  const formMode = () => {
    settoggleForm(!toggleForm);
  };
  const userState = () => {
    const data = localStorage.getItem("user");
    const us = data ? JSON.parse(data) : null;
    // setUser(us);
    setAuth(us);
    // console.log(us);
  };
  useEffect(() => {
    userState();
  }, []);

  return (
    <>
      {auth !== null ? (
        <App />
      ) : (
        <>
          {toggleForm ? (
            <Login loggedIn={setAuth} toggle={() => formMode()} />
          ) : (
            <Register toggle={() => formMode()} />
          )}
        </>
      )}
    </>
  );
}
