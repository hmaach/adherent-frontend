import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import url from '../app/api/url';
import GetCookie from '../cookies/JWT/GetCookie';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const JobModal = ({ open, handleClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [city, setCity] = useState('');
  const [secteurId, setSecteurId] = useState('');
  const [secteurs, setSecteurs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && secteurs.length === 0) {
        axios.get(`${url}/api/public/secteur`).then(res => {
            setSecteurs(res.data.secteurs || res.data);
        }).catch(err => console.error("Erreur chargement secteurs", err));
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!secteurId) {
        toast.error("Veuillez choisir un secteur d'activité.");
        return;
    }
    setLoading(true);
    const token = GetCookie('jwt');

    try {
      await axios.post(`${url}/api/marketplace/jobs`, {
        title,
        description,
        budget_min: budgetMin,
        city,
        secteur_id: secteurId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Votre demande a été publiée avec succès !');
      handleClose();
      // Reset form
      setTitle(''); setDescription(''); setBudgetMin(''); setCity(''); setSecteurId('');
    } catch (error) {
        if (error.response?.data?.errors) {
            const errors = error.response.data.errors;
            const firstError = Object.values(errors)[0][0];
            toast.error(firstError);
        } else if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Erreur lors de la publication.");
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          Publier une Demande de Service
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Titre (ex: Besoin d'un électricien)" value={title} onChange={(e) => setTitle(e.target.value)} required margin="normal" />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="secteur-label">Secteur d'activité</InputLabel>
            <Select
              labelId="secteur-label"
              value={secteurId}
              label="Secteur d'activité"
              onChange={(e) => setSecteurId(e.target.value)}
            >
              {Array.isArray(secteurs) && secteurs.map((sec) => (
                <MenuItem key={sec.id} value={sec.id}>{sec.lib}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField fullWidth label="Description détaillée" value={description} onChange={(e) => setDescription(e.target.value)} required multiline rows={4} margin="normal" helperText="Ne mettez pas de numéro de téléphone ni email." />
          <TextField fullWidth label="Ville" value={city} onChange={(e) => setCity(e.target.value)} required margin="normal" />
          <TextField fullWidth label="Budget Estimé (MAD)" type="number" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} margin="normal" />
          
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, bgcolor: '#e86928', '&:hover': { bgcolor: '#d46025'} }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Publier'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default JobModal;
