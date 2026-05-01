import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Card, CardContent, Typography, Box, Chip } from "@mui/material";
import url from "../../app/api/url";
import GetCookie from "../../cookies/JWT/GetCookie";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import JobModal from "../JobModal";
import NavBar from "../navBar/navbar";
import Right from "../accueil/right/right";
import BidModal from "./BidModal";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

const Marketplace = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openJobModal, setOpenJobModal] = useState(false);
  const [openBidModal, setOpenBidModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  const currentUser = useSelector(selectCurrentUser) || {};

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = GetCookie("jwt");
      const res = await axios.get(`${url}/api/marketplace/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data.data);
    } catch (error) {
      toast.error("Erreur lors du chargement des demandes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='spinner_main'>
      <div id="container-main" style={{ padding: "20px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold" color="#e86928">
            Demandes de Services
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenJobModal(true)}
            sx={{
              borderRadius: "20px",
              bgcolor: "#e86928",
              "&:hover": { bgcolor: "#d46025" },
            }}
          >
            + Publier
          </Button>
        </Box>

        {loading ? (
          <LoadingSpinner />
        ) : jobs.length === 0 ? (
          <Typography textAlign="center" color="textSecondary" mt={5}>
            Aucune demande trouvée.
          </Typography>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} sx={{ mb: 2, borderRadius: 3, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {job.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {job.description}
                </Typography>
                
                <Box display="flex" gap={1} mb={2}>
                  <Chip label={`Ville: ${job.city}`} size="small" variant="outlined" />
                  {job.budget_min && (
                    <Chip label={`Budget: ${job.budget_min} MAD`} size="small" color="success" variant="outlined" />
                  )}
                  <Chip label={job.secteur?.lib || 'Général'} size="small" color="primary" variant="outlined" />
                </Box>
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="textSecondary">
                    Posté par {job.client?.prenom} {job.client?.nom}
                  </Typography>
                  {job.client_id !== currentUser.id && currentUser.role?.toLowerCase() === 'adherent' && (
                    <Button 
                      size="small" 
                      variant="outlined" 
                      onClick={() => { setSelectedJob(job); setOpenBidModal(true); }}
                      sx={{ borderRadius: "20px", borderColor: "#e86928", color: "#e86928", "&:hover": { bgcolor: "#fff3ec", borderColor: "#d46025" } }}
                    >
                      Faire une offre
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))
        )}

        <JobModal open={openJobModal} handleClose={() => { setOpenJobModal(false); fetchJobs(); }} />
        <BidModal open={openBidModal} handleClose={() => setOpenBidModal(false)} job={selectedJob} />
      </div>
      <Right />
    </div>
  );
};

export default Marketplace;
