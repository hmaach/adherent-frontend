import React from "react";

const Evenement = ({ event, searchValue }) => {
  const dateStyle = {
    color: event.color,
  };

  const borderStyle = {
    backgroundColor: event.color,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
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

  const dateDeb = new Date(event.dateDeb);
  const day = dateDeb.getDate();
  const monthOptions = { month: "long" };
  const month = new Intl.DateTimeFormat("fr-FR", monthOptions).format(dateDeb);
  const year = dateDeb.getFullYear();

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
            <h5
              className="event-titre"
              dangerouslySetInnerHTML={{
                __html: highlightSearchValue(event.titre),
              }}
            />
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
