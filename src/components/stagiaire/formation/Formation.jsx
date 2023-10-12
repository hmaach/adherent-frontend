import React, { useState } from "react";
import "./formations.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import GetCookie from "../../../cookies/JWT/GetCookie";
import { updateFormation } from "../../../app/api/stagiaireAxios";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const StyledEditButton = styled(Button)`
  font-size: 16px;
  color: blue;
  transition: color 0.3s ease;
  text-transform: none;
  &:hover {
    color: red;
  }
`;

const Formation = ({ formation }) => {
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [titre, setTitre] = useState(formation?.titre);
  const [institut, setInstitut] = useState(formation?.institut);
  const [dateFin, setDateFin] = useState(formation?.dateFin);
  const token = GetCookie("jwt");
  const user = useSelector(selectCurrentUser);

  const handleEditFormOpen = () => {
    setTitre(formation?.titre);
    setInstitut(formation?.institut);
    setDateFin(formation?.dateFin);
    setEditFormOpen(true);
  };

  const handleEditFormClose = () => {
    setEditFormOpen(false);
  };

  const handleTitreChange = (event) => {
    setTitre(event.target.value);
  };

  const handleInstitutChange = (event) => {
    setInstitut(event.target.value);
  };

  const handleDateFinChange = (event) => {
    setDateFin(event.target.value);
  };

  const handleSaveFormation = async () => {
    try {
      const updatedFormation = {
        titre: titre,
        institut: institut,
        dateFin: dateFin,
      };

      const response = await updateFormation(
        formation.user_id,
        formation.id,
        updatedFormation,
        token
      );
      console.log("Formation updated successfully", response);
      toast.success("Formation mis à jour avec succès");
    } catch (error) {
      console.log(error);
    }
    setEditFormOpen(false);
  };

  return (
    <div className="timeline-card timeline-card-success card shadow-sm">
      <div className="card-body">
        <div className="formation-header">
          <div className="h5 formation-title first-letter">
            {titre}
            {formation.user_id === user?.id && (
              <StyledEditButton variant="text" onClick={handleEditFormOpen}>
                Modifier
              </StyledEditButton>
            )}
          </div>
          <div className="formation-institut first-letter">{institut}</div>
        </div>
        <div className="text-muted text-small mb-2">
          {new Date(dateFin) > new Date()
            ? "en cours"
            : `en ${new Date(dateFin).getFullYear()}`}
        </div>
      </div>
      <Dialog
        open={editFormOpen}
        onClose={handleEditFormClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Modifier Formation</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveFormation();
            }}
          >
            <TextField
              label="Titre"
              variant="outlined"
              fullWidth
              value={titre}
              onChange={handleTitreChange}
              sx={{ mt: 2 }}
              required
            />
            <TextField
              label="Institut"
              variant="outlined"
              fullWidth
              value={institut}
              onChange={handleInstitutChange}
              sx={{ mt: 2 }}
              required
            />
            <TextField
              label="Date de fin"
              variant="outlined"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={dateFin}
              onChange={handleDateFinChange}
              sx={{ mt: 2 }}
              required
            />
            <DialogActions>
              <Button onClick={handleEditFormClose}>Cancel</Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Formation;
