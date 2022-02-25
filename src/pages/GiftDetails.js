import React, { useState } from "react";
import { Grid, Button, Typography, Box, Input, useTheme } from "@mui/material";
import { FormWrapper } from "src/components/_dashboard/user";
import Page from "src/components/Page";
import { InputField } from "src/components/_dashboard/user";
import SelectOptions from "src/components/_dashboard/user/SelectOptions";
import { mockImgPlaceholder } from "../utils/mockImages";
import { uploadImage, setItem, getData } from "src/database/db";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGifts } from "src/store";
import { useTranslation } from "react-i18next";

const types = ["Classic", "Party", "Moods", "Collections", "Games"];
const GiftDetails = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gift, setGift] = useState({
    name: "",
    type: "Classic",
    points: null,
    active: "Active",
    imageUrl: null,
    imageFilename: null,
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGift({ ...gift, [name]: value });
  };
  const handleImageChange = (e) => {
    setGift({
      ...gift,
      imageUrl: e.target.files[0],
    });
  };
  const videoSrc = () => {
    if (gift.imageUrl) {
      return URL.createObjectURL(gift.imageUrl);
    } else {
      return mockImgPlaceholder(1);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    const { imageUrl, ...doc } = gift;
    const date = new Date();
    const fileName = date.getTime().toString();
    let extension = imageUrl.name.split(".");
    const url = await uploadImage(
      imageUrl,
      `gifts/${fileName}.${extension[extension.length - 1]}`
    );
    let data = {
      ...doc,
      points: Number(gift.points),
      imageUrl: url,
      imageFilename: `${fileName}.${extension[extension.length - 1]}`,
    };
    await setItem("gifts", data);
    setGift({
      name: "",
      type: "Classic",
      points: "",
      active: "Active",
      imageUrl: "",
      imageFilename: "",
    });
    // const res = await getData("gifts");
    // dispatch(setGifts(res));
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
                    {t("Submit")}
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
                    {t("Upload")}
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

export default GiftDetails;
