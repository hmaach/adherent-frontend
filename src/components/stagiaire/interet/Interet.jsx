import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { styled } from '@mui/system';
import Interets from './Interets';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { addInteret } from '../../../app/api/stagiaireAxios';
import GetCookie from '../../../cookies/JWT/GetCookie';
import { selectCurrentUser  } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';



const StyledButton = styled(Button)`
  margin-top: 1rem;
`;

const Interet = ({ interets, userId }) => {
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [newInteret, setNewInteret] = useState('');
  const token = GetCookie('jwt');
  const user = useSelector(selectCurrentUser);

  const handleNewInteretChange = (event) => {
    setNewInteret(event.target.value);
  };

  const handleAddInteret = async () => {
    try {
      const id = userId;
      const request = { libelle: newInteret };

      const response = await addInteret(id, request, token);
      console.log('Interet added successfully:', response);
      toast.success("Interet ajoutée avec succès");

      setNewInteret('');
    } catch (error) {
      console.log('Error adding interet:', error);
    }
  };

  const handleNewInteretFormOpen = () => {
    setEditFormOpen(true);
  };

  const handleNewInteretFormClose = () => {
    setEditFormOpen(false);
  };

  return (
    <div className="skills-section px-3 px-lg-4">
      <h2 className="h3 mb-3">Centres d'intérêt</h2>
      <div className="row">
      {interets && interets.length > 0 ? (
        <div className="timeline">
          {interets.map((interet) => (
            <Interets interet={interet} key={interet.id} />
          ))}
        </div>
        ) : (
          <p className="add-text">Ce champ est vide</p>
        )}
      </div>
      <div className="add-interet-form">
      {userId=== user?.id && (
        <StyledButton variant="contained" startIcon={<AddCircleIcon />} onClick={handleNewInteretFormOpen}>
          Ajouter un intérêt
        </StyledButton> )}
        <Dialog open={editFormOpen} onClose={handleNewInteretFormClose} fullWidth maxWidth="sm">
          <DialogTitle>Ajouter un intérêt</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="Intérêt"
                variant="outlined"
                fullWidth
                value={newInteret}
                onChange={handleNewInteretChange}
                sx={{ mt: 2 }}
                required
              />
              <DialogActions>
                <Button onClick={handleNewInteretFormClose}>Annuler</Button>
                <Button onClick={() => { handleAddInteret(); handleNewInteretFormClose(); }} color="primary">
                  Ajouter
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Interet;
