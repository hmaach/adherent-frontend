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
import GetCookie from "../../cookies/JWT/GetCookie";


const UpdateCategoryAlert = (props) => {

  const {category, open, handleClose, onUpdate } = props;
  const [updatedCategory, setUpdatedCategory] = useState(category);



  const handleCategoryLibelleChange = (event) => {
    setUpdatedCategory({ ...updatedCategory, label: event.target.value });
  };

  const handleUpdateCategory = () => {
    onUpdate(updatedCategory);
    handleClose()
  };

  
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Modifier Votre Catégorie"}</DialogTitle>
      <DialogContent>
        <form className="wrapper">
        <TextField
        id="outlined-basic" 
        label="Nom du catégorie" 
        variant="outlined" 
        onChange={handleCategoryLibelleChange}
        value={updatedCategory.label}
        />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleUpdateCategory}>Modifier</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCategoryAlert;
