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
import { useTranslation } from "react-i18next";

export default function AddAdmin(props) {
  const location = useLocation();
  const { t } = useTranslation();
  const [admin, setAdmin] = useContext(AdminContext);
  // console.log(location);
  const { update, account } = props;
  // console.log(update);
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
    <Page title="User | Add Admin Details">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <FormWrapper title={t("Admin_Details")}>
            <UserForm
              update={update}
              state={location.state}
              account={account}
            />
          </FormWrapper>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormWrapper title={t("Add_Image")}>
            {update ? <UpdateImage /> : <UploadButton />}
          </FormWrapper>
        </Grid>
      </Grid>
    </Page>
  );
}
