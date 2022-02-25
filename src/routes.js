import { useState, useEffect, useContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
// import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
// import Admin from "./pages/Admin";
import DashboardApp from "./pages/DashboardApp";
// import AdminProfile from "./pages/AdminProfile";
import MassMail from "./pages/MassMail";
import AddAdmin from "./pages/AddAdmin";
import NotFound from "./pages/Page404";
import AdminList from "./pages/AdminList";
// import AdminView from "./pages/AdminView";
// import AddUser from "./pages/AddUser";
import UserList from "./pages/UserList";
import ViewUser from "./pages/UserView";
import CreatorsList from "./pages/CreatorsList";
// import CreatorView from "./pages/CreatorView";
import PendingRequest from "./pages/moneyrequest/PendingRequest";
import AcceptRequest from "./pages/moneyrequest/AcceptRequest";
import DeclineRequest from "./pages/moneyrequest/DeclineRequest";
import VideoList from "./pages/VideoList";
import CreatorRequest from "./pages/CreatorRequest";
import CreatorRequestView from "./pages/CreatorRequestView";
import VideoView from "./pages/VideoView";
import GiftList from "./pages/GiftList";
import GiftDetails from "./pages/GiftDetails";
import UpdateGift from "./pages/UpdateGift";
// import PackList from "./pages/PackList";
import Reports from "./pages/Reports";
import ViewImage from "./pages/ViewImage";
import Login from "./pages/Login";
import { AuthContext } from "./Context/authContext";
import UpdatePassword from "./pages/UpdatePassword";
// import PRoute from "./pages/ProtectedRoute/PRoute";

// ----------------------------------------------------------------------

export default function Router() {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={auth ? <DashboardLayout /> : <Navigate to="/login" replace />}
      >
        <Route index path="" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="dashboard"
          element={auth ? <DashboardApp /> : <Navigate to="/login" replace />}
        />
        <Route
          path="addadmin"
          element={auth ? <AddAdmin /> : <Navigate to="/login" replace />}
        />
        <Route
          path="adminlist"
          element={auth ? <AdminList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="updateadmin"
          element={
            auth ? <AddAdmin update={true} /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="mass"
          element={auth ? <MassMail /> : <Navigate to="/login" replace />}
        />
        <Route
          path="updateaccount"
          element={
            auth ? (
              <AddAdmin update={true} account={true} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="userlist"
          element={auth ? <UserList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="viewuser"
          element={auth ? <ViewUser /> : <Navigate to="/login" replace />}
        />
        <Route
          path="creatorslist"
          element={auth ? <CreatorsList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="inquiry"
          element={auth ? <h1>Hello</h1> : <Navigate to="/login" replace />}
        />
        <Route
          path="pendingmoneyrequest"
          element={auth ? <PendingRequest /> : <Navigate to="/login" replace />}
        />
        <Route
          path="acceptmoneyrequest"
          element={auth ? <AcceptRequest /> : <Navigate to="/login" replace />}
        />
        <Route
          path="declinemoneyrequest"
          element={auth ? <DeclineRequest /> : <Navigate to="/login" replace />}
        />
        <Route
          path="videolist"
          element={auth ? <VideoList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="viewvideo"
          element={auth ? <VideoView /> : <Navigate to="/login" replace />}
        />
        <Route
          path="creatorrequest"
          element={auth ? <CreatorRequest /> : <Navigate to="/login" replace />}
        />
        <Route
          path="creatorrequestView"
          element={
            auth ? <CreatorRequestView /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="giftdetails"
          element={auth ? <GiftDetails /> : <Navigate to="/login" replace />}
        />
        <Route
          path="giftlist"
          element={auth ? <GiftList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="updategift"
          element={auth ? <UpdateGift /> : <Navigate to="/login" replace />}
        />
        <Route
          path="reports"
          element={auth ? <Reports /> : <Navigate to="/login" replace />}
        />
        <Route
          path="viewimage"
          element={auth ? <ViewImage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="updatepassword"
          element={auth ? <UpdatePassword /> : <Navigate to="/login" replace />}
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
  // return useRoutes(
  //   {
  //     path: "/dashboard",
  //     element: <DashboardLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" replace /> },
  //       {
  //         path: "app",
  //         element: <DashboardApp />,
  //       },
  //       // { path: "user", element: <User /> },
  //       // { path: "products", element: <Products /> },
  //       { path: "updateprofile", element: <AdminProfile /> },
  //       { path: "addadmin", element: <AddAdmin /> },
  //       { path: "updateadmin", element: <AddAdmin update={true} /> },
  //       { path: "adminview", element: <AdminView /> },
  //       { path: "adminlist", element: <AdminList /> },
  //       { path: "adduser", element: <AddUser /> },
  //       { path: "userlist", element: <UserList /> },
  //       { path: "viewuser", element: <ViewUser /> },
  //       { path: "creatorslist", element: <CreatorsList /> },
  //       { path: "creatorview", element: <CreatorView /> },
  //       { path: "pendingrequest", element: <PendingRequest /> },
  //       { path: "acceptrequest", element: <AcceptRequest /> },
  //       { path: "declinerequest", element: <DeclineRequest /> },
  //       { path: "videolist", element: <VideoList /> },
  //       { path: "creatorrequest", element: <CreatorRequest /> },
  //       { path: "creatorrequestview", element: <CreatorRequestView /> },
  //       { path: "giftlist", element: <GiftList /> },
  //       { path: "giftdetails", element: <GiftDetails /> },
  //       { path: "packlist", element: <PackList /> },
  //       { path: "reports", element: <Reports /> },
  //     ],
  //   },
  //   {
  //     path: "/",
  //     element: <LogoOnlyLayout />,
  //     children: [
  //       { path: "admin", element: <Admin /> },
  //       // { path: "login", element: <Login /> },
  //       // { path: "register", element: <Register /> },
  //       { path: "404", element: <NotFound /> },
  //       { path: "/", element: <Navigate to="/dashboard" /> },
  //       { path: "*", element: <Navigate to="/admin" /> },
  //     ],
  //   },
  //   { path: "*", element: <Navigate to="/404" replace /> },
  // ]);
}
