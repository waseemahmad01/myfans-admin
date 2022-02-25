import React from "react";
import { TextField, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
const InputField = ({ label, children, ...rest }) => {
  // const { label, placeholder } = props;
  return (
    <Grid>
      <Typography sx={{ mb: 0.8 }}>{label}</Typography>
      <Input {...rest} fullWidth variant="outlined">
        {children}
      </Input>
    </Grid>
  );
};

export default InputField;

const Input = styled((props) => <TextField {...props} />)(({ theme }) => ({
  // background: "red",
  "& input": {
    height: "40px",
    paddingBlock: 0,
  },
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
