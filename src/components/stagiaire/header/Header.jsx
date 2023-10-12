import React, { useState, useEffect } from "react";
import { updateCv, addPropos } from "../../../app/api/stagiaireAxios";
import GetCookie from "../../../cookies/JWT/GetCookie";
import "./header.css";
import Profile from "../assets/ayadi_oussama.png";
import Stagiaire from "../Stagiaire";
import {
  Edit as EditIcon,
  Add as AddIcon,
  PhotoCamera as PhotoCameraIcon,
} from "@mui/icons-material";
import { toast } from 'react-toastify';

import { selectCurrentUser  } from "../../../features/auth/authSlice";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

import { useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { downloadCV } from "../../../app/api/cvPdfAxios";

const StyledEditIcon = styled(EditIcon)`
  font-size: 24px;
  color: blue;
  transition: color 0.3s ease;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const StyledAddIcon = styled(AddIcon)`
  font-size: 48px;
  color: blue;
  transition: color 0.3s ease;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const StyledPhotoCameraIcon = styled(PhotoCameraIcon)`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 24px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Header = (props) => {
  const { authId } = props;

  const [editFormOpen, setEditFormOpen] = useState(false);

  const [aproposDeMoi, setAproposDeMoi] = useState(props.header.propos);
  const [age, setAge] = useState(props.header.age);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");


  const user = useSelector(selectCurrentUser);

  const [id, setId] = useState(props.header.id);
  // console.log(props.header.id);
  useEffect(() => {
    setAproposDeMoi(props.header.propos);
    setAge(props.header.age); // Update the value when the prop changes
  }, [props.header.propos, props.header.age]);
  const token = GetCookie("jwt");

  useEffect(() => {
    setAproposDeMoi(props.header.propos); // Update the value when the prop changes
  }, [props.header.propos]);

  const handleEditFormOpen = () => {
    setAproposDeMoi(props.header.propos);
    setEditFormOpen(true);
  };

  const handleEditFormClose = () => {
    setEditFormOpen(false);
  };

  const handleDownload = async (id) => {
    // try {
    //   const cvBlob = await downloadCV(id);
    // } catch (error) {
    //   console.error('Error:', error.message);
    // }
    downloadCV(id)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${props.header.nom}_${props.header.prenom}.pdf`
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };

  const handleAproposDeMoiChange = (event) => {
    setAproposDeMoi(event.target.value);
  };

  const handleSaveAproposDeMoi = async () => {
    try {
      const id = props.header.id;
      const data = { propos: aproposDeMoi };
  
      if (id) {
        // Update the profile if it already exists
        await updateCv(id, data, token);
      } else {
        // Add a new profile if it doesn't exist
        await addPropos(id, data, token);
      }
  
      setAproposDeMoi(data.propos);
      toast.success("CV mis à jour avec succès"); // Display success toast
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite"); // Display error toast
    }
    setEditFormOpen(false);
  };
  


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const header = props.header;
  return (
    <div>
      <div className="cover-bg p-3 p-lg-4 text-white">
        <div className="row">
          <div className="col-lg-8 col-md-7 text-center text-md-start">
            <h2 className="h1 mt-2" data-aos="fade-left" data-aos-delay="0">
              {header.nom} {header.prenom}
            </h2>
            <p
              data-aos="fade-left"
              data-aos-delay="100"
              className="first-letter"
            >
              {header.filiere}
            </p>
            <div
              className="d-print-none"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <Button
                variant="outlined"
                endIcon={<DownloadForOfflineIcon />}
                sx={{
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
                onClick={() => handleDownload(props.header.id)}
              >
                CV sous forme PDF
              </Button>
              {/* <Button
                  className="btn btn-light text-dark shadow-sm mt-1 me-1"
                >
                  CV sous forme PDF
                </Button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="about-section pt-4 px-3 px-lg-4 mt-1">
        <div className="row">
          <div className="col-md-6">
            <div className="propos-de-moi-section mb-4">
              <h2 className="h3 mb-3">
              À propos de moi

                {header.propos && header.id === user?.id && (
                  <IconButton
                    aria-label="Edit"
                    className="edit-icon"
                    onClick={handleEditFormOpen}
                  >
                    <StyledEditIcon />
                  </IconButton>
                )}
              </h2>
              {header.propos ? (
                <p>{header.propos}</p>
              ) : (
                <div className="add-icon-container">
                  {header.id === user?.id && (
                    <StyledAddIcon
                      className="add-icon"
                      onClick={handleEditFormOpen}
                    />
                  )}
                  <p className="add-text">Ce champ est vide</p>
                </div>
              )}
              <Dialog
                open={editFormOpen}
                onClose={handleEditFormClose}
                fullWidth
                maxWidth="sm"
              >
                <DialogTitle>Edit Profil </DialogTitle>
                <DialogContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveAproposDeMoi();
                    }}
                  >
                    <TextField
                      label="A propos de moi"
                      variant="outlined"
                      fullWidth
                      value={aproposDeMoi}
                      onChange={handleAproposDeMoiChange}
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
          </div>
          <div className="col-md-5 offset-md-1">
            <div className="row mt-2">
              <div className="col-sm-4">
                <div className="pb-1">Filière</div>
              </div>
              <div className="col-sm-8 first-letter">{header.filiere}</div>
              <div className="col-sm-4">
                <div className="pb-1">Statut</div>
              </div>
              <div className="col-sm-8">
                <div className="pb-1 text-secondary">{header.statut}</div>
              </div>
              <div className="col-sm-4">
                <div className="pb-1">Groupe</div>
              </div>
              <div className="col-sm-8">
                <div className="pb-1 text-secondary">{header.groupe}</div>
              </div>
              <div className="col-sm-4">
                <div className="pb-1">Age</div>
              </div>
              <div className="col-sm-8">
                <div className="pb-1 text-secondary">{age}</div>
              </div>
              <div className="col-sm-4">
                <div className="pb-1">Email</div>
              </div>
              <div className="col-sm-8">
                <div className="pb-1 text-secondary">{header.email}</div>
              </div>
              <div className="col-sm-4">
                <div className="pb-1">Phone</div>
              </div>
              <div className="col-sm-8">
                <div className="pb-1 text-secondary">{header.tel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Header;