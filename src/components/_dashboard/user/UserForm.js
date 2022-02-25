import React, { useState, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
// import clipboardList from "@iconify/icons-fa-solid/clipboard-list";
import eyeIcon from "@iconify/icons-akar-icons/eye";
import eyeSlashed from "@iconify/icons-akar-icons/eye-slashed";
import {
  // Box,
  // Card,
  Grid,
  // Typography,
  Button,
  InputAdornment,
  useTheme,
} from "@mui/material";
import InputField from "./InputField";
import SelectOptions from "./SelectOptions";
import { updateImage, updateItem, uploadImage } from "../../../database/db";
import { setItem, getData } from "../../../database/db";
import { AdminContext } from "src/Context/adminContext";
import { AuthContext } from "src/Context/authContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAdmins, setAdmins } from "src/store";
import PulseLoader from "react-spinners/PulseLoader";
import { db } from "../../../database/db";
import {
  getDocs,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserForm = ({ update, account }) => {
  console.log(account);
  const { t } = useTranslation();
  const [admin, setAdmin] = useContext(AdminContext);
  const [oldCredentials, setOldCredentials] = useState({
    email: admin.email,
    password: admin.password,
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useContext(AuthContext);
  const state = useLocation().state;
  // console.log(admin);
  // console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  //create new admin user
  const createuser = async (col, item) => {
    try {
      console.log("running");
      const ref = doc(db, col, item.uid);
      let document = { ...item };
      // document.uid = ref.id;
      // console.log(document);
      await setDoc(ref, document, { merge: true });
    } catch (err) {
      console.log(err);
    }
  };

  //update admin user
  const updateuser = async (col, id, item) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, state.email, state.password);
      await updateEmail(auth.currentUser, admin.email);
      await updatePassword(auth.currentUser, admin.password);

      let loginUser = await getDoc(doc(db, "admin", user.userId));
      loginUser = loginUser.data();
      await signInWithEmailAndPassword(
        auth,
        loginUser.email,
        loginUser.password
      );
      // console.log(auth.currentUser);
      const data = await setDoc(doc(db, col, id), item, { merge: true });
      // console.log("data", data);
    } catch (err) {
      console.log(err);
    }
  };

  const formsubmithandler = async () => {
    setLoading(true);
    const date = new Date();
    const fileName = date.getTime().toString();
    const { file, image, ...doc } = admin;
    // console.log(image, doc);
    let extension = file.name.split(".");
    const url = await uploadImage(
      file,
      `adminImages/${fileName}.${extension[extension.length - 1]}`
    );
    let data = {
      ...doc,
      photoUrl: {
        url,
        filename: `adminImages/${fileName}.${extension[extension.length - 1]}`,
      },
    };
    console.log(data);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, admin.email, admin.password)
      .then(async (response) => {
        if (response) {
          toast.success("User Registered Successfully");
        }
        data.uid = response.user.uid;
        createuser("admin", data);
        setAdmin({
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
        const res = await getData("admin");
        dispatch(setAdmins(res));
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error(error.message);
            break;
          case "auth/invalid-email":
            toast.error(error.message);
            break;
          case "auth/weak-password":
            toast.error(error.message);
            break;
        }
      });
    setLoading(false);
    navigate("/adminlist", { replace: true });
  };
  // //form submit cancle handler
  const formsubmitcanclehandler = () => {
    setAdmin({
      name: "",
      email: "",
      type: "Admin",
      password: "",
      status: "Active",
      phone: "",
      gender: "Male",
      image: "",
    });
  };

  const handleUpdate = async () => {
    // console.log(oldCredentials);
    // console.log(admin.email, admin.password);
    setLoading(true);
    const date = new Date();
    const fileName = date.getTime().toString();
    const { file, image, email, password, ...doc } = admin;
    // console.log(file, image, doc);
    let extension = "";
    let data;
    if (!file) {
      // extension = image.fileName.split(".")[1];
      data = { ...doc, ...image };
    } else {
      extension = file.name.split(".");
      const url = await updateImage(
        file,
        image.filename,
        `adminImages/${fileName}.${extension[extension.length - 1]}`
      );
      data = {
        ...doc,
        photoUrl: {
          url,
          filename: `adminImages/${fileName}.${
            extension[extension.length - 1]
          }`,
        },
      };
    }
    // // console.log(admin);
    // console.log(data);

    await updateuser("admin", state.uid, data);
    const res = await getData("admin");
    dispatch(setAdmins(res));
    setLoading(false);
    navigate("/adminlist", { replace: true });
  };
  //password show
  const [show, setShow] = useState(false);

  const types = ["Admin", "Super_Admin"];
  const gender = ["Male", "Female"];
  const active = ["Active", "Blocked"];
  useEffect(() => {
    if (state) {
      setAdmin(state);
    }
  }, []);
  useState(() => {}, [admin]);
  return (
    <>
      <Grid item sm={12} md={6} lg={6}>
        <Grid container item direction="column">
          <ToastContainer />
          <InputField
            name="name"
            value={admin.name}
            onChange={handleChange}
            label={t("Name")}
            type="text"
            placeholder={t("Enter_Name")}
          />
        </Grid>
      </Grid>
      {account ? undefined : (
        <Grid item sm={12} md={6} lg={6}>
          <SelectOptions
            name="type"
            value={admin.type}
            onChange={handleChange}
            label={t("Type")}
            options={types}
          />
        </Grid>
      )}

      <Grid item sm={12} md={6} lg={6}>
        <Grid container item direction="column">
          <InputField
            name="password"
            value={admin.password}
            onChange={handleChange}
            label={t("Password")}
            placeholder={t("Password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon
                    style={{ cursor: "pointer" }}
                    icon={show ? eyeSlashed : eyeIcon}
                    onClick={() => setShow(!show)}
                  />
                </InputAdornment>
              ),
            }}
            type={show ? "text" : "password"}
          />
        </Grid>
      </Grid>
      <Grid item sm={12} md={6} lg={6}>
        <Grid container item direction="column">
          <InputField
            name="email"
            value={admin.email}
            onChange={handleChange}
            label={t("Email")}
            type="email"
            placeholder={t("Email")}
          />
        </Grid>
      </Grid>

      <Grid item sm={12} md={6} lg={6}>
        <Grid container item direction="column">
          <InputField
            name="phone"
            value={admin.phone}
            onChange={handleChange}
            label={t("Phone")}
            type="number"
            placeholder={t("Phone_no")}
          />
        </Grid>
      </Grid>
      <Grid item sm={12} md={6} lg={6}>
        <SelectOptions
          name="gender"
          value={admin.gender}
          onChange={handleChange}
          label={t("Gender")}
          options={gender}
        />
      </Grid>
      <Grid item sm={12} md={6} lg={6}>
        <SelectOptions
          name="status"
          value={admin.status}
          onChange={handleChange}
          label={t("Active")}
          options={active}
        />
      </Grid>
      <Grid item sm={12} md={12} lg={12}>
        {loading ? (
          <Grid>
            <PulseLoader color={theme.palette.primary.main} />
          </Grid>
        ) : (
          <>
            <Button
              sx={{ mx: "10px", backgroundColor: "#4e73df" }}
              variant="contained"
              onClick={update === true ? handleUpdate : formsubmithandler}
            >
              {update === true ? t("Update") : t("Submit")}
            </Button>
            <Button
              onClick={formsubmitcanclehandler}
              sx={{ backgroundColor: "#858796" }}
              variant="contained"
            >
              {t("Cancel")}
            </Button>
          </>
        )}
      </Grid>
    </>
  );
};

export default UserForm;
