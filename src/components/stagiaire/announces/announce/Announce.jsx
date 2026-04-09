import React from "react";
import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import url from "../../../../app/api/url";
import "./announce.css";
import { Badge } from "@mui/material";

const safeFormatDate = (value, formatStr) => {
  if (!value) return "Date non disponible";

  const date = new Date(value);
  if (!isValid(date)) return "Date non disponible";

  return format(date, formatStr, { locale: fr });
};

const Announce = (props) => {
  const formattedStartDate = safeFormatDate(
    props.debut,
    "HH:mm 'le' EEEE dd MMMM yyyy",
  );

  const formattedEndDate = safeFormatDate(
    props.fin,
    "HH:mm 'le' EEEE dd MMMM yyyy",
  );

  return (
    <>
      {props.approved === 0 && (
        <Badge badgeContent={"Non-approuvé"} color="error"></Badge>
      )}

      {props.img && (
        <img
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          src={props.img}
          alt="Announce"
          className={`announce-image ${
            props.approved === 0 ? "unapproved-announce" : ""
          }`}
        />
      )}

      <div className="announce-footer">
        {props.desc && <p>{props.desc}</p>}
        Depuis {formattedStartDate} à {formattedEndDate}
        {props.approved === 0 && (
          <p className="pending-approval-message" style={{ color: "orange" }}>
            En attente d'approbation par l'administrateur...
          </p>
        )}
      </div>
    </>
  );
};

export default Announce;
