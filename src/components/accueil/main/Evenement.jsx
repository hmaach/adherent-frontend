import { Badge } from "@mui/material";
import React from "react";

const Evenement = ({ event, searchValue }) => {
  const dateStyle = {
    color: event.color,
  };

  const borderStyle = {
    backgroundColor: event.color,
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date non disponible";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Date non disponible";
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("fr-FR", options).format(
        date
      );
      return formattedDate;
    } catch (e) {
      return "Date non disponible";
    }
  };

  const highlightSearchValue = (text) => {
    if (!searchValue) {
      return text;
    }

    const regex = new RegExp(`(${searchValue})`, "gi");
    return text.replace(
      regex,
      (match, p1) => `<span class="highlight">${p1}</span>`
    );
  };

  // Safely handle date parsing
  let day = "--";
  let month = "--";
  let year = "----";
  try {
    if (event.dateDeb) {
      const dateDeb = new Date(event.dateDeb);
      if (!isNaN(dateDeb.getTime())) {
        day = dateDeb.getDate();
        const monthOptions = { month: "long" };
        month = new Intl.DateTimeFormat("fr-FR", monthOptions).format(dateDeb);
        year = dateDeb.getFullYear();
      }
    }
  } catch (e) {
    // Keep default values
  }

  return (
    <div id="tweet-box-event">
      <div id="box-tweet-event">
        <div className="event-date" style={dateStyle}>
          <div className="day">{day}</div>
          <div className="month">
            {month} {year}
          </div>
        </div>
        <div className="event-border" style={borderStyle}></div>
        <div className="event-details">
          <div>
            {event.color === "red" ? (
              <Badge color="error"  badgeContent={"Annuler"} showZero>
                <h5
                  className="event-titre"
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchValue(event.titre),
                  }}
                />
              </Badge>
            ) : (
              <h5
                className="event-titre"
                dangerouslySetInnerHTML={{
                  __html: highlightSearchValue(event.titre),
                }}
              />
            )}

            <p
              className="event-desc"
              dangerouslySetInnerHTML={{
                __html: highlightSearchValue(event.description),
              }}
            />
            <p className="event-date-desc">
              Depuis {formatDate(event.dateDeb)}, à {formatDate(event.dateFin)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evenement;
