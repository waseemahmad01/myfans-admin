// material
import {
  Card,
  Stack,
  Container,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Page from "../components/Page";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

export default function VideoView() {
  const location = useLocation();
  const state = location.state;
  const { t } = useTranslation();
  return (
    <Page title="Videos | Videos Details">
      <Container maxWidth={false}>
        <Card sx={{ borderRadius: "5px" }}>
          <Grid container direction="column" sx={{ p: 1, pl: 1 }}>
            <Typography
              component={"div"}
              sx={{ pl: 1, pt: 1 }}
              color="info.main"
              variant="h5"
            >
              {t("Video_Details")}
            </Typography>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={8}>
                <Grid container sx={{ background: "#ededed" }}>
                  <video
                    src={state.video.video || ""}
                    controls
                    style={{ width: "100%", aspectRatio: "1/0.65" }}
                  ></video>
                </Grid>
              </Grid>
              <Grid item md={4} xs={12}>
                <Grid
                  container
                  sx={{ height: "100%", backgroundColor: "primary.main", p: 2 }}
                >
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      height: "100%",
                      border: "2px solid #fff",
                      borderStyle: "dashed",
                      p: 2,
                      boxSizing: "border-box",
                    }}
                  >
                    <Grid item container justifyContent="center">
                      <Img item>
                        <Avatar
                          src={state.photoURL}
                          alt=""
                          sx={{ width: "100%", height: "100%" }}
                        />
                      </Img>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h4"
                        color="common.white"
                        sx={{ textTransform: "capitalize", my: 2 }}
                      >
                        {state.displayName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        color="common.white"
                        sx={{
                          textTransform: "capitalize",
                          alignItems: "center",
                          display: "flex",
                          mt: 1,
                        }}
                      >
                        <Icon icon="bx:bxs-user" /> &nbsp; {t("Followers")}
                        &nbsp;:&nbsp; {state.urFansCounter}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        color="common.white"
                        sx={{
                          textTransform: "capitalize",
                          alignItems: "center",
                          display: "flex",
                          mt: 1,
                        }}
                      >
                        <Icon icon="bx:bxs-user" /> &nbsp; {t("Following")}
                        &nbsp;:&nbsp; {state.myFansCounter || 0}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        color="common.white"
                        sx={{
                          textTransform: "capitalize",
                          alignItems: "center",
                          display: "flex",
                          mt: 1,
                        }}
                      >
                        <Icon icon="clarity:star-solid" /> &nbsp; {t("Ratings")}
                        &nbsp;:&nbsp;
                        {state.stars || 0}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        color="common.white"
                        sx={{
                          textTransform: "capitalize",
                          alignItems: "center",
                          display: "flex",
                          mt: 1,
                        }}
                      >
                        <Icon icon="fa-solid:phone-square-alt" /> &nbsp;{" "}
                        {t("Phone")}
                        &nbsp;:&nbsp;
                        {state.phoneNumber || "Not available"}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        color="common.white"
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          mt: 1,
                        }}
                      >
                        <Icon icon="whh:emailalt" /> &nbsp; {t("Email")}{" "}
                        &nbsp;:&nbsp;
                        {state.email || "Not available"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}

const Img = styled((props) => <Grid {...props} />)(({ theme }) => ({
  width: "200px",
  height: "200px",
  border: "2px solid #fff",
  padding: "15px",
  borderRadius: "50%",
  [theme.breakpoints.down("xl")]: {
    width: "120px",
    height: "120px",
    padding: "8px",
  },
}));
