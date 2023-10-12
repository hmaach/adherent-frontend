import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import GetCookie from "../../cookies/JWT/GetCookie";
import { format } from "date-fns";

const AddEventAlert = (props) => {
  const { open, handleClose, selected, onSubmit, filieres } = props;
  const selectedStart = format(new Date(selected.start), "yyyy-MM-dd'T'HH:mm");
  const selectedEnd = format(new Date(selected.end), "yyyy-MM-dd'T'HH:mm");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = GetCookie("jwt");
  const [startDate, setStartDate] = useState(selectedStart);
  const [endDate, setEndDate] = useState(selectedEnd);
  const [audience, setAudience] = useState("");
  const [filiere_id, setFiliere] = useState("");
  const [color, setColor] = useState("blue");

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleChangeAudience = (event) => {
    setAudience(event.target.value);
  };

  const handleChangeFiliere = (event) => {
    setFiliere(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      titre: title,
      description: description,
      audience: audience,
      audience_id: filiere_id,
      dateDeb: startDate,
      dateFin: endDate,
      color: color,
    };
    onSubmit(newEvent);
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Ajouter une événement"}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
              <div
                className="filtrage_audience"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "0.9rem",
                }}
              >
                <FormControl sx={{ m: 0, minWidth: 130 }}>
                  <InputLabel
                    id="demo-simple-select-autowidth-label "
                    sx={{ fontSize: "17px", marginTop: "-11px" }}
                  >
                    Couleur
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={color}
                    onChange={handleChangeColor}
                    autoWidth
                    label="Couleur"
                    sx={{ height: "34px", borderRadius: "20px" }}
                  >
                <MenuItem value="blue" selected sx={{ color: "blue" }}>
                  Bleu
                </MenuItem>
                <MenuItem value="green" sx={{ color: "green" }}>
                  Vert
                </MenuItem>
                <MenuItem value="yellow" sx={{ color: "yellow" }}>
                  Jaune
                </MenuItem>
                <MenuItem value="purple" sx={{ color: "purple" }}>
                  Violet
                </MenuItem>
                <MenuItem value="orange" sx={{ color: "orange" }}>
                  Orange
                </MenuItem>
                <MenuItem value="gray" sx={{ color: "gray" }}>
                  Gris
                </MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 0, minWidth: 130 }}>
                  <InputLabel
                    id="demo-simple-select-autowidth-label "
                    sx={{ fontSize: "17px", marginTop: "-11px" }}
                  >
                    Audience
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={audience}
                    onChange={handleChangeAudience}
                    autoWidth
                    required
                    label="Audience"
                    sx={{ height: "34px", borderRadius: "20px" }}
                  >
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="etablissement">Etablissement</MenuItem>
                    <MenuItem value="filiere">Filière</MenuItem>
                    <MenuItem value="formateurs">Formateurs</MenuItem>
                  </Select>
                </FormControl>
                {audience === "groupe" || audience === "filiere" ? (
                  <FormControl sx={{ m: 0, minWidth: 100 }}>
                    <InputLabel
                      id="demo-simple-select-autowidth-label "
                      sx={{ fontSize: "17px", marginTop: "-11px" }}
                    >
                      Filière
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={filiere_id}
                      onChange={handleChangeFiliere}
                      autoWidth
                      required
                      label="Filière"
                      sx={{ height: "34px", borderRadius: "20px" }}
                    >
                      {filieres &&
                        filieres.map((filiere) => {
                          return (
                            <MenuItem key={filiere.id} value={filiere.id}>
                              {filiere.libelle}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                ) : null}
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Titre"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    required
                    label="La date de début"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    type="datetime-local"
                    label="La date de fin"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit">Ajouter</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEventAlert;
