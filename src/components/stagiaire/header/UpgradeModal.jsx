import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, Select, MenuItem, InputLabel, FormControl, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import url from '../../../app/api/url';
import GetCookie from '../../../cookies/JWT/GetCookie';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '90vh',
  overflowY: 'auto'
};

const UpgradeModal = ({ open, handleClose }) => {
  const [profession, setProfession] = useState('');
  const [ville, setVille] = useState('');
  const [propos, setPropos] = useState('');
  const [secteurId, setSecteurId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentProof, setPaymentProof] = useState(null);
  const [secteurs, setSecteurs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && secteurs.length === 0) {
      axios.get(`${url}/api/public/secteur`).then(res => {
        setSecteurs(res.data.secteurs || res.data);
      }).catch(err => console.error("Erreur chargement secteurs", err));
    }
  }, [open, secteurs.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!secteurId) {
      toast.error("Veuillez choisir un secteur d'activité.");
      return;
    }

    setLoading(true);
    const token = GetCookie('jwt');
    const formData = new FormData();
    formData.append('profession', profession);
    formData.append('ville', ville);
    formData.append('propos', propos);
    formData.append('secteur_id', secteurId);
    formData.append('payment_method', paymentMethod);
    formData.append('payment_reference', paymentReference);
    if (paymentProof) {
      formData.append('payment_proof', paymentProof);
    }

    try {
      await axios.post(`${url}/api/adherent/upgrade`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success("Votre demande a été envoyée ! Un administrateur la validera après réception du paiement.", { autoClose: 5000 });
      handleClose();
      setPaymentProof(null);
    } catch (error) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0][0];
        toast.error(firstError);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erreur lors de la demande d'abonnement.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h2" mb={1} fontWeight="bold" color="#e86928">
          Devenir adhérent (100 DH / an)
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle>Comment payer votre abonnement ?</AlertTitle>
          Pour activer votre compte et commencer à vendre vos services, un paiement de <strong>100 DH</strong> est requis. Vous pouvez payer :
          <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
            <li>Par <strong>virement bancaire</strong> (RIB: 000 000 00000000000000 00)</li>
            <li>En <strong>face à face</strong> avec l'un de nos commerciaux.</li>
          </ul>
          Une fois la demande soumise, nous validerons votre compte dès réception du paiement.
        </Alert>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="secteur-label">Secteur d'activité principal</InputLabel>
            <Select
              labelId="secteur-label"
              value={secteurId}
              label="Secteur d'activité principal"
              onChange={(e) => setSecteurId(e.target.value)}
            >
              {Array.isArray(secteurs) && secteurs.map((sec) => (
                <MenuItem key={sec.id} value={sec.id}>{sec.lib}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField fullWidth label="Votre profession (ex: Plombier, Développeur...)" value={profession} onChange={(e) => setProfession(e.target.value)} required margin="normal" />
          <TextField fullWidth label="Ville" value={ville} onChange={(e) => setVille(e.target.value)} required margin="normal" />

          <TextField
            fullWidth
            label="À propos de vous (optionnel)"
            value={propos}
            onChange={(e) => setPropos(e.target.value)}
            multiline
            rows={3}
            margin="normal"
            helperText="Décrivez vos compétences pour attirer plus de clients."
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="payment-method-label">Méthode de paiement</InputLabel>
            <Select
              labelId="payment-method-label"
              value={paymentMethod}
              label="Méthode de paiement"
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="bank_transfer">Virement bancaire</MenuItem>
              <MenuItem value="cash">Paiement en face à face</MenuItem>
              <MenuItem value="other">Autre</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Référence du paiement (optionnel)"
            value={paymentReference}
            onChange={(e) => setPaymentReference(e.target.value)}
            margin="normal"
          />

          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            {paymentProof ? paymentProof.name : 'Ajouter une preuve de paiement'}
            <input
              type="file"
              hidden
              accept="image/png,image/jpeg,application/pdf"
              onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
            />
          </Button>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.5, bgcolor: '#e86928', '&:hover': { bgcolor: '#d46025'}, fontWeight: 'bold' }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'J\'ai compris, envoyer ma demande'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UpgradeModal;
