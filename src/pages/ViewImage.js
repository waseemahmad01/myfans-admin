import react from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
export default function ViewImage() {
  const location = useLocation();
  const imagepath = location.state;
  return (
    <Grid container justifyContent="center" sx={{ height: "65vh" }}>
      <img src={imagepath} style={{ height: "100%", objectFit: "cover" }} />
    </Grid>
  );
}
