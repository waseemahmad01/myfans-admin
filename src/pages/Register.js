import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  // TextField,
  // FormControlLabel,
  // Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { loginImage } from "../utils/mockImages";
import { styled } from "@mui/material/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
//connect firebase
import fire from "../database/db";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register(props) {
  const [registeremail, setregisteremail] = useState("");
  const [registerpassword, setregisterpassword] = useState("");
  const [registerconfirmpassword, setregisterconfirmpassword] = useState("");
  const handleEmail = (event) => {
    setregisteremail(event.target.value);
  };
  const handlePassword = (event) => {
    setregisterpassword(event.target.value);
  };
  const handleconfirmPassword = (event) => {
    setregisterconfirmpassword(event.target.value);
  };

  const handlerSingUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, registeremail, registerpassword)
      .then((response) => {
        if (response) {
          props.toggle();
          toast.success("User Registered Successfully");
        }
        // response.uid=user.uid
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
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== registerpassword) {
        return false;
      } else {
        return true;
      }
    });
    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [registerpassword]);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",
        backgroundImage: `linear-gradient(45deg,rgba(25,24,101,1) 0%, rgba(89,77,170,1) 47%, rgba(255,0,172,1) 100%)`,
      }}
    >
      <ToastContainer />
      <Grid
        container
        component="main"
        sx={{
          height: "80vh",
          width: "70%",
          marginTop: "0%",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Grid
          item
          xs={false}
          sm={false}
          md={6}
          sx={{
            backgroundImage: `url('${loginImage}')`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome Back!
            </Typography>
            <FormStyle
              onSubmit={handlerSingUp}
              onError={(errors) => {
                for (const err of errors) {
                  console.log(err.props.errorMessages[0]);
                }
              }}
            >
              <TextFieldStyle
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="Email"
                onChange={handleEmail}
                name="registeremail"
                value={registeremail}
                validators={["required", "isEmail"]}
                errorMessages={("This field is required", "Email is not Valid")}
                autoComplete="off"
              />
              <TextFieldStyle
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="Password"
                onChange={handlePassword}
                name="registerpassword"
                type="password"
                value={registerpassword}
                validators={["required"]}
                errorMessages={"Password is Required"}
                autoComplete="off"
              />
              <TextFieldStyle
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="Confirm Password"
                onChange={handleconfirmPassword}
                name="registerconfirmpassword"
                type="password"
                value={registerconfirmpassword}
                validators={["isPasswordMatch", "required"]}
                errorMessages={"Password d'not Mactch"}
                autoComplete="off"
              />
              <Grid container justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    px: 3,
                    py: 1,
                    borderRadius: "5px",
                    backgroundColor: "#4e73df",
                  }}
                >
                  Registor
                </Button>
              </Grid>
              <Grid
                container
                justifyContent="center"
                sx={{ borderTop: "1px solid #e5e5e5", mt: 3, pt: 3 }}
              >
                <Grid item>
                  <Link
                    onClick={props.toggle}
                    variant="body2"
                    sx={{ cursor: "pointer" }}
                  >
                    {"Already Have an account? SignIn"}
                  </Link>
                </Grid>
              </Grid>
            </FormStyle>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

const TextFieldStyle = styled((props) => (
  <TextValidator
    InputProps={{
      style: {
        borderRadius: "30px",
      },
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #d1d3e2",
    },
    "&:hover fieldset": {
      border: "1px solid #d1d3e2",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #bac8f3",
      boxShadow: "0 0 0 0.2rem rgb(78 115 223 / 25%)",
    },
  },
}));

const FormStyle = styled((props) => <ValidatorForm {...props} />)(
  ({ theme }) => ({
    width: "100%",
  })
);
