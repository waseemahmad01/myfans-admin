import React, { useState } from "react";
import { Grid, Button, Typography, Box, Input, useTheme } from "@mui/material";
import { FormWrapper } from "src/components/_dashboard/user";
import Page from "src/components/Page";
import { InputField } from "src/components/_dashboard/user";
import SelectOptions from "src/components/_dashboard/user/SelectOptions";
import { mockImgPlaceholder } from "../utils/mockImages";
import {
  uploadImage,
  setItem,
  getData,
  updateItem,
  updateImage,
  db,
} from "src/database/db";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGifts } from "src/store";
import { useLocation } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const types = ["Classic", "Party", "Moods", "Collections", "Games"];
const UpdateGift = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState(location.state.uid);
  const [gift, setGift] = useState(
    location.state || {
      name: "",
      type: "Classic",
      points: null,
      active: "Active",
      imageUrl: null,
      imageFilename: null,
    }
  );
  const [modified, setModified] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGift({ ...gift, [name]: value });
  };
  const handleImageChange = (e) => {
    setModified(true);
    setGift({
      ...gift,
      imageUrl: e.target.files[0],
    });
  };
  const videoSrc = () => {
    if (gift.imageUrl && !modified) {
      return gift.imageUrl;
    } else if (gift.imageUrl && modified) {
      return URL.createObjectURL(gift.imageUrl);
    } else {
      return mockImgPlaceholder(1);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (modified) {
      const { imageUrl, imageFilename, ...rest } = gift;
      const date = new Date();
      const fileName = date.getTime().toString();
      let extension = imageUrl.name.split(".");
      const URL = await updateImage(
        imageUrl,
        `gifts/${imageFilename}`,
        `gifts/${fileName}.${extension[extension.length - 1]}`
      );
      let doc = {
        ...rest,
        points: Number(gift.points),
        imageUrl: URL,
        imageFilename: `${fileName}.${extension[extension.length - 1]}`,
      };
      updateItem("gifts", id, doc);
    } else {
      const { uid, ...data } = gift;
      console.log(data);
      updateItem("gifts", id, data);
    }

    setLoading(false);
    navigate("/giftlist", { replace: true });
  };
  const handleCancel = () => {
    setGift({
      name: "",
      type: "Classic",
      points: "",
      active: "Active",
      imageUrl: "",
      imageFilename: "",
    });
  };
  return (
    <Page title="User | Gift Details">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <FormWrapper title={t("Gift_Details")}>
            <Grid item xs={12} md={6} lg={6}>
              <Grid container item direction="column">
                <InputField
                  label={t("Name")}
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  value={gift.name}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <SelectOptions
                name="type"
                value={gift.type}
                label={t("Type")}
                options={types}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Grid container item direction="column">
                <InputField
                  name="points"
                  label={t("Points")}
                  placeholder={`${t("Points")} (${t("Number_only")})`}
                  type="number"
                  value={gift.points}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Grid container item direction="column">
                <SelectOptions
                  name="active"
                  value={gift.active}
                  label={t("Active")}
                  options={["Active", "Blocked"]}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              {loading ? (
                <SyncLoader color={theme.palette.primary.main} />
              ) : (
                <>
                  <Button
                    sx={{ mx: "10px", backgroundColor: "#4e73df" }}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    {t("Save")}
                  </Button>
                  <Button
                    sx={{ backgroundColor: "#858796" }}
                    variant="contained"
                    onClick={handleCancel}
                  >
                    {t("Cancel")}
                  </Button>
                </>
              )}
            </Grid>
          </FormWrapper>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormWrapper title={t("Uploads")}>
            <Grid
              container
              direction="column"
              alignItems="center"
              sx={{ px: "20px", pt: "20px", bgColor: "red" }}
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
                  src={videoSrc()}
                  style={{ width: "100%" }}
                  alt="description of"
                />
              </Box>
              {loading ? (
                <SyncLoader color={theme.palette.primary.main} />
              ) : (
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    sx={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ mt: "15px" }}
                  >
                    {t("Update")}
                  </Button>
                </label>
              )}
            </Grid>
          </FormWrapper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default UpdateGift;
