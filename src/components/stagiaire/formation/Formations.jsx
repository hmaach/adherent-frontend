import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormHelperText } from '@mui/material';
import { styled } from '@mui/system';
import Formation from './Formation';
import { addFormation } from '../../../app/api/stagiaireAxios';
import GetCookie from '../../../cookies/JWT/GetCookie';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { selectCurrentUser  } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';


const StyledButton = styled(Button)`
  margin-top: 1rem;
`;

const Formations = ({ formations, userId }) => {
  const [editFormOpen, setEditFormOpen] = useState(false);
  const token = GetCookie('jwt');
  const user = useSelector(selectCurrentUser);
  const [newFormation, setNewFormation] = useState({
    titre: '',
    institut: '',
    dateFin: ''
  });
  const [formErrors, setFormErrors] = useState({
    titre: false,
    institut: false,
    dateFin: false
  });

  const handleNewFormationChange = (event) => {
    const { name, value } = event.target;
    setNewFormation((prevFormation) => ({
      ...prevFormation,
      [name]: value
    }));
  };

  const handleAddFormation = async () => {
    try {
      const { titre, institut, dateFin } = newFormation;
  
      // Perform form validation
      if (!titre || !institut || !dateFin) {
        // Update formErrors state to indicate the fields with errors
        setFormErrors({
          titre: !titre,
          institut: !institut,
          dateFin: !dateFin
        });
        return; // Stop the submission if there are validation errors
      }
  
      const response = await addFormation(userId, {
        titre,
        institut,
        dateFin
      }, token);
  
      console.log('Formation added successfully:', response);
      toast.success("Formation ajoutée avec succès");
  
      setNewFormation({
        titre: '',
        institut: '',
        dateFin: ''
      });
  
      // If the response indicates successful submission, then close the form
      if (response.success) {
        setEditFormOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleNewFormationFormOpen = () => {
    if (!editFormOpen) {
      setNewFormation({
        titre: '',
        institut: '',
        dateFin: ''
      });
      setFormErrors({
        titre: false,
        institut: false,
        dateFin: false
      });
      setEditFormOpen(true);
    }
  };

  const handleNewFormationFormClose = () => {
    setEditFormOpen(false);
  };

  return (
    <div className="formation-section px-3 px-lg-4">
      <h2 className="h3 mb-4">Formations</h2>
      {formations && formations.length > 0 ? (
        <div className="timeline">
          {formations.map((formation) => (
            <Formation formation={formation} key={formation.id} />
          ))}
        </div>
      ) : (
        <p className="add-text">Ce champ est vide</p>
      )}

      <div className="add-formation-form">
      {userId=== user?.id && (
        <StyledButton variant="contained" startIcon={<AddCircleIcon />} onClick={handleNewFormationFormOpen}>
          Ajouter une formation
        </StyledButton>  )}
      </div>

      <Dialog open={editFormOpen} onClose={handleNewFormationFormClose} fullWidth maxWidth="sm">
        <DialogTitle>Ajouter une formation</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Titre"
              variant="outlined"
              fullWidth
              name="titre"
              value={newFormation.titre}
              onChange={handleNewFormationChange}
              sx={{ mt: 2 }}
              error={formErrors.titre} // Set error state based on formErrors
            />
            {formErrors.titre && (
              <FormHelperText error>Titre is required</FormHelperText>
            )}

            <TextField
              label="Institut"
              variant="outlined"
              fullWidth
              name="institut"
              value={newFormation.institut}
              onChange={handleNewFormationChange}
              sx={{ mt: 2 }}
              error={formErrors.institut} // Set error state based on formErrors
            />
            {formErrors.institut && (
              <FormHelperText error>Institut is required</FormHelperText>
            )}

            <TextField
              label="Date de fin"
              variant="outlined"
              fullWidth
              name="dateFin"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={newFormation.dateFin}
              onChange={handleNewFormationChange}
              sx={{ mt: 2 }}
              error={formErrors.dateFin} // Set error state based on formErrors
            />
            {formErrors.dateFin && (
              <FormHelperText error>Date de fin is required</FormHelperText>
            )}

            <DialogActions>
              <Button onClick={handleNewFormationFormClose}>Annuler</Button>
              <Button
                onClick={() => {
                  handleAddFormation();
                  handleNewFormationFormClose();
                }}
                color="primary"
              >
                Ajouter
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Formations;
