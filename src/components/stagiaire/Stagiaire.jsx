import React, { useState, useEffect } from "react";
import "./assets/stagiaire.css";
import "./stagiaire.css";
import "./assets/aos.css";
import Header from "./header/Header";
import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import Announces from "./announces/Announces";
import Location from "./Location/Location";
import { DEMO_MODE } from "../../app/api/mockApi";
import { mockGetAdherent } from "../../app/api/mockApi";

const Stagiaire = () => {
  const { id } = useParams();
  const [stagiaireData, setStagiaireData] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (DEMO_MODE && id) {
      // In demo mode, fetch from mock API
      mockGetAdherent(id)
        .then((data) => {
          setStagiaireData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleAproposDeMoiChange = (newAproposDeMoi) => {
    setStagiaireData((prevState) => ({
      ...prevState,
      propos: newAproposDeMoi,
    }));
  };

  return (
    <div className="cover shadow-lg bg-white" id="cv">
      <Header />
      <hr className="d-print-none" />
      <Announces />
      <hr className="d-print-none" />
      <div
        style={{
          //  border: "red solid 1px",
          overflow: "hidden",
        }}
      >
        <Location />
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Stagiaire;
