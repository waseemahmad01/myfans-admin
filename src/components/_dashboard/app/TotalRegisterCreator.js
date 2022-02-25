import { useState } from "react";
import { Icon } from "@iconify/react";
import smileOutlined from "@iconify/icons-ant-design/smile-outlined";
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
  borderLeft: `5px solid ${alpha(theme.palette.primary.Card2TextColor, 1)}`,
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

export default function TotalRegisterCreator() {
  const theme = useTheme();
  const { t } = useTranslation();
  const creators = useSelector((state) => state.creator.data);
  return (
    <RootStyle>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid item container direction="column" alignItems="flex-start">
            <Typography
              sx={{
                ...theme.typography.cardTitle,
                color: "primary.Card2TextColor",
              }}
            >
              {t("Creators")}
            </Typography>
            <Typography sx={{ ...theme.typography.cardNo }}>
              {creators.length}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <IconWrapperStyle>
            <Icon icon={smileOutlined} width={35} height={35} />
          </IconWrapperStyle>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
