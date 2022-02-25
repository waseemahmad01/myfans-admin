import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import {
  setAdmins,
  setCreatorRequest,
  setCreators,
  setGifts,
  setUsers,
  setVideos,
  setAdminData,
} from "../../store";
import { useDispatch } from "react-redux";
import { db, getData } from "../../database/db";
import {
  // getDocs,
  where,
  query,
  collection,
  onSnapshot,
  getDocs,
  // getDoc,
  doc,
} from "firebase/firestore";
import { AuthContext } from "src/Context/authContext";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    const un1 = onSnapshot(collection(db, "users"), (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      dispatch(setUsers(list));
    });

    const un2 = onSnapshot(collection(db, "admin"), (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      dispatch(setAdmins(list));
    });

    getDocs(
      query(collection(db, "users"), where("isCreator", "==", "approved"))
    ).then((snapshot) => {
      const list = snapshot.docs.map(async (doc) => {
        try {
          let response = await getDocs(
            collection(db, `users/${doc.id}/creator`)
          );
          let creatorData = response.docs[0].data();
          return { ...doc.data(), ...creatorData };
        } catch (err) {
          console.log(err);
        }
      });
      Promise.all(list).then((data) => {
        dispatch(setCreators(data));
      });
    });

    const un4 = onSnapshot(collection(db, "gifts"), (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      dispatch(setGifts(list));
    });

    getDocs(
      query(collection(db, "users"), where("isCreator", "==", "pending"))
    ).then((snapshot) => {
      const list = snapshot.docs.map(async (doc) => {
        // console.log(doc.id);
        let response = await getDocs(collection(db, `users/${doc.id}/creator`));
        if (response.docs.length >= 1) {
          let creatorData = response.docs[0].data();
          // console.log(creatorData);
          return { ...doc.data(), ...creatorData };
        }
      });
      Promise.all(list).then((data) => {
        // console.log(data);
        if (data) {
          // console.log(data);
          dispatch(setCreatorRequest(data));
        }
      });
    });

    getDocs(collection(db, "users")).then((snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      dispatch(setVideos(list));
    });

    onSnapshot(doc(db, "admin", auth.userId), (snapshot) => {
      dispatch(setAdminData(snapshot.data()));
    });

    return () => {
      un1();
      un2();
      un4();
    };

    // getUsers();
    // getAdmins();
    // getCreators();
    // getCreatorsRequest();
  }, []);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
