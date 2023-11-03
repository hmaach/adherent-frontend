import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import url from "../../../../app/api/url";
import "./announce.css";
import { Badge } from "@mui/material";

const Announce = (props) => {
  const startDate = new Date(props.debut);
  const endDate = new Date(props.fin);

  const formattedStartDate = format(startDate, "HH:mm 'le' EEEE dd MMMM yyyy", {
    locale: fr,
  });
  const formattedEndDate = format(endDate, "HH:mm 'le' EEEE dd MMMM yyyy", {
    locale: fr,
  });

  return (
    <>
      {props.approved === 0 && (
        <Badge badgeContent={"Non-approuvé"} color="error"></Badge>
      )}
      {props.img && (
        <img
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          src={url + "/storage/" + props.img}
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
