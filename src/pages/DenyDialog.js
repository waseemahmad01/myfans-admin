import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useState } from "react";

export default function DenyDialog({ rejectRequest, uid }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [notification, setNotification] = useState("");
  // console.log(notification);
  return (
    <>
      <Button
        variant="contained"
        sx={{ bgcolor: "error.main" }}
        onClick={handleClickOpen}
      >
        Deny
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Why Reject</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter Your reason"
            type="text"
            fullWidth
            multiline
            value={notification}
            minRows={4}
            sx={{ mt: 1 }}
            onChange={(e) => setNotification(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => rejectRequest(uid, notification)}>
            Submit
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
