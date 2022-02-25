// material
import React from "react";
import { Box, Grid, Container, Typography } from "@mui/material";

// components
import Page from "../components/Page";
import {
  AppTasks,
  TotalRegisterCreator,
  TotalReports,
  AppNewsUpdate,
  TotalRegisterUsers,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "../components/_dashboard/app";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { t } = useTranslation();
  return (
    <Page title="Dashboard | My Fans">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "300",
              borderTop: "1px solid #ffffff",
              borderBottom: "1px solid #ffffff",
            }}
          >
            {t("Dashboard")}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TotalRegisterUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TotalRegisterCreator />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <TotalGifts />
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <TotalReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {/* <AppConversionRates /> */}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {/* <AppCurrentSubject /> */}
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {/* <AppNewsUpdate /> */}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {/* <AppOrderTimeline /> */}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {/* <AppTrafficBySite /> */}
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {/* <AppTasks /> */}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
