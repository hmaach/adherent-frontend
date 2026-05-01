import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Card, CardContent, Typography, Box, Chip, Divider, CircularProgress } from "@mui/material";
import url from "../../app/api/url";
import GetCookie from "../../cookies/JWT/GetCookie";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import NavBar from "../navBar/navbar";
import Right from "../accueil/right/right";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingBidId, setAcceptingBidId] = useState(null);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const token = GetCookie("jwt");
      const res = await axios.get(`${url}/api/marketplace/jobs?my_jobs=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data.data);
    } catch (error) {
      toast.error("Erreur lors du chargement de vos demandes.");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBid = async (bidId) => {
    if(!window.confirm("Êtes-vous sûr de vouloir accepter cette offre ? Les autres offres seront rejetées.")) return;
    
    setAcceptingBidId(bidId);
    try {
      const token = GetCookie("jwt");
      await axios.post(`${url}/api/marketplace/bids/${bidId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Offre acceptée avec succès !");
      fetchMyJobs(); // Refresh to show updated status
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de l'acceptation.");
    } finally {
      setAcceptingBidId(null);
    }
  };

  const handleCloseJob = async (jobId) => {
    if(!window.confirm("Voulez-vous vraiment fermer cette demande ?")) return;
    
    try {
      const token = GetCookie("jwt");
      await axios.post(`${url}/api/marketplace/jobs/${jobId}/close`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Demande fermée.");
      fetchMyJobs();
    } catch (error) {
      toast.error("Erreur lors de la fermeture.");
    }
  };

  const getStatusColor = (status) => {
      if(status === 'open') return 'primary';
      if(status === 'in_progress') return 'success';
      return 'default';
  };

  return (
    <div className='spinner_main'>
      <div id="container-main" style={{ padding: "20px", flex: 1 }}>
        <Typography variant="h5" fontWeight="bold" color="#e86928" mb={3}>
          Mes Demandes de Services
        </Typography>

        {loading ? (
          <LoadingSpinner />
        ) : jobs.length === 0 ? (
          <Typography textAlign="center" color="textSecondary" mt={5}>
            Vous n'avez posté aucune demande pour le moment.
          </Typography>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} sx={{ mb: 4, borderRadius: 3, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" fontWeight="bold">
                    {job.title}
                  </Typography>
                  <Chip label={job.status} color={getStatusColor(job.status)} size="small" />
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {job.description}
                </Typography>
                
                {job.status === 'open' && (
                  <Button size="small" variant="text" color="error" onClick={() => handleCloseJob(job.id)}>
                    Fermer la demande
                  </Button>
                )}

                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Offres reçues ({job.bids?.length || 0})
                </Typography>

                {job.bids && job.bids.length > 0 ? (
                  <Box display="flex" flexDirection="column" gap={2}>
                    {job.bids.map(bid => (
                      <Box key={bid.id} p={2} border={1} borderColor="#eee" borderRadius={2} bgcolor={bid.status === 'accepted' ? '#f0fdf4' : '#fafafa'}>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {bid.adherent?.user?.prenom} {bid.adherent?.user?.nom}
                          </Typography>
                          <Typography variant="subtitle2" color="#e86928" fontWeight="bold">
                            {bid.price_quote} MAD
                          </Typography>
                        </Box>
                        <Typography variant="body2" mb={1}>{bid.message}</Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" color="textSecondary">
                            Estimé: {bid.estimated_days} jours
                          </Typography>
                          
                          {job.status === 'open' && bid.status === 'pending' && (
                            <Button 
                              size="small" 
                              variant="contained" 
                              color="success" 
                              onClick={() => handleAcceptBid(bid.id)}
                              disabled={acceptingBidId === bid.id}
                            >
                              {acceptingBidId === bid.id ? <CircularProgress size={20} color="inherit" /> : 'Accepter l\'offre'}
                            </Button>
                          )}
                          
                          {bid.status === 'accepted' && (
                            <Chip label="Acceptée" color="success" size="small" />
                          )}
                          {bid.status === 'rejected' && (
                            <Chip label="Rejetée" size="small" />
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Aucune offre reçue pour le moment.
                  </Typography>
                )}

              </CardContent>
            </Card>
          ))
        )}
      </div>
      <Right />
    </div>
  );
};

export default MyJobs;
