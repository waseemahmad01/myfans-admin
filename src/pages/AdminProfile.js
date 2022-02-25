// import { Box, Card, Typography, Grid } from "@mui/material";
import { Grid } from "@mui/material";
//import { styled } from "@mui/material/styles";
import Page from "../components/Page";
import { FormWrapper } from "../components/_dashboard/user";
import { UserForm } from "../components/_dashboard/user";
import { UploadButton } from "../components/_dashboard/user";
import { useLocation } from "react-router-dom";
import UpdateImage from "src/components/_dashboard/user/UpdateImage";
import { useEffect, useContext } from "react";
import { AdminContext } from "src/Context/adminContext";
export default function AddAdmin(props) {
  const location = useLocation();
  const [admin, setAdmin] = useContext(AdminContext);
  console.log(location);
  const { update } = props;
  console.log(update);
  const url = location.pathname;
  useEffect(() => {
    if (url === "/dashboard/addadmin") {
      setAdmin({
        name: "",
        email: "",
        type: "Admin",
        password: "",
        status: "Active",
        phone: "",
        gender: "Male",
        image: "",
        file: "",
      });
    }
  }, [url]);
  return (
    <Page title="User | Update Profile">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <FormWrapper title="Update Profile">
            <UserForm update={update} state={location.state} />
          </FormWrapper>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormWrapper title="Add Image">
            {update ? <UpdateImage /> : <UploadButton />}
          </FormWrapper>
        </Grid>
      </Grid>
    </Page>
  );
}
