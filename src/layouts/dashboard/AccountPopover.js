import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
//
import account from "../../_mocks_/account";
import lockIcon from "@iconify/icons-dashicons/lock";

import { AuthContext } from "src/Context/authContext";
import { AdminContext } from "src/Context/adminContext";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function AccountPopover(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const [admin, setAdmin] = useContext(AdminContext);
  const adminData = useSelector((state) => state.adminData.data);
  const { t } = useTranslation();
  // console.log(auth);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const logouthandle = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/login");
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={adminData.photoUrl.url} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {adminData.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {adminData.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          key={"Profile"}
          onClick={() => {
            // console.log(adminData);
            setAdmin({
              name: adminData.name,
              email: adminData.email,
              type: adminData.type,
              password: adminData.password,
              status: adminData.status,
              phone: adminData.phone,
              gender: "Male",
              image: {
                url: adminData.photoUrl.url,
                filename: adminData.photoUrl.filename,
              },
              file: "",
            });
            navigate("/updateaccount", {
              state: {
                uid: adminData.uid,
                name: adminData.name,
                email: adminData.email,
                type: adminData.type,
                password: adminData.password,
                status: adminData.status,
                phone: adminData.phone,
                gender: "Male",
                image: {
                  url: adminData.photoUrl.url,
                  filename: adminData.photoUrl.filename,
                },
                file: "",
              },
            });
            handleClose();
          }}
          sx={{ typography: "body2", py: 1, px: 2.5 }}
        >
          <Box
            component={Icon}
            icon={personFill}
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />
          {t("Profile")}
        </MenuItem>
        <MenuItem
          component={RouterLink}
          key={"updatePassword"}
          to="/updatepassword"
          onClick={handleClose}
          sx={{ typography: "body2", py: 1, px: 2.5 }}
        >
          <Box
            component={Icon}
            icon={lockIcon}
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />
          {t("Update_Password")}
        </MenuItem>

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            onClick={logouthandle}
            fullWidth
            color="inherit"
            variant="outlined"
          >
            {t("Logout")}
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
