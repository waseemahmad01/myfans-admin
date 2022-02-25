import * as React from "react";
//import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
//import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { Grid, Typography } from "@mui/material";

export default function SelectOptions(props) {
  const { label, options, name, value, onChange } = props;

  // const [age, setAge] = React.useState("Please Select");

  // const handleChange = (event) => {
  // 	setAge(event.target.value);
  // };

  return (
    <Grid container>
      <Typography sx={{ mb: 0.8 }}>{label}</Typography>
      <SelectStyle
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={value}
        onChange={onChange}
        fullWidth
        name={name}
      >
        {options.map((option, index) => (
          <MenuItemStyle key={index} value={option}>
            {option}
          </MenuItemStyle>
        ))}
      </SelectStyle>
    </Grid>
  );
}

const SelectStyle = styled((props) => <Select {...props} />)(({ theme }) => ({
  height: 40,
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #d1d3e2",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #d1d3e2",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #bac8f3",
    boxShadow: "0 0 0 0.2rem rgb(78 115 223 / 25%)",
  },
}));
const MenuItemStyle = styled((props) => <MenuItem {...props} />)(
  ({ theme }) => ({})
);
