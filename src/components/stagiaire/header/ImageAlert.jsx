import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import url from "../../../app/api/url";

const ImageAlert = (props) => {
  const { open, handleClose, img, onDelete, onUpdate, cur_user_id, user_id } =
    props;
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setiImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleUpdate = () => {
    if (image) {
      onUpdate(image);
    }
    handleClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setiImage(file)
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFermer = () => {
    if (selectedImage) {
      setShowConfirmation(true);
    } else {
      handleClose();
    }
  };

  const handleConfirmDiscard = () => {
    setShowConfirmation(false);
    handleClose();
  };

  const handleCancelDiscard = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleFermer}
        aria-labelledby="image-alert-dialog-title"
        fullWidth
      >
        <DialogContent>
          <img
            src={
              selectedImage
                ? selectedImage
                : img
                ? url + "/storage/" + img
                : "no-img.jpg"
            }
            style={{ width: "100%" }}
            alt="image"
          />
          <input
            type="file"
            id="modifier"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </DialogContent>
        {cur_user_id === user_id && (
          <DialogActions>
            {selectedImage ? (
              <Button onClick={handleUpdate}>Enregistrer</Button>
            ) : img ? (
              <>
                <Button onClick={handleDelete}>Supprimer</Button>
                <label htmlFor="modifier">
                  <Button component="span">Modifier</Button>
                </label>
              </>
            ) : (
              <label htmlFor="modifier">
                <Button component="span">Ajouter</Button>
              </label>
            )}
            <Button onClick={handleFermer}>Fermer</Button>
          </DialogActions>
        )}
      </Dialog>
      <Dialog open={showConfirmation} onClose={handleCancelDiscard}>
        <DialogTitle id="image-alert-dialog-title">Confirmer</DialogTitle>
        <DialogContent>
          Voulez-vous vraiment abandonner les modifications ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDiscard}>Annuler</Button>
          <Button onClick={handleConfirmDiscard}>Confirmer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImageAlert;
