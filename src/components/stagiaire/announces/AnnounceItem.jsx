import React from "react";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import DeleteIcon from "@mui/icons-material/Delete";

const AnnounceItem = ({ announce, index, onDelete }) => {
  return (
    <Card className="announce-edit-item">
      <DehazeIcon className="icon-annoounce-edit" />
      {announce.img ? (
        <img src={announce.img} alt="Announce" className="img-annoounce-edit" />
      ) : (
        <img
          className="img-annoounce-edit"
          src="https://fl-1.cdn.flockler.com/embed/no-image.svg"
          alt="Announce"
        />
      )}
      <CardContent sx={{ minWidth: "71%" }}>
        <p className="desc-annoounce-edit">
          {announce.desc.substring(0, 100)}...
        </p>
        <p className="date-annoounce-edit">
          Depuis {announce.debut} à {announce.debut}
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
