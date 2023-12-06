import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import url from "../../../app/api/url";
import { toast } from "react-toastify";

const ProposAlert = (props) => {
  const { open, handleClose, data, onUpdate ,loadingPropos,setLoadingPropos} = props;

  const [updatedData, setUpdatedData] = useState(data);
  const [hasChanges, setHasChanges] = useState(false);
  const [cities, setCities] = useState([]);
  const [secteur, setSecteur] = useState([]);
  const [selectedVille, setSelectedVille] = useState(updatedData.ville || "");
  const [acceptVisible, setAcceptVisible] = useState(false);

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
      // console.log(cityNames);
      setCities(cityNames);
      // return data;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };

  const fetchSecteurs = async () => {
    try {
      const response = await fetch(url + "/api/public/secteur");
      const data = await response.json();
      const secteurs = data;
      // console.log(secteurs);
      setSecteur(secteurs);
      // return data;
    } catch (error) {
      console.error("Error fetching secteurs:", error);
      return [];
    }
  };

  const handleAcceptChange = (event) => {
    setAcceptVisible(event.target.checked);
  };

  const handleUpdate = () => {
    if (!acceptVisible) {
      toast.error(
        "Veuillez accepter que vos informations seront visibles par tout le monde."
      );
      return;
    }
    setLoadingPropos(true)
    onUpdate(updatedData);
    // handleClose();
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

  useEffect(() => {
    fetchCitiesFromAPI();
    fetchSecteurs();
  }, []);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
    >
      {loadingPropos && <LinearProgress />}
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

        <FormControl
          required
          fullWidth
          sx={{ marginTop: "15px", minWidth: 120 }}
        >
          <InputLabel
            id="demo-select-small-label"
            sx={{ backgroundColor: "white", padding: "1px 5px" }}
          >
            Secteur d'activité
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={updatedData.secteur ? updatedData.secteur.id : ""}
            onChange={(event) => {
              const { value } = event.target;
              const selectedSecteur = secteur.find((item) => item.id === value);
              setUpdatedData({
                ...updatedData,
                secteur: selectedSecteur,
                secteur_id: selectedSecteur.id,
              });
              setHasChanges(true);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {secteur?.map((item) => (
              <MenuItem key={item.id} value={item.id} className="first-letter">
                {item.lib}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <FormControl
          required
          fullWidth
          sx={{ marginTop: "15px", minWidth: 120 }}
        >
          <InputLabel id="demo-select-small-label">Ville</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={selectedVille}
            label="Ville"
            onChange={(event) => {
              const { value } = event.target;
              setUpdatedData({ ...updatedData, ville: value });
              setHasChanges(true);
              setSelectedVille(value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cities?.map((item, index) => (
              <MenuItem key={index} value={item} className="first-letter">
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          className="agree-terms"
          sx={{ fontSize: "10px", marginTop: "10px" }}
          control={
            <Checkbox
              required
              sx={{ fontSize: "15px" }}
              checked={acceptVisible}
              onChange={handleAcceptChange}
            />
          }
          label="J'accepte que ces informations soient visibles par tout le monde"
        />
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
