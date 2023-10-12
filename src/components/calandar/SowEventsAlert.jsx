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
import { showEvent, showEvents } from "../../app/api/eventAxios";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ShowEventAlert from "./ShowEventAlert";
import EventDetails from "./EventDetails";

const ShowEventsAlert = (props) => {
  const { open, handleClose, eventsIds } = props;
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = GetCookie("jwt");
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    showEvents(eventsIds, token)
      .then((data) => {
        setEvents(data.events);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="first-letter">
        {events.length > 0 &&
          events[0].start &&
          format(parseISO(events[0].start), "EEEE dd MMMM yyyy", {
            locale: fr,
          })}
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Skeleton variant="text" sx={{ width: "30rem" }} />
        ) : (
          <div>
            {events.map((event) => (
              <Accordion
                key={event.id}
                expanded={expanded === `panel-${event.id}`}
                onChange={handleChange(`panel-${event.id}`)}
                sx={{ width: "30rem" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${event.id}-content`}
                  id={`panel-${event.id}-header`}
                >
                  <Typography sx={{ width: "15%", flexShrink: 0 }}>
                    {event.start &&
                      format(parseISO(event.start), "HH:mm", {
                        locale: fr,
                      })}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {event.title.length > 200
                      ? `${event.title.substring(0, 200)}...`
                      : event.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <EventDetails eventId={event.id} handleClose={handleClose} />
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowEventsAlert;
