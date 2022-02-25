import React, { useState } from "react";
import Page from "src/components/Page";
import { FormWrapper } from "src/components/_dashboard/user";
import { Grid, Button, InputAdornment, useTheme } from "@mui/material";
import { InputField } from "src/components/_dashboard/user";
import { Icon } from "@iconify/react";
import eyeIcon from "@iconify/icons-akar-icons/eye";
import eyeSlashed from "@iconify/icons-akar-icons/eye-slashed";
import { styled } from "@mui/material/styles";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { useSelector } from "react-redux";
import { setDoc, doc } from "firebase/firestore";
import { db } from "src/database/db";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function UpdatePassword(props) {
  const auth = getAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const admin = useSelector((state) => state.adminData.data);
  const [isVisible, setIsVisible] = useState({
    one: false,
    two: false,
    three: false,
  });
  const [password, setPassword] = useState({
    old: "",
    new: "",
    cnew: "",
  });
  const [error, setError] = useState({
    old: "",
    new: "",
    cnew: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };
  const validate = () => {
    let errorObj = {
      old: "",
      new: "",
      cnew: "",
    };
    if (password.old === "" || password.old !== admin.password) {
      errorObj.old = "Invalid Password!";
    } else {
      errorObj.old = "";
    }
    if (password.new === "" && password.cnew === "") {
      errorObj.new = "Password cannot be empty!";
      errorObj.cnew = "Confirm password cannot be empty!";
    } else if (password.new !== password.cnew) {
      errorObj.new = "Confirm password is not same!";
      errorObj.cnew = "Confirm password is not same!";
    } else {
      errorObj.new = "";
      errorObj.cnew = "";
    }
    if (errorObj.old === "" && errorObj.new === "" && errorObj.cnew === "") {
      setError(errorObj);
      return false;
    } else {
      setError(errorObj);
      return true;
    }
  };
  const handleSave = async () => {
    const error = validate();
    if (!error) {
      try {
        setLoading(true);
        await setDoc(
          doc(db, "admin", admin.uid),
          { password: password.new },
          { merge: true }
        );
        await signInWithEmailAndPassword(auth, admin.email, admin.password);
        await updatePassword(auth.currentUser, password.new);
        setLoading(false);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        setLoading(false);
        alert("something went wrong");
      }
    }
  };

  return (
    <Page title="User | Update password">
      <FormWrapper title={t("Update_Password")}>
        <form
          style={{ paddingLeft: "2rem", paddingTop: "2rem", width: "100%" }}
        >
          <Grid container direction="column">
            <Grid md={4} sm={8} xs={12}>
              <Grid item sx={{ mb: 2 }}>
                <InputField
                  label={t("Old_Password")}
                  placeholder={t("Old_Password")}
                  name="old"
                  value={password.old}
                  onChange={handleChange}
                  error={Boolean(error.old)}
                  helperText={error.old}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon
                          style={{ cursor: "pointer" }}
                          icon={isVisible.one ? eyeSlashed : eyeIcon}
                          onClick={() =>
                            setIsVisible({ ...isVisible, one: !isVisible.one })
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                  type={isVisible.one ? "text" : "password"}
                />
              </Grid>
            </Grid>
            <Grid md={4} sm={8} xs={12}>
              <Grid item sx={{ mb: 2 }}>
                <InputField
                  label={t("New_Password")}
                  placeholder={t("New_Password")}
                  name="new"
                  value={password.new}
                  onChange={handleChange}
                  error={Boolean(error.new)}
                  helperText={error.new}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon
                          style={{ cursor: "pointer" }}
                          icon={isVisible.two ? eyeSlashed : eyeIcon}
                          onClick={() =>
                            setIsVisible({ ...isVisible, two: !isVisible.two })
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                  type={isVisible.two ? "text" : "password"}
                />
              </Grid>
            </Grid>
            <Grid md={4} sm={8} xs={12}>
              <Grid item sx={{ mb: 2 }}>
                <InputField
                  label={t("Confirm_Password")}
                  placeholder={t("Confirm_Password")}
                  name="cnew"
                  value={password.cnew}
                  onChange={handleChange}
                  error={Boolean(error.cnew)}
                  helperText={error.cnew}
                  //   error
                  //   helperText="hello world"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon
                          style={{ cursor: "pointer" }}
                          icon={isVisible.three ? eyeSlashed : eyeIcon}
                          onClick={() =>
                            setIsVisible({
                              ...isVisible,
                              three: !isVisible.three,
                            })
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                  type={isVisible.three ? "text" : "password"}
                />
              </Grid>
            </Grid>
            <Grid item sx={{ marginTop: "1rem" }}>
              {loading ? (
                <>
                  <SyncLoader color={theme.palette.primary.main} />
                </>
              ) : (
                <>
                  <ButtonStyles
                    variant="contained"
                    onClick={handleSave}
                    color="primary"
                  >
                    {t("Save")}
                  </ButtonStyles>
                  <Button
                    variant="contained"
                    onClick={() => navigate(-1)}
                    color="primary"
                  >
                    {t("Back")}
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </form>
      </FormWrapper>
    </Page>
  );
}

export default UpdatePassword;

const ButtonStyles = styled((props) => <Button {...props} />)(({ theme }) => ({
  background: theme.palette.primary.dark,
  marginRight: "5px",
}));
