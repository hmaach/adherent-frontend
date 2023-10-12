import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Skeleton,
} from "@mui/material";
import GetCookie from "../../cookies/JWT/GetCookie";
import { showEvent } from "../../app/api/eventAxios";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventDetails from "./EventDetails";

const ShowEventAlert = (props) => {
  const { open, handleClose, eventId, refetch, setRefetch } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Détails de l'événement"}</DialogTitle>
      <DialogContent>
        <EventDetails
          eventId={eventId}
          handleClose={handleClose}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowEventAlert;
