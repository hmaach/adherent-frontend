import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  InputLabel,
  TextareaAutosize,
  TextField,
} from "@mui/material";

const ProposAlert = (props) => {
  const { open, handleClose, data, onUpdate } = props;

  const [updatedData, setUpdatedData] = useState(data);
  const [hasChanges, setHasChanges] = useState(false);
  const [cities, setCities] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
    setHasChanges(true);
  };

  const fetchCitiesFromAPI = async () => {
    try {
      const response = await fetch(
        "https://parseapi.back4app.com/classes/List_of_Morroco_cities?keys=asciiname",
        {
          headers: {
            "X-Parse-Application-Id":
              "2ZOfB60kP39M5kE4WynRqyP7lNGKZ9MB8fVWqAM9",
            "X-Parse-Master-Key": "Qq7lEIoEEzRris3IM6POE5ewvYuzACVyA6VKtiVb",
          },
        }
      );
      const data = await response.json();
      const cityNames = data.results
        .map((city) => city.asciiname)
        .filter(Boolean);
      console.log(cityNames);
      setCities(cityNames);
      // return data;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };
  useEffect(() => {
    fetchCitiesFromAPI();
  }, []);

  const handleUpdate = () => {
    onUpdate(updatedData);
    handleClose();
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmDiscard = window.confirm(
        "Des changements non enregistrés existent. Voulez-vous vraiment les ignorer ?"
      );
      if (!confirmDiscard) {
        return;
      }
    }

    handleClose();
    setHasChanges(false);
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
    >
      <DialogTitle>{"Modifier vos informations"}</DialogTitle>
      <DialogContent>
        {/* <form className="wrapper"> */}
          {/* Capture user inputs */}
          <InputLabel htmlFor="propos" sx={{ fontSize: "15px" }}>
            À propos
          </InputLabel>
          <TextareaAutosize
            id="propos"
            name="propos"
            className="textearea-propos"
            // minRows={3}
            style={{
              width: "100%",
              borderColor: "blue",
              borderRadius: "10px",
              padding: "10px",
            }}
            value={updatedData.propos || ""}
            onChange={handleInputChange}
          />
          <TextField
            className="apropos-inputs"
            name="secteur"
            label="Secteur d'activité"
            sx={{ fontSize: "15px", marginTop: "15px" }}
            fullWidth
            variant="outlined"
            value={updatedData.secteur || ""}
            onChange={handleInputChange}
          />
          <TextField
            className="apropos-inputs"
            name="profession"
            sx={{ fontSize: "15px", marginTop: "15px" }}
            fullWidth
            label="Profession"
            variant="outlined"
            value={updatedData.profession || ""}
            onChange={handleInputChange}
          />
          <TextField
            className="apropos-inputs"
            name="ville"
            sx={{ fontSize: "15px", marginTop: "15px" }}
            fullWidth
            label="Ville"
            variant="outlined"
            value={updatedData.ville || ""}
            onChange={handleInputChange}
          />
          {/* <Autocomplete
            id="ville"
            options={cities || []} // Ensure cities is an array or provide an empty array as a fallback
            getOptionLabel={(option) => option.asciiname || 'Default Label'} 
            value={updatedData.ville || null}
            onChange={(event, newValue) => {
              setUpdatedData({ ...updatedData, ville: newValue });
              setHasChanges(true);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ville"
                variant="outlined"
                fullWidth
              />
            )}
          /> */}
          <FormControlLabel
          className="agree-terms"
            sx={{ fontSize: "10px", marginTop: "10px" }}
            required
            control={<Checkbox required sx={{ fontSize: "15px" }} />}
            label="J'accepte que ces informations soient visibles par tout le monde"
          />
        {/* </form> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Annuler</Button>
        <Button onClick={handleUpdate} disabled={!hasChanges}>
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProposAlert;
