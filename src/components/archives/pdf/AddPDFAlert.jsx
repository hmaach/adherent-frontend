import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { useDispatch } from "react-redux";
import GetCookie from "../../../cookies/JWT/GetCookie";


const AddPDFAlert = ({handleClose,open,onSubmit}) => {

  const [addedCategoryLabel, setAddedCategoryLabel] = useState('');



  const handleCategoryLibelleChange = (event) => {
    setAddedCategoryLabel(event.target.value);
  };

  const handleAddCategory = () => {
    // console.log(addedCategoryLabel);
    onSubmit(addedCategoryLabel);
  //   handleClose()
  };

  
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Ajouter Une Catégorie"}</DialogTitle>
      <DialogContent>
        <form className="wrapper">
        <TextField
        id="outlined-basic" 
        label="Nom du catégorie" 
        variant="outlined" 
        onChange={handleCategoryLibelleChange}
        value={addedCategoryLabel}
        />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleAddCategory}>Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPDFAlert;
