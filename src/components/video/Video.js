import React, { useState } from "react";
import { Grid, IconButton, Dialog } from "@mui/material";
import { styled } from "@mui/system";
import { Icon } from "@iconify/react";

const Video = ({ URL }) => {
  const [open, setOpen] = useState(false);
  return (
    <Container container>
      <video
        src={URL}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      ></video>
      <Overly container alignItems="center" justifyContent="center">
        <IconButton className="icon" onClick={() => setOpen(true)}>
          <Icon icon="bi:play-fill" />
        </IconButton>
      </Overly>
      <DialogStyles open={open}>
        <Grid
          container
          sx={{
            height: "50vh",
            aspectRatio: "1.5/1",
            background: "black",
            position: "relative",
          }}
        >
          <video
            src={URL}
            autoPlay={true}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            controls
            onEnded={() => setOpen(false)}
          ></video>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              fontSize: "2rem",
              color: "tomato",
              position: "absolute",
              left: "15px",
              top: "15px",
            }}
          >
            <Icon icon="carbon:close-filled" />
          </IconButton>
        </Grid>
      </DialogStyles>
    </Container>
  );
};

export default Video;

const Container = styled((props) => <Grid {...props} />)(({ theme }) => ({
  width: "100%",
  aspectRatio: "1/1.5",
  position: "relative",
  borderRadius: "10px",
  overflow: "hidden",
  backgroundColor: "rgba(0,0,0,0.8)",
}));

const Overly = styled((props) => <Grid {...props} />)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.8)",
  opacity: 0,
  transition: "0.3s ease-in",
  "&:hover": {
    opacity: 1,
  },
  "& .icon": {
    fontSize: "3rem",
    color: "#fff",
  },
}));

const DialogStyles = styled((props) => <Dialog {...props} />)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "10px",
  },
}));
