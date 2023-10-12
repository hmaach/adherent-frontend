import { selectCurrentUser } from "../../features/auth/authSlice";
import { addEvent, getEvents } from "../../app/api/eventAxios";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import timeGridPlugin from "@fullcalendar/timegrid";
import GetCookie from "../../cookies/JWT/GetCookie";
import dayGridPlugin from "@fullcalendar/daygrid";
import UpdateEventAlert from "./AddEventAlert";
import FullCalendar from "@fullcalendar/react";
import ShowEventAlert from "./ShowEventAlert";
import AddEventAlert from "./AddEventAlert";
import listPlugin from "@fullcalendar/list";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { tokens } from "../../theme";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import Header from "./Header";
import {
  Backdrop,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showAddEventAlert, setShowAddEventAlert] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filieres, setFilieres] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [showEventAlert, setShowEventAlert] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(true);
  const [eventId, setEventId] = useState();
  const token = GetCookie("jwt");
  const user = useSelector(selectCurrentUser);

  const fetchData = async () => {
    try {
      getEvents(token)
        .then((data) => {
          if (data) {
            setEvents(data.evenements);
            setFilieres(data.filieres);
          }
          setOpenBackdrop(false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenBackdrop(false);
    }
  };

  const handleAddEvent = (newEvent) => {
    addEvent(newEvent, token)
      .then((data) => {
        console.log(data.message);
        if (data.message === "success") {
          newEvent = {
            ...newEvent,
            id: data.newEvent_id,
            user_id: user.id,
            nom: user.nom,
            prenom: user.prenom,
          };

          setEvents((prevEvents) => [newEvent, ...prevEvents]);
          setRefetch(true);
          handleClose();
          toast.success("Ajouté avec succès", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        console.log(error);
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

  const handleDateClick = (selected) => {
    setSelectedEvent(selected);
    setShowAddEventAlert(true);
    setNewTitle("");
  };

  const handleEventClick = (selected) => {
    const eventId = selected.event.id;
    setSelectedEvent(selected);
    setShowEventAlert(true);
    setEventId(eventId);
  };

  const handleEventClickRecent = (selected) => {
    const eventId = selected._def.publicId;
    setSelectedEvent(selected);
    setShowEventAlert(true);
    setEventId(eventId);
  };

  const handleUpdateEventTitle = () => {
    const calendarApi = selectedEvent.view.calendar;
    calendarApi.unselect();

    if (newTitle) {
      calendarApi.addEvent({
        id: `${selectedEvent.dateStr}-${newTitle}`,
        title: newTitle,
        start: selectedEvent.startStr,
        end: selectedEvent.endStr,
        allDay: selectedEvent.allDay,
      });
    }

    setShowAddEventAlert(false);
  };
  const convertEventsToCalendarFormat = (events) => {
    return events.map((event) => {
      return {
        id: event.id,
        title: event.title,
        start: event.dateDeb,
        end: event.dateFin,
      };
    });
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  const handleClose = () => {
    setShowAddEventAlert(false);
    setShowEventAlert(false);
  };

  const handleCancelUpdateEventTitle = () => {
    setShowAddEventAlert(false);
  };

  useEffect(() => {
    fetchData();
  }, [user, refetch]);

  return (
    <Box m="20px" marginTop={6} width={"100%"}>
      <Header
        title="Calendrier"
        // subtitle="Full Calendar Interactive Page"
      />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          // backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h6">Evénements</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Récemment ajoutés
          </Typography>
          <List>
            {currentEvents.slice(0, 6).map((event) => (
              <ListItem
                key={event.id}
                onClick={() => handleEventClickRecent(event)}
                sx={{
                  backgroundColor: "#f2efef",
                  cursor: "pointer",
                  margin: "7px 0",
                  borderRadius: "12px",
                  transition: "background-color 0.6s, box-shadow 0.6s",
                  "&:hover": {
                    backgroundColor: colors.primary[400],
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography variant="subtitle2" color="textSecondary">
                      {event.start.toLocaleDateString("fr", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              bootstrap5Plugin,
            ]}
            themeSystem="bootstrap5"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={
              user?.role === "admin" || user?.role === "formateur"
                ? handleDateClick
                : null
            }
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            events={events}
            locale={frLocale}
          />
        </Box>
      </Box>

      {showAddEventAlert && selectedEvent && (
        <AddEventAlert
          selected={selectedEvent}
          open={true}
          filieres={filieres}
          handleClose={handleClose}
          newTitle={newTitle}
          onSubmit={handleAddEvent}
          setNewTitle={setNewTitle}
          onSave={handleUpdateEventTitle}
          onCancel={handleCancelUpdateEventTitle}
        />
      )}
      {showEventAlert && eventId && (
        <ShowEventAlert
          refetch={refetch}
          setRefetch={setRefetch}
          eventId={eventId}
          open={true}
          handleClose={handleClose}
        />
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        // onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Calendar;
