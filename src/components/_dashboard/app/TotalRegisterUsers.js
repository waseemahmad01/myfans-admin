import { Icon } from "@iconify/react";
import calendarAlt from "@iconify/icons-uil/calendar-alt";
import { useTheme } from "@emotion/react";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Grid } from "@mui/material";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  // boxShadow: 'none',
  textAlign: "center",
  padding: theme.spacing(2, 0),
  paddingInline: "19px 24px",
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.common.white,
  borderLeft: `5px solid ${alpha(theme.palette.primary.Card1TextColor, 1)}`,
  boxShadow: theme.shadows[10],
  borderRadius: "7px",
}));
const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  color: theme.palette.primary.iconColor,
}));

// ----------------------------------------------------------------------

export default function TotalRegisterUsers() {
  const theme = useTheme();
  const { t } = useTranslation();
  const users = useSelector((state) => state.user.data);

  return (
    <RootStyle>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid item container direction="column" alignItems="flex-start">
            <Typography
              sx={{
                ...theme.typography.cardTitle,
                color: "primary.Card1TextColor",
              }}
            >
              {t("Users")}
            </Typography>
            <Typography sx={{ ...theme.typography.cardNo }}>
              {users.length}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <IconWrapperStyle>
            <Icon icon={calendarAlt} width={35} height={35} />
          </IconWrapperStyle>
        </Grid>
      </Grid>
      {/* <IconWrapperStyle>
        <Icon icon={userFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{TOTAL}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        USERS
      </Typography> */}
    </RootStyle>
  );
}
