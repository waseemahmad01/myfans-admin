import * as React from "react";
import { useContext } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { mockImgPlaceholder } from "../../../utils/mockImages";
import { AdminContext } from "src/Context/adminContext";
import { useTranslation } from "react-i18next";
const Input = styled("input")({
  display: "none",
});
export default function UploadButton() {
  const [admin, setAdmin] = useContext(AdminContext);
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ px: "20px", pt: "20px" }}
    >
      <Typography sx={{ pb: "10px" }}>{t("Image")}</Typography>
      <Box
        sx={{
          background: "#f8f9fc",
          height: "150px",
          width: "150px",
          borderRadius: "7px",
          overflow: "hidden",
          mx: "auto",
        }}
      >
        <img
          src={admin.image.url ? admin.image.url : mockImgPlaceholder(1)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="description of"
        />
      </Box>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={(e) => {
            setAdmin({
              ...admin,
              file: e.target.files[0],
              image: {
                url: URL.createObjectURL(e.target.files[0]),
                filename: admin.image.filename,
              },
            });
          }}
        />

        <Button variant="contained" component="span" sx={{ mt: "15px" }}>
          {t("Upload")}
        </Button>
      </label>
    </Grid>
  );
}
