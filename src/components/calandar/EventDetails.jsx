import React, { useState } from "react";
import GetCookie from "../../cookies/JWT/GetCookie";
import {
  cancelEvent,
  deleteEvent,
  restoreEventColor,
  showEvent,
  updateEvent,
} from "../../app/api/eventAxios";
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
import { toast } from "react-toastify";
import { selectCurrentUser } from "../../features/auth/authSlice";

const EventDetails = (props) => {
  const { eventId, handleClose, refetch, setRefetch } = props;
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const token = GetCookie("jwt");
  const filieres = useSelector(selectFiliereSlice);
  const user = useSelector(selectCurrentUser);

  const handleDeleteClick = () => {
    deleteEvent(eventId, token)
      .then((data) => {
        if (data.message === "success") {
          console.log(data.message);
          toast.success("Supprimé avec succès", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setRefetch(!refetch);
          handleClose();
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        toast.error(error, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleClose();
      });
  };

  const handleCancelEventClick = () => {
    const updatedEvent = { ...event, color: "red" };
    cancelEvent(eventId, token)
      .then((data) => {
        if (data.message === "success") {
          console.log(data.message);
          toast.success("Annuler avec succès", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          handleClose();
          setRefetch(!refetch);
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        toast.error(error, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleClose();
      });
    console.log(updatedEvent);
    setEvent(updatedEvent);
  };

  const handleRestoreEventClick = () => {
    const updatedEvent = { ...event, color: event.oldColor };
    restoreEventColor(eventId, token)
      .then((data) => {
        if (data.message === "success") {
          console.log(data.message);
          toast.success("Restauré avec succès", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          handleClose();
          setRefetch(!refetch);
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        toast.error(error, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleClose();
      });
  };

  useEffect(() => {
    showEvent(eventId, token)
      .then((data) => {
        setEvent(data.evenement);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error(error, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleClose();
      });
  }, []);

  const isEventNotStarted =
    event.dateDeb && new Date() < new Date(event.dateDeb);

  const handleEditClick = () => {
    setIsEditMode(true);
    // console.log(event);
  };

  const handleCancelEditing = () => {
    setIsEditMode(false);
    // cancelEvent(eventId, token)
    //   .then((data) => {
    //     if (data.message === "success") {
    //       console.log(data.message);
    //       toast.success("Publié avec succès", {
    //         position: "top-center",
    //         autoClose: 4000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //       handleClose();
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error deleting event:", error);
    //     toast.error(error, {
    //       position: "top-center",
    //       autoClose: 4000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //     handleClose();
    //   });
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    setIsDirty(false);

    updateEvent(eventId, event, token)
      .then((data) => {
        console.log(data.message);
        if (data.message === "success") {
          toast.success("Enregistré avec succès", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setRefetch(!refetch);
        }
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        toast.error(error, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleClose();
      });
  };

  const isDateDebDirty = isEditMode && isDirty && event.dateDeb !== undefined;

  const formatDateTime = (dateTime) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDateTime = new Date(dateTime).toLocaleDateString(
      "fr-FR",
      options
    );
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
        {user?.role === "admin" || user?.id === event.user_id ? (
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
                        disabled={!isDateDebDirty}
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
              </>
            )}
            {!isEditMode && isEventNotStarted && (
              <>
                {event.color !== "red" ? (
                  <Tooltip title="Annuler l'événement" arrow>
                    <IconButton
                      aria-label="Cancel"
                      size="large"
                      color="secondary"
                      onClick={handleCancelEventClick}
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
                      onClick={handleRestoreEventClick}
                      color="secondary"
                      sx={{ mr: 1 }}
                    >
                      <RestoreIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}
            {(user?.role === "admin" || user?.id === event.user_id) && (
              <Tooltip title="Supprimer l'événement" arrow>
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  onClick={handleDeleteClick}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        ) : null}
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
            onChange={(e) => {
              setEvent({ ...event, titre: e.target.value });
              setIsDirty(true);
            }}
          />
        ) : (
          <>
            <Typography variant="h6">
              <EventIcon className="event-icons" /> Titre
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, ml: 3 }}>
              {event.titre}
            </Typography>
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
            onChange={(e) => {
              setEvent({ ...event, description: e.target.value });
              setIsDirty(true);
            }}
          />
        ) : (
          <>
            <Typography variant="h6">
              <DescriptionIcon className="event-icons" /> Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, ml: 3 }}>
              {event.description}
            </Typography>
          </>
        )}

        {isLoading ? (
          <Skeleton animation="wave" />
        ) : isEditMode ? null : (
          <>
            <Typography variant="h6">
              <GroupIcon className="event-icons" /> Audience
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, ml: 3 }}>
              {event.audience}
            </Typography>
          </>
        )}

        {isLoading ? (
          <Skeleton animation="wave" />
        ) : isEditMode ? (
          <TextField
            variant="outlined"
            sx={{ mb: 2, width: "100%" }}
            value={event.dateDeb}
            label="Date de début"
            focused
            type="datetime-local"
            onChange={(e) => {
              setEvent({ ...event, dateDeb: e.target.value });
              setIsDirty(true);
              console.log(e.target.value);
              console.log(isEditMode);
            }}
          />
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

        {isLoading ? (
          <Skeleton animation="wave" />
        ) : isEditMode ? (
          <TextField
            variant="outlined"
            sx={{ mb: 2, width: "100%" }}
            label="Date de fin"
            focused
            value={event.dateFin}
            type="datetime-local"
            onChange={(e) => {
              setEvent({ ...event, dateFin: e.target.value });
              setIsDirty(true);
              console.log(e.target.value);
            }}
          />
        ) : null}
      </Box>
    </Container>
  );
};

export default EventDetails;
