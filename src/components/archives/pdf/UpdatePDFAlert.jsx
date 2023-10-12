import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";

const UpdatePDFAlert = (props) => {

  const { pdf, open, handleClose, onUpdate } = props;
  const [updatedPDF, setUpdatedPDF] = useState(pdf);

  const handlePDFLibelleChange = (event) => {
    setUpdatedPDF({ ...updatedPDF, libelle: event.target.value });
  };

  const handleUpdatePDF = () => {
    onUpdate(updatedPDF);
    handleClose()
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Modifier le nom du PDF"}</DialogTitle>
      <DialogContent>
        <form className="wrapper">
          <TextField
            id="outlined-basic"
            label="Nom du PDF document"
            variant="outlined"
            onChange={handlePDFLibelleChange}
            value={updatedPDF.libelle}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleUpdatePDF}>Modifier</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePDFAlert;
