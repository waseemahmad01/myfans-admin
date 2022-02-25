import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Icon } from "@iconify/react";
//import smileOutlined from '@iconify/icons-ant-design/smile-outlined';
//import laughWink from '@iconify/icons-fa-regular/laugh-wink';
import laughWink from "@iconify/icons-fa-solid/laugh-wink";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  // Link,
  // Button,
  Drawer,
  Typography,
  // Avatar,
  // Stack,
  Grid,
} from "@mui/material";
// components
//import Logo from '../../components/Logo';
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import { MHidden } from "../../components/@material-extend";
//
import config from "./SidebarConfig";
//import account from '../../_mocks_/account';
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 230;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

// const AccountStyle = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2, 2.5),
//   borderRadius: theme.shape.borderRadiusSm,
//   backgroundColor: theme.palette.grey[200]
// }));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  //borderRadius: '50%',
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(6.5),
  transform: "rotate(-15deg)",
  justifyContent: "center",
  // marginBottom: theme.spacing(3),
  color: theme.palette.common.white,
  //backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(theme.palette.primary.dark,0.24)} 100%)`
}));
// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const theme = useTheme();
  const admin = useSelector((state) => state.adminData.data);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 0.7, py: 0.7 }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "inline-flex",
            textDecoration: "none",
            color: "common.white",
          }}
        >
          {/* <Logo /> */}
          <Grid item container alignItems="center">
            <Grid item>
              <IconWrapperStyle>
                <Icon icon={laughWink} width={32} height={32} />
              </IconWrapperStyle>
            </Grid>
            <Grid item>
              <Typography
                sx={{ ...theme.typography.Logo, textTransform: "uppercase" }}
              >
                MyFans
                <sup style={{ marginLeft: "5px" }}>Admin</sup>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box> */}

      <NavSection
        navConfig={
          admin.type === "Super Admin"
            ? config.sidebarConfig
            : config.sidebarConfig2
        }
      />

      {/* <Box sx={{ flexGrow: 1 }} /> */}
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              backgroundImage: theme.palette.gradients.primary,
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              // bgcolor: 'primary.main'
              backgroundImage: theme.palette.gradients.primary,
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
