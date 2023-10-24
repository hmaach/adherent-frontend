import React, { useState, useEffect } from "react";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import EditNoteIcon from "@mui/icons-material/EditNote";
import GetCookie from "../../../cookies/JWT/GetCookie";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import QRCodeReact from "qrcode.react";
import { toast } from "react-toastify";
import "./header.css";
import { Box, Button, IconButton, Rating } from "@mui/material";
import {
  Edit as EditIcon,
  Add as AddIcon,
  PhotoCamera as PhotoCameraIcon,
} from "@mui/icons-material";
import ProposAlert from "./ProposAlert";
import RatingAlert from "./RatingAlert";
import BadgeAlert from "./BadgeAlert";

const Header = (props) => {
  const [data, setData] = useState({
    propos:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde explicabo praesentium possimus ut voluptates! Eaque quidem accusantium ex. Eos, similique repudiandae aperiam adipisci dolores odio dolorum consequuntur ab veritatis sunt quibusdam quod quos laboriosam voluptatem? In labore voluptatem incidunt vero libero necessitatibus, impedit accusamus ea dolores nam? Non, rerum ipsa.",
    ville: "Berkane",
    secteur: "Lorem ipsum dolor sit",
    profession: "Lorem ipsum",
  });
  const [showproposAlert, setShowproposAlert] = useState(false);
  const [showRatingAlert, setShowRatingAlert] = useState(false);
  const [showBadgeAlert, setShowBadgeAlert] = useState(false);
  // rating of the adherent
  const [rating, setRating] = useState(1.4);
  // rating of the user
  const [ratingValue, setRatingValue] = useState(3);

  const handleOpenRatingAlert = () => {
    setShowRatingAlert(true);
  };

  const handleSubmitRating = (value) => {
    setRatingValue(value);
  };

  const handleClose = () => {
    setShowproposAlert(false);
  };

  const handleUpdateHeader = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
    toast.success("Les changements sont enregistrés", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div>
      <div className="cover-bg p-3 p-lg-4 text-white">
        <div className="row">
          <div className="col-lg-3 col-md-5">
            <div className="avatar hover-effect bg-white shadow-sm p-1">
              <img
                src="https://blog-fr.orson.io/wp-content/uploads/2020/07/logostarbuck.png"
                width="200"
                height="200"
              />
            </div>
          </div>
          <div className="col-lg-7 col-md-7 text-center text-md-start">
            <h2 className="h1 mt-2" data-aos="fade-left" data-aos-delay="0">
              {/* {header.nom} {header.prenom} */} 2345678909876
            </h2>
            <p
              data-aos="fade-left"
              data-aos-delay="100"
              className="first-letter"
            >
              {data?.profession}
            </p>
            <div style={{ display: "flex" }} className="rating-ad">
              <Rating
                name="text-feedback"
                value={rating}
                readOnly
                style={{ color:"white" }}
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box sx={{ ml: 2, color: "white" }}>{rating}</Box>
            </div>
            <Button
              variant="contained"
              sx={{
                marginTop: "6px",
                bgcolor: "white",
                color: "#e86928",
                "&:hover": {
                  bgcolor: "#ebebeb",
                },
              }}
              size="small"
              onClick={handleOpenRatingAlert}
            >
              Votre avis
            </Button>
          </div>
          <div
            className="col-lg-2 col-md-7 text-center text-md-start qr-code-profil"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QRCodeReact
              onClick={() => {
                setShowBadgeAlert(true);
              }}
              value={"https://adherent-sobol.vercel.app/profil"}
              style={{
                cursor: "pointer",
                padding: "8px",
                background: "white",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </div>

      <div className="about-section pt-4 px-3 px-lg-4 mt-1">
        <div className="row">
          <div className="col-md-5">
            <div className="propos-de-moi-section mb-4">
              <h2 className="h3 mb-3 apropos-h3">
                À propos{" "}
                <IconButton
                  aria-label="Modifier"
                  style={{
                    // position: "absolute",
                    width: "fit-content",
                    // right: "40px",
                  }}
                  onClick={() => setShowproposAlert(true)}
                >
                  <EditNoteIcon style={{ fontSize: "2rem" }} />
                </IconButton>
              </h2>
              <p className="apropos"> {data?.propos} </p>
            </div>
          </div>
          <div className="col-md-6 offset-md-1 apropos-detail">
            <div className="pb-1 mb-3">
              SECTEUR D'ACTIVITEE :{" "}
              <span className="first-letter text-secondary">
                {data?.secteur}
              </span>
            </div>
            <div className="pb-1 mb-3">
              PROFESSION :{" "}
              <span className="first-letter text-secondary">
                {data?.profession}
              </span>
            </div>
            <div className="pb-1 mb-3">
              VILLE :{" "}
              <span className="first-letter text-secondary">{data?.ville}</span>
            </div>
          </div>
        </div>
      </div>
      {showproposAlert && (
        <ProposAlert
          open={true}
          handleClose={handleClose}
          data={data}
          onUpdate={handleUpdateHeader}
        />
      )}
      {showRatingAlert && (
        <RatingAlert
          open={true}
          handleClose={() => setShowRatingAlert(false)}
          ratingValue={ratingValue}
          onSubmit={handleSubmitRating}
        />
      )}
      {showBadgeAlert && (
        <BadgeAlert open={true} handleClose={() => setShowBadgeAlert(false)} />
      )}
    </div>
  );
};

export default Header;
