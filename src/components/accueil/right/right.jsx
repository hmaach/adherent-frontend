import React, { useEffect, useState } from "react";
import "./right.css";
import AccountMight from "./accountMight/accountMight";
import { Link } from "react-router-dom";
import NotificationSide from "./notifications/NotificationSide";
import axios from "axios";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import MiniCalendar from "../../calandar/MiniCalendar";
import { getRandomFourAdherents } from "../../../app/api/adherentAxios";
// import MiniCalendrier from "../calendrier/MiniCalendrier";

const Right = () => {
  const [notifs, setNotifs] = useState([]);
  const [fourAdherents, setFourAdherents] = useState([
    {
      id: 1,
      user_id: 101,
      email: "ayadi.oussama@email.ma",
      id_name: "AYADI Oussama",
      profession: "Développeur Full Stack",
      secteur_id: 1,
      secteur: { lib: "Développement Web" },
      ville: "Casablanca",
      rating: 4.8,
      myRating: null,
      propos:
        "Développeur web passionné avec plus de 5 ans d'expérience. Spécialisé dans les technologies React, Node.js et les bases de données relationnelles. Passionné par la création d'expériences utilisateur fluides et performantes.",
      img_path: "https://i.pravatar.cc/300?img=11",
    },
    {
      id: 2,
      user_id: 102,
      email: "elamrani.fatima@email.ma",
      id_name: "EL AMRANI Fatima",
      profession: "Designer Graphique",
      secteur_id: 2,
      secteur: { lib: "Design Graphique" },
      ville: "Rabat",
      rating: 4.9,
      myRating: null,
      propos:
        "Designer graphique créative avec une passion pour le branding et l'identité visuelle. J'aide les entreprises à se démarquer grâce à des designs uniques et mémorables.",
      img_path: "https://i.pravatar.cc/300?img=5",
    },
    {
      id: 3,
      user_id: 103,
      email: "khaldi.mohamed@email.ma",
      id_name: "KHALDI Mohamed",
      profession: "Expert Marketing Digital",
      secteur_id: 3,
      secteur: { lib: "Marketing Digital" },
      ville: "Marrakech",
      rating: 4.7,
      myRating: null,
      propos:
        "Expert en marketing digital certifié Google Ads et Meta Ads. J'accompagne les entreprises dans leur croissance en ligne grâce à des stratégies marketing personnalisées et efficaces.",
      img_path: "https://i.pravatar.cc/300?img=12",
    },
    {
      id: 4,
      user_id: 104,
      email: "bensalem.kenza@email.ma",
      id_name: "BENSALEM Kenza",
      profession: "Formatrice en Langues",
      secteur_id: 4,
      secteur: { lib: "Formation" },
      ville: "Casablanca",
      rating: 4.9,
      myRating: null,
      propos:
        "Formatrice certifiée en anglais et français pour adultes et enfants. Méthodologie personnalisée pour chaque apprenant. Préparation aux examens TOEFL, IELTS et DELF.",
      img_path: "https://i.pravatar.cc/300?img=9",
    },
  ]);
  const [isLoadingNotif, setIsLoadingNotif] = useState(true);
  const [isLoadingStag, setIsLoadingStag] = useState(false);
  const [errNotif, setErrNotif] = useState();
  const [errStag, setErrStag] = useState();

  const fetchNotifs = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/notifs`);
      const data = response.data;
      setNotifs(data.notifs);
      setIsLoadingNotif(false);
    } catch (error) {
      console.log(error);
      setErrNotif(error);
      setIsLoadingNotif(false);
    }
  };

  // const fetchRandomFourAdherents = async () => {
  //   try {
  //     getRandomFourAdherents().then((data) => {
  //       setFourAdherents(data);
  //       setIsLoadingStag(false);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     setErrStag(error);
  //     setIsLoadingStag(false);
  //   }
  // };

  const events = [
    { id: 1, date: "2023-06-15", color: "red" },
    { id: 2, date: "2023-06-20", color: "blue" },
    { id: 3, date: "2023-06-25", color: "green" },
    // ... add more events here
  ];
  // useEffect(() => {
  //   // fetchNotifs();
  //   fetchRandomFourAdherents();
  //   const interval = setInterval(() => {
  //     // fetchNotifs();
  //   }, 5 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div id="container-right">
      {notifs && (
        <div id="might-like-box">
          <h2 id="title-might">Calendrier</h2>
          {/* {isLoadingNotif
            // ? (<LoadingSpinner/>)
            ?
            <div className="right_loading">
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </div>
            : (
              notifs.map(notif => {
                return (
                  <NotificationSide
                    key={notif.id}
                    notif={notif} />
                )
              }
              )
            )
          } */}
          <div className="miniCalandar">
            <MiniCalendar events={events} />
          </div>
          <div to="/stagiaires" id="show-more-box">
            <Link id="show-more-btn">Voir plus...</Link>
          </div>
        </div>
      )}
      {/* <MiniCalendrier/> */}
      {fourAdherents && (
        <div id="might-like-box">
          <h2 id="title-might">Découvrez les adhérents</h2>
          {isLoadingStag ? (
            <div className="right_loading">
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </div>
          ) : (
            fourAdherents.map((adherent) => {
              return <AccountMight key={adherent.id} adherent={adherent} />;
            })
          )}
          <div to="/stagiaires" id="show-more-box">
            <Link id="show-more-btn">Voir plus...</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Right;
