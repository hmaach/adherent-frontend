import React, { useState } from "react";
import GetCookie from "../../cookies/JWT/GetCookie";
import { showEvent } from "../../app/api/eventAxios";
import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import ScheduleIcon from "@mui/icons-material/Schedule";
import "./calendarComponent.css";
import EditIcon from "@mui/icons-material/Edit";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import { useSelector } from "react-redux";
import { selectFiliereSlice } from "../../features/filiere/filiereSlice";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import CloseIcon from "@mui/icons-material/Close";

const EventDetails = (props) => {
  const { eventId } = props;
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const token = GetCookie("jwt");
  const filieres = useSelector(selectFiliereSlice);

  useEffect(() => {
    showEvent(eventId, token)
      .then((data) => {
        setEvent(data.evenement);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const isEventNotStarted =
    event.dateDeb && new Date() < new Date(event.dateDeb);

  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleCancelEditing = () => {
    setIsEditMode(false);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  const handleChangeAudience = (event) => {
    setEvent({ ...event, audience: event.target.value });
  };

  const handleChangeFiliere = (event) => {
    setEvent({ ...event, filiere_id: event.target.value });
  };

  const formatDateTime = (dateTime) => {
    const options = { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    const formattedDateTime = new Date(dateTime).toLocaleDateString("fr-FR", options);
    return formattedDateTime;
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          right: "9px",
          top: "57px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {isEventNotStarted && (
            <>
              {!isEditMode ? (
                <Tooltip title="Modifier l'événement" arrow>
                  <IconButton
                    aria-label="edit"
                    size="large"
                    sx={{ mr: 1 }}
                    onClick={handleEditClick}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <Tooltip title="Annuler les modifications" arrow>
                    <IconButton
                      aria-label="cancel"
                      size="large"
                      color="error"
                      sx={{ mr: 1 }}
                      onClick={handleCancelEditing}
                    >
                      <CloseIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Enregistrer les modifications" arrow>
                    <IconButton
                      aria-label="save"
                      size="large"
                      color="success"
                      sx={{ mr: 1 }}
                      onClick={handleSaveClick}
                    >
                      <PlaylistAddCheckIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              {!isEditMode &&
                (event.color !== "red" ? (
                  <Tooltip title="Annuler l'événement" arrow>
                    <IconButton
                      aria-label="Cancel"
                      size="large"
                      color="secondary"
                      sx={{ mr: 1 }}
                    >
                      <EventBusyIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Restaurer l'événement" arrow>
                    <IconButton
                      aria-label="Restore"
                      size="large"
                      color="secondary"
                      sx={{ mr: 1 }}
                    >
                      <RestoreIcon />
                    </IconButton>
                  </Tooltip>
                ))}
            </>
          )}
          {!isEditMode && (
            <Tooltip title="Supprimer l'événement" arrow>
              <IconButton aria-label="delete" size="large" color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      <Box sx={{ my: 4, mt: 7 }}>
        {isLoading ? (
          <Skeleton animation="wave" />
        ) : isEditMode ? (
          <TextField
            variant="outlined"
            focused
            sx={{ mb: 2, width: "100%" }}
            value={event.titre}
            label="Titre"
            onChange={(e) => setEvent({ ...event, titre: e.target.value })}
          />
        ) : (
          <>
            <Typography variant="h6">
              <EventIcon className="event-icons" /> Titre
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, ml: 3 }}>{event.titre}</Typography>
          </>
        )}

        {isLoading ? (
          <Skeleton animation="wave" />
        ) : isEditMode ? (
          <TextField
            variant="outlined"
            sx={{ mb: 3, width: "100%" }}
            focused
            label="Description"
            value={event.description}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
          />
        ) : (
          <>
            <Typography variant="h6">
              <DescriptionIcon className="event-icons" /> Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, ml: 3 }}>{event.description}</Typography>
          </>
        )}

        {isLoading ? (
          <Skeleton animation="wave" />
        ) : isEditMode ? (
          <>
            <FormControl sx={{ m: 0, minWidth: 130 }}>
              <InputLabel
                id="demo-simple-select-autowidth-label "
                sx={{ fontSize: "17px", marginTop: "-11px" }}
              >
                Couleur
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={event.color}
                onChange={(e) => setEvent({ ...event, color: e.target.value })}
                autoWidth
                focused
                label="Couleur"
                sx={{ height: "34px", borderRadius: "20px", marginTop: "5px" }}
              >
                <MenuItem value="red" sx={{ color: "red" }}>
                  Rouge
                </MenuItem>
                <MenuItem value="blue" sx={{ color: "blue" }}>
                  Bleu
                </MenuItem>
                <MenuItem value="green" sx={{ color: "green" }}>
                  Vert
                </MenuItem>
                <MenuItem value="yellow" sx={{ color: "yellow" }}>
                  Jaune
                </MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                mb: 1,
              }}
            >
              <FormControl sx={{ m: 0, minWidth: 130 }}>
                <InputLabel
                  id="demo-simple-select-autowidth-label"
                  sx={{ fontSize: "17px", marginTop: "-11px" }}
                >
                  Public
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={event.audience}
                  onChange={handleChangeAudience}
                  autoWidth
                  focused
                  label="Public"
                  sx={{
                    height: "34px",
                    borderRadius: "20px",
                    marginTop: "5px",
                  }}
                >
                  <MenuItem value={"student"}>Étudiant</MenuItem>
                  <MenuItem value={"teacher"}>Enseignant</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 0, minWidth: 130 }}>
                <InputLabel
                  id="demo-simple-select-autowidth-label"
                  sx={{ fontSize: "17px", marginTop: "-11px" }}
                >
                  Filière
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={event.filiere_id}
                  onChange={handleChangeFiliere}
                  autoWidth
                  focused
                  label="Filière"
                  sx={{
                    height: "34px",
                    borderRadius: "20px",
                    marginTop: "5px",
                  }}
                >
                  {filieres.map((filiere) => (
                    <MenuItem key={filiere.id} value={filiere.id}>
                      {filiere.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6">
              <GroupIcon className="event-icons" /> Public
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, ml: 3 }}>
              {event.audience === "student" ? "Étudiant" : "Enseignant"}
            </Typography>
            <Typography variant="h6">
              <GroupIcon className="event-icons" /> Filière
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, ml: 3 }}>
              {event.filiere_nom}
            </Typography>
          </>
        )}

        {isLoading ? (
          <Skeleton animation="wave" />
        ) : isEditMode ? (
          <>
            <FormControl sx={{ m: 0, minWidth: 130 }}>
              <InputLabel
                id="demo-simple-select-autowidth-label"
                sx={{ fontSize: "17px", marginTop: "-11px" }}
              >
                Date début
              </InputLabel>
              <TextField
                id="datetime-local"
                type="datetime-local"
                value={event.dateDeb}
                onChange={(e) =>
                  setEvent({ ...event, dateDeb: e.target.value })
                }
                sx={{
                  width: "50%",
                  height: "34px",
                  borderRadius: "20px",
                  marginTop: "5px",
                }}
              />
            </FormControl>
            <FormControl sx={{ m: 0, minWidth: 130 }}>
              <InputLabel
                id="demo-simple-select-autowidth-label"
                sx={{ fontSize: "17px", marginTop: "-11px" }}
              >
                Date fin
              </InputLabel>
              <TextField
                id="datetime-local"
                type="datetime-local"
                value={event.dateFin}
                onChange={(e) =>
                  setEvent({ ...event, dateFin: e.target.value })
                }
                sx={{
                  width: "50%",
                  height: "34px",
                  borderRadius: "20px",
                  marginTop: "5px",
                }}
              />
            </FormControl>
          </>
        ) : (
          <>
            <Typography variant="h6">
              <ScheduleIcon className="event-icons" /> Date et heure
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, ml: 3 }}>
              {formatDateTime(event.dateDeb)} - {formatDateTime(event.dateFin)}
            </Typography>
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {!isEventNotStarted && (
          <Button variant="outlined" color="secondary" startIcon={<CloseIcon />}>
            Fermer
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default EventDetails;
