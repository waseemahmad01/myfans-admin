import * as React from "react";
// import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import { Button } from "@mui/material";
// import { useState } from "react";

export default function DenyDialog({ faceIdImg }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(notification);
  return (
    <>
      <img
        src={faceIdImg}
        style={{ height: "80px", marginInline: "auto", cursor: "pointer" }}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ p: 0, height: "70vh", aspechtRatio: "1/1.5" }}>
          <img
            src={faceIdImg}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
