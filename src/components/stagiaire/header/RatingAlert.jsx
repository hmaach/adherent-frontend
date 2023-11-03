import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Rating,
} from "@mui/material";

const RatingAlert = (props) => {
  const {
    open,
    handleClose,
    onSubmit,
    ratingValue,
    loadingRating,
    setLoadingRating,
  } = props;
  const [value, setValue] = useState(ratingValue);

  const handleCancel = () => {
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
      {loadingRating && <LinearProgress />}
      <DialogTitle>{"Votre avis"}</DialogTitle>
      <DialogContent
        sx={{
          margin: " 10px 5px",
          minWidth: "180px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Rating
          className="votre-avis-rating"
          sx={{
            fontSize: "40px",
          }}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setLoadingRating(true);
            setValue(newValue);
            onSubmit(newValue);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RatingAlert;
