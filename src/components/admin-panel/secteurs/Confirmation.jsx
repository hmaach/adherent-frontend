import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Confirmation = ({ open, handleCancel,handleDeleteConfirmation }) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleDeleteConfirmation(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Êtes-vous sûr de vouloir supprimer ce secteur ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            borderRadius: "20px",
            borderColor:"#e86928",
            color: "#e86928",
            bgcolor: "white",
          }}
          variant="outlined"
          onClick={() => handleCancel(false)}
        >
          Annuler
        </Button>
        <Button
          sx={{
            borderRadius: "20px",
            color: "white",
            bgcolor: "#e86928",
            "&:hover": {
              bgcolor: "#d46025",
            },
          }}
          variant="contained"
          endIcon={<DeleteIcon />}
          onClick={() => handleDeleteConfirmation(true)}
          autoFocus
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
