import React, { useState } from "react";
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Page from "../components/Page";
import { FormWrapper } from "../components/_dashboard/user";
import { InputField } from "../components/_dashboard/user";
import axios from "axios";
import { useSelector } from "react-redux";
import { db } from "../database/db";
import { setDoc, collection, doc } from "firebase/firestore";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MassMail = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.adminData.data);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const HandleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleOnClick = async (e) => {
    setLoading(true);
    const date = new Date().toUTCString();
    e.preventDefault();
    const notification = {
      notification: message,
      userName: "My Fans",
      sentAt: date,
      uid: admin.uid,
    };
    await setDoc(doc(collection(db, "Notifications")), notification);
    try {
      axios
        .post(
          "https://fcm.googleapis.com/fcm/send",
          {
            notification: {
              body: message,
              title: "My Fans",
            },
            priority: "high",
            data: {
              // ...data,
              click_action: "FLUTTER_NOTIFICATION_CLICK",
              sound: "default",
            },
            to: `/topics/community`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `key=${process.env.REACT_APP_FCM_KEY}`,
            },
          }
        )
        .then((res) => console.log(res));
      setLoading(false);
      navigate(-1);
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("something went wrong");
      navigate(-1);
    }
  };
  return (
    <Page title="User | Mass Mail">
      <Container>
        <Stack direction="column">
          <Typography
            variant="h3"
            sx={{ color: "primary.TableTitleBarTitle", mb: 2 }}
          >
            {t("Mass_Message")}
          </Typography>
          <FormWrapper title={t("Send_message_to_My_Fans_community")}>
            <form onSubmit={handleOnClick} style={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                sx={{
                  pt: {
                    sm: 2,
                    md: 3,
                  },
                  pl: {
                    sm: 2,
                    md: 3.5,
                  },
                }}
              >
                <Grid item container>
                  <Grid item md={6} sm={8} xs={12}>
                    <InputField
                      label={t("Mass_Message")}
                      placeholder={t("Send_message_to_community...")}
                      multiline
                      minRows={6}
                      maxRows={6}
                      value={message}
                      onChange={HandleChange}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid item sx={{ mt: loading ? 2 : 0 }}>
                  {loading ? (
                    <SyncLoader color={theme.palette.primary.main} />
                  ) : (
                    <>
                      <Button
                        sx={{ mt: 2, background: theme.palette.primary.dark }}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        {t("Send")}
                      </Button>
                      <Button
                        sx={{ mt: 2, ml: 1 }}
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(-1)}
                      >
                        {t("Back")}
                      </Button>
                    </>
                  )}
                </Grid>
              </Grid>
            </form>
          </FormWrapper>
        </Stack>
      </Container>
    </Page>
  );
};

export default MassMail;
