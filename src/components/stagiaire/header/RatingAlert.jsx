import React, { useState } from "react";
import { Backdrop, CircularProgress, Dialog, DialogContent, DialogTitle, Rating } from "@mui/material";

const RatingAlert = (props) => {
  const { open, handleClose, onSubmit, ratingValue } = props;
  const [value, setValue] = useState(ratingValue);
  const [openD, setOpenD] = useState(false);

  const handleCloseD = () => {
    setOpenD(false);
  }; 

  const handleOpen = () => {
    setOpenD(true);
  };

  const handleCancel = () => {
    setOpenD(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
      sx={{ minWidth: "70%" }}
    >
      <DialogTitle>{"Votre avis"}</DialogTitle>
      <DialogContent sx={{ margin: " 10px 70px" }}>
        <Rating
          sx={{ fontSize: "70px" }}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            handleOpen()
            setValue(newValue);
            onSubmit(newValue);
            handleClose();
            handleCloseD()
          }}
        />
      </DialogContent>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openD}
        onClick={handleCloseD}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

export default RatingAlert;
