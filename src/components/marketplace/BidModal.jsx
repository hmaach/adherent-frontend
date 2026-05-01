import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import url from '../../app/api/url';
import GetCookie from '../../cookies/JWT/GetCookie';
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

const BidModal = ({ open, handleClose, job }) => {
  const [priceQuote, setPriceQuote] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!job) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = GetCookie('jwt');

    try {
      await axios.post(`${url}/api/marketplace/jobs/${job.id}/bids`, {
        price_quote: priceQuote,
        estimated_days: estimatedDays,
        message: message
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Votre offre a été soumise avec succès !');
      handleClose();
      // Reset form
      setPriceQuote(''); setEstimatedDays(''); setMessage('');
    } catch (error) {
        if(error.response?.data?.message) {
            toast.error(error.response.data.message); // Handle duplicate bid or authorization
        } else if(error.response?.data?.errors?.message) {
            toast.error(error.response.data.errors.message[0]); // Handles NoContactInfoRule errors
        } else {
            toast.error("Erreur lors de la soumission de l'offre.");
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={1} color="#e86928" fontWeight="bold">
          Faire une offre
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Pour le projet: <strong>{job.title}</strong>
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Votre Devis (MAD)" 
            type="number" 
            value={priceQuote} 
            onChange={(e) => setPriceQuote(e.target.value)} 
            required 
            margin="normal" 
          />
          <TextField 
            fullWidth 
            label="Durée Estimée (en jours)" 
            type="number" 
            value={estimatedDays} 
            onChange={(e) => setEstimatedDays(e.target.value)} 
            required 
            margin="normal" 
          />
          <TextField 
            fullWidth 
            label="Lettre de motivation / Message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
            multiline 
            rows={4} 
            margin="normal" 
            helperText="Ne mettez pas de numéro de téléphone ni email. Le client les recevra une fois votre offre acceptée." 
          />
          
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, bgcolor: '#e86928', '&:hover': { bgcolor: '#d46025'} }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Soumettre l\'offre'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default BidModal;
