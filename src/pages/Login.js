import * as React from "react";
import { useState } from "react";
import {
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { loginImage } from "../utils/mockImages";
import { styled } from "@mui/material/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "src/Context/authContext";

export default function SignInSide(props) {
  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const [rememberme, setrememberme] = useState(false);
  const [loading, setLoading] = useState(false);
  const override = `display:block;margin-left:100px;border-color:red;`;
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [auth, setAuth] = React.useContext(AuthContext);
  const theme = useTheme();

  const handleEmail = (event) => {
    setloginemail(event.target.value);
  };
  const handlePassword = (event) => {
    setloginpassword(event.target.value);
  };
  const handleCheck = (event) => {
    setrememberme(event.target.checked);
  };
  const handlerLogin = () => {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginemail, loginpassword)
      .then((userCredential) => {
        const user = userCredential.user;
        const data = {
          userId: user.uid,
          email: user.email,
        };
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        setLoading(false);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

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
        <ToastContainer />
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
              onSubmit={handlerLogin}
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
                name="loginemail"
                value={loginemail}
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
                name="loginpassword"
                type="password"
                value={loginpassword}
                validators={["required"]}
                errorMessages={"Password is Required"}
                autoComplete="off"
              />
              <FormControlLabel
                control={<Checkbox value={rememberme} color="primary" />}
                label="Remember me"
                onChange={(e) => {
                  handleCheck(e);
                }}
              />
              <Grid container justifyContent="center">
                {loading ? (
                  <ScaleLoader
                    css={override}
                    size={150}
                    color={theme.palette.primary.main}
                    loading={loading}
                  />
                ) : (
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
                    Sign In
                  </Button>
                )}
              </Grid>
              <Grid
                container
                justifyContent="center"
                sx={{ borderTop: "1px solid #e5e5e5", mt: 3, pt: 3 }}
              >
                {/* <Grid item>
                  <Link
                    onClick={props.toggle}
                    variant="body2"
                    sx={{ cursor: "pointer" }}
                  >
                    {"Already Have an account? Sign Up"}
                  </Link>
                </Grid> */}
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
