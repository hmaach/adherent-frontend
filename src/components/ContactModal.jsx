import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../app/api/baseURL';
import GetCookie from '../cookies/JWT/GetCookie';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

const ContactModal = ({ open, handleClose, adherentId, adherentName }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    const token = GetCookie('jwt');
    
    try {
      await baseURL.post(`/adherent/${adherentId}/contact`, 
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Message envoyé avec succès !');
      setMessage('');
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de l\'envoi du message.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          Contacter {adherentName}
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Écrivez votre message ici..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mb: 3 }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button variant="outlined" color="inherit" onClick={handleClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button variant="contained" color="primary" onClick={handleSend} disabled={!message.trim() || isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Envoyer'}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ContactModal;
