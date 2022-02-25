import { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  color: theme.palette.common.white,
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.common.white,
  },
}));

const ListItemStyleChild = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 35,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  color: theme.palette.common.white,
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.common.white,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children, sectionTitle } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: "common.white",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle sx={{ color: isActiveRoot && "common.white" }}>
            {icon && icon}
          </ListItemIconStyle>
          <ListItemText disableTypography primary={t(`${title}`)} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" sx={{ p: 2 }} unmountOnExit>
          <Grid
            container
            direction="column"
            sx={{ backgroundColor: "common.white", borderRadius: "6px" }}
          >
            <Typography
              sx={{
                pl: "16px",
                pt: "10px",
                fontSize: "11px",
                color: "#b7b9cc",
                textTransform: "uppercase",
              }}
            >
              {t(`${sectionTitle}`)}
            </Typography>
            <List component="div" disablePadding>
              {children.map((item, index) => {
                const { title, path } = item;
                const isActiveSub = active(path);

                return (
                  <ListItemStyleChild
                    key={title}
                    component={RouterLink}
                    to={path}
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                    }}
                  >
                    <ListItemText
                      disableTypography
                      sx={{ color: "common.black", fontSize: "14px" }}
                      primary={t(`${title}`)}
                    />
                  </ListItemStyleChild>
                );
              })}
            </List>
          </Grid>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={t(`${title}`)} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const match = (path) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
