import React from "react";
import {
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import url from "../../../app/api/url";

const AnnounceItem = ({ announce, onDelete }) => {
  
  const startDate = new Date(announce.debut ? announce.debut.replace(' ', 'T') : announce.debut);
  const endDate = new Date(announce.fin ? announce.fin.replace(' ', 'T') : announce.fin);

  const formattedStartDate = format(startDate, "HH:mm 'le' EEEE dd MMMM yyyy", {
    locale: fr,
  });
  const formattedEndDate = format(endDate, "HH:mm 'le' EEEE dd MMMM yyyy", {
    locale: fr,
  });

  return (
    <Card className="announce-edit-item">
      <DehazeIcon className="icon-annoounce-edit" />
      {announce.img ? (
        <img src={url + "/storage/" + announce.img} alt="Announce" className="img-annoounce-edit" />
      ) : (
        <img
          className="img-annoounce-edit"
          src="https://fl-1.cdn.flockler.com/embed/no-image.svg"
          alt="Announce"
        />
      )}
      <CardContent sx={{ minWidth: "71%" }}>
        <h3 className="titre-annoounce-edit" style={{ margin: "0 0 10px 0", fontSize: "1.1rem" }}>
          {announce.titre || "Sans Titre"} 
          <span style={{ float: 'right', color: '#1976d2', fontWeight: 'bold' }}>
            {announce.prix ? `${announce.prix}$` : 'Sur demande'}
          </span>
        </h3>
        <p className="desc-annoounce-edit">
          {announce.desc && announce.desc.substring(0, 100)}...
        </p>
        <p className="date-annoounce-edit">
          Depuis {formattedStartDate} à {formattedEndDate}
        </p>
      </CardContent>
      <IconButton
        aria-label="delete"
        style={{ marginRight: "7px" }}
        onClick={() => onDelete(announce.id)}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default AnnounceItem;
