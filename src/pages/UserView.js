import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import bxsUser from "@iconify/icons-bx/bxs-user";
import starFilled from "@iconify/icons-ant-design/star-filled";
import Divider from "@mui/material/Divider";
// import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";
import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Box,
  styled,
  Card,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// utils
import {
  mockAvatar,
  mockAvatar1,
  mockAvatar2,
  mockAvatar3,
} from "../utils/mockImages";
import { useLocation } from "react-router-dom";
import Video from "src/components/video/Video";
import { useTranslation } from "react-i18next";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, data) {
  return { name, data };
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#858796",
}));

export default function UserView() {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state;
  const coverPhotos = state.coverPhotos || [];
  const images = state.photos || [];
  const videos = state.videos || [];
  const lockImages = useMemo(() => {
    return images.filter((img) => img.lock === "true");
  }, []);
  const publicImages = useMemo(() => {
    return images.filter((img) => img.lock === "false");
  });
  const lockVideos = useMemo(() => {
    return videos.filter((video) => video.lock === "true");
  }, []);
  const publicVideos = useMemo(() => {
    return videos.filter((video) => video.lock === "false");
  }, []);
  const rows = [
    createData(t("Username"), state.displayName || "not defined"),
    createData(t("Age"), state.age || "not defined"),
    createData(t("Gender"), state.gender || "not defined"),
    createData(t("Mobile"), state.phoneNumber || "not defined"),
    createData(t("Email"), state.email || "not defined"),
    createData(t("Country"), state.country || "not defined"),
    createData(t("Personal_Status"), state.personalStatus || "not defined"),
    createData(t("Followers"), state.urFansCounter || 0),
    createData(t("Following"), state.myFansConuter || 0),
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "#dddfeb" }}>
        <TabsStyle
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <TabStyle label={t("User_Details")} {...a11yProps(0)} />
          <TabStyle label={t("Image")} {...a11yProps(1)} />
          <TabStyle label={t("Videos")} {...a11yProps(2)} />
        </TabsStyle>
      </Box>
      <TabPanelStyle value={value} index={0}>
        <Typography sx={{ mb: "20px", color: "#4e73df" }}>
          {t("User_Details")}
        </Typography>
        <CardStyle>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>{t("User_Details")}</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.data}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={4}>
              <Box
                component="img"
                src={state.photoURL}
                sx={{
                  objectFit: "contain",
                  aspectRatio: "1",
                  width: "80%",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.05)",
                  mx: "auto",
                  mb: "20px",
                }}
              />
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                sx={{ justifyContent: "center", pb: "20px" }}
              >
                <Item>
                  <Icon icon={bxsUser} /> {state.urFansCounter || 0}
                </Item>
                <Item>
                  <Icon icon={bxsUser} /> {state.myFansConuter || 0}
                </Item>
                <Item>
                  <Icon icon={starFilled} /> {state.stars || 0}
                </Item>
              </Stack>
              <Grid container spacing={2}>
                {coverPhotos.map((photo, index) => (
                  <Grid item key={index} xs={6}>
                    <ImageStyle component="img" src={photo} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardStyle>
      </TabPanelStyle>
      <TabPanelStyle value={value} index={1}>
        <Typography sx={{ mb: "20px" }}>{t("User_Images")}</Typography>
        <Grid
          container
          direction="column"
          sx={{
            background: "#fff",
            p: 2,
            borderRadius: "10px",
          }}
        >
          <Grid item>
            <Typography
              variant="h6"
              sx={{ fontWeight: 400, color: "#000", marginBottom: "1rem" }}
              component="div"
            >
              {t("Lock_Images")}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            {lockImages.length === 0 && (
              <Grid container justifyContent="center" sx={{ p: 4 }}>
                <Typography varaint="subtitile2" component="div">
                  {t("No_Lock_Images")}
                </Typography>
              </Grid>
            )}
            {lockImages.map((img, index) => (
              <Grid key={index} item xs={3}>
                <ImageStyle component="img" src={img.image} />
                <Stack
                  direction="row"
                  sx={{ py: 1 }}
                  justifyContent="space-between"
                >
                  <Typography component="div">{t("Price")}</Typography>
                  <Typography component="div">{img.price}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{ fontWeight: 400, color: "#000", marginBottom: "1rem" }}
              component="div"
            >
              {t("Public_Images")}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            {publicImages.length === 0 && (
              <Grid container justifyContent="center" sx={{ p: 4 }}>
                <Typography varaint="subtitile2" component="div">
                  {t("No_Public_Images")}
                </Typography>
              </Grid>
            )}
            {publicImages.map((img, index) => (
              <Grid key={index} item xs={3}>
                <ImageStyle component="img" src={img.image} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </TabPanelStyle>
      <TabPanelStyle value={value} index={2}>
        <Typography sx={{ mb: "20px" }}>{t("User_Videos")}</Typography>
        <Grid
          container
          direction="column"
          sx={{
            background: "#fff",
            p: 2,
            borderRadius: "10px",
          }}
        >
          <Grid item>
            <Typography
              variant="h6"
              sx={{ fontWeight: 400, color: "#000", marginBottom: "1rem" }}
              component="div"
            >
              {t("Lock_Videos")}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            {lockVideos.length === 0 && (
              <Grid container justifyContent="center" sx={{ p: 4 }}>
                <Typography varaint="subtitile2" component="div">
                  {t("No_Lock_Videos")}
                </Typography>
              </Grid>
            )}
            {lockVideos.map((video, index) => (
              <Grid key={index} item xs={3}>
                <Video URL={video.video} />
                <Stack
                  direction="row"
                  sx={{ py: 1 }}
                  justifyContent="space-between"
                >
                  <Typography component="div">{t("Price")}</Typography>
                  <Typography component="div">{video.price}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{ fontWeight: 400, color: "#000", marginBottom: "1rem" }}
              component="div"
            >
              {t("Public_Videos")}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            {publicVideos.length === 0 && (
              <Grid container justifyContent="center" sx={{ p: 4 }}>
                <Typography varaint="subtitile2" component="div">
                  {t("No_Public_Videos")}
                </Typography>
              </Grid>
            )}
            {publicVideos.map((video, index) => (
              <Grid key={index} item xs={3}>
                <Video URL={video.video} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </TabPanelStyle>
    </Box>
  );
}

const ImageStyle = styled((props) => <Box {...props} />)(({ theme }) => ({
  objectFit: "cover",
  aspectRatio: "1",
  borderRadius: "10px",
  width: "100%",
  aspectRatio: "1/1.5",
}));

const TabStyle = styled((props) => <Tab {...props} />)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#fff",
    color: "#6e707e",
  },
}));

const TabsStyle = styled((props) => <Tabs {...props} />)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const TabPanelStyle = styled((props) => <TabPanel {...props} />)(
  ({ theme }) => ({
    color: "#6e707e",
  })
);

const CardStyle = styled((props) => <Card {...props} />)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "50px 20px",
  borderRadius: "7px",
}));
