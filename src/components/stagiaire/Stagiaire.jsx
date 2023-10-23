import React, { useState, useEffect } from "react";
import "./assets/stagiaire.css";
import "./stagiaire.css";
import "./assets/aos.css";
import Formations from "./formation/Formations";
import Header from "./header/Header";
import Contact from "./contact/Contact";
import Competences from "./competences/Competences";
import Experiences from "./experiences/Experiences";
import Interet from "./interet/Interet";
import { getCv } from "../../app/api/stagiaireAxios";
import { useParams } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import Announces from "./announces/Announces";

const Stagiaire = () => {
  const { id } = useParams();
  const [stagiaireData, setStagiaireData] = useState({});
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const fetchData = () => {
  //     getCv(id)
  //       .then((data) => {
  //         const cvData = data.stagiaire.cv;
  //         const birthDate = cvData ? new Date(cvData.dateNais) : null;
  //         const now = new Date();
  //         const age = birthDate ? now.getFullYear() - birthDate.getFullYear() : null;

  //         setStagiaireData({
  //           id: data.stagiaire.id,
  //           nom: data.stagiaire.nom,
  //           prenom: data.stagiaire.prenom,
  //           tel: data.stagiaire.tel,
  //           email: data.stagiaire.email,
  //           filiere: data.stagiaire.groupe.filiere.libelle,
  //           groupe: data.stagiaire.groupe.libelle,
  //           statut: data.stagiaire.statut,
  //           interets: data.stagiaire.interets,
  //           propos: cvData ? cvData.propos : '',
  //           competences: data.stagiaire.competences,
  //           formations: data.stagiaire.formations,
  //           experiences: data.stagiaire.experiences,
  //           age: age,
  //         });

  //         setOpen(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setOpen(false);
  //       });
  //   };

  //   fetchData(); // Initial data fetch

  //   const interval = setInterval(fetchData, 2000); // Fetch data every 5 seconds

  //   return () => {
  //     clearInterval(interval); // Clean up the interval on component unmount
  //   };
  // }, [id]);

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
      {/* <hr className="d-print-none" /> */}
      {/* <Competences header={stagiaireData} />
      <hr className="d-print-none" />
      <Experiences experiences={stagiaireData.experiences} userId={stagiaireData.id} />

      <hr className="d-print-none" />
      <Formations formations={stagiaireData.formations} userId={stagiaireData.id} />
      <hr className="d-print-none" />
      {stagiaireData.interets && (
        <Interet interets={stagiaireData.interets} userId={stagiaireData.id} />
      )} */}
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
