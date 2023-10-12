import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import Calendar from "react-calendar";
import "./miniCalendar.css";
import GetCookie from "../../cookies/JWT/GetCookie";
import { getThisMonthEvents } from "../../app/api/eventAxios";
import ShowEventsAlert from "./SowEventsAlert";
import { Box, Skeleton } from "@mui/material";

const MiniCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateEventsIds, setSelectedDateEventsIds] = useState([]);
  const [showEventsAlert, setShowEventsAlert] = useState(false);
  const token = GetCookie("jwt");

  useEffect(() => {
    setIsLoading(true); // Set loading state to true before API call

    getThisMonthEvents(token)
      .then((data) => {
        setEvents(data.events);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false after API call completes
      });
  }, []);

  const handleClose = () => {
    setShowEventsAlert(false);
  };

  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  const handleDayClick = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const eventsForDate = events.filter(
      (event) => format(new Date(event.start), "yyyy-MM-dd") === formattedDate
    );

    if (eventsForDate.length > 0) {
      const ids = eventsForDate.map((event) => event.id);
      setSelectedDateEventsIds(ids);
      setShowEventsAlert(true);
    }
  };

  const tileDisabled = ({ date }) => !isSameMonth(date, currentMonthStart);
  const tileContent = ({ date }) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const eventsForDate = events.filter(
      (event) => format(new Date(event.start), "yyyy-MM-dd") === formattedDate
    );

    if (eventsForDate.length > 0) {
      return (
        <div>
          <div
            style={{
              backgroundColor: "var(--color-primary)",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              margin: "2px",
              position: "absolute",
            }}
          ></div>
        </div>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="right_loading">
        <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      {" "}
      {/* Add a container around the calendar */}
      <Calendar
        tileContent={tileContent}
        calendarType="US"
        tileDisabled={tileDisabled}
        className="mini-calendar"
        onClickDay={handleDayClick}
      />
      {showEventsAlert && selectedDateEventsIds.length > 0 && (
        <ShowEventsAlert
          eventsIds={selectedDateEventsIds}
          open={true}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default MiniCalendar;
