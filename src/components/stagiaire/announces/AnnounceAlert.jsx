import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AnnounceAlert = (props) => {
  const { open, handleClose, handleAddAnnouceCallback } = props;

  const [desc, setDescription] = useState("");
  const [debut, setStartDate] = useState("");
  const [fin, setEndDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [descError, setDescError] = useState("");
  const [debutError, setDebutError] = useState("");
  const [finError, setFinError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleAddAnnouce = () => {
    setDescError("");
    setDebutError("");
    setFinError("");

    let hasError = false;

    if (!desc) {
      setDescError("Ce champ est requis");
      hasError = true;
    }

    if (!debut) {
      setDebutError("La date de début est requise");
      hasError = true;
    }

    if (!fin) {
      setFinError("La date de fin est requise");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Convert debut and fin to Date objects for comparison
    const debutDate = new Date(debut);
    const finDate = new Date(fin);

    if (debutDate >= finDate) {
      setDebutError("La date de début doit être antérieure à la date de fin");
      return;
    }

    const announceData = {
      desc,
      debut,
      fin,
      img: selectedImage,
    };

    handleAddAnnouceCallback(announceData);

    handleClose();
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Ajouter une annonce"}</DialogTitle>
      <DialogContent>
        <div
          style={{
            border: "2px dashed skyblue",
            borderRadius: "4px",
            // padding:"30px 0",
            marginBottom: "10px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input
            accept="image/*"
            id="image-input"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="image-input" className="input-image-announce" >
            <p>Cliquez ici ou faites glisser et déposez une image ici</p>
          </label>
          {selectedImage && (
            <div style={{ position: "relative" }}>
              <img src={selectedImage} alt="Selected" width="100%" />
              <span
                className="remove_img"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
                onClick={removeImage}
              >
                <DeleteIcon />
              </span>
            </div>
          )}
        </div>

        <label
          id="demo-simple-select-autowidth-label"
          // sx={{ fontSize: "15px", marginTop: "-1px" }}
          className="announce-alert-label"
        >
          Description
        </label>
        <TextField
          className="input-box"
          fullWidth
          value={desc}
          onChange={(e) => setDescription(e.target.value)}
          error={!!descError}
          helperText={descError}
        />

        {/* <Grid container spacing={2} sx={{ fontSize: "17px", marginTop: "1rem" }}> */}
        <label
          id="demo-simple-select-autowidth-label"
          className="announce-alert-label"

          // sx={{ fontSize: "15px", marginTop: "-11px", marginBottom: "10px" }}
        >
          La date de début
        </label>
        <TextField
          fullWidth
          type="datetime-local"
          value={debut}
          size="small"
          onChange={(e) => setStartDate(e.target.value)}
          error={!!debutError}
          helperText={debutError}
        />
        <label
          id="demo-simple-select-autowidth-label"
          className="announce-alert-label"
        >
          La date de fin
        </label>
        <TextField
          fullWidth
          type="datetime-local"
          value={fin}
          size="small"
          onChange={(e) => setEndDate(e.target.value)}
          error={!!finError}
          helperText={finError}
        />
        <FormControlLabel
          sx={{ fontSize: "15px", marginTop: "10px" }}
          required
          control={<Checkbox sx={{ fontSize: "15px" }} />}
          label="J'accepte que ces informations soient visibles par tout le monde"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleAddAnnouce}>Publier</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnnounceAlert;
