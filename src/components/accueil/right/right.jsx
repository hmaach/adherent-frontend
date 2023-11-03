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
  const [fourAdherents, setFourAdherents] = useState([]);
  const [isLoadingNotif, setIsLoadingNotif] = useState(true);
  const [isLoadingStag, setIsLoadingStag] = useState(true);
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

  const fetchRandomFourAdherents = async () => {
    try {
      getRandomFourAdherents().then((data)=>{
        setFourAdherents(data)
        setIsLoadingStag(false);
      })
    } catch (error) {
      console.log(error);
      setErrStag(error);
      setIsLoadingStag(false);
    }
  };


  const events = [
    { id: 1, date: '2023-06-15', color: 'red' },
    { id: 2, date: '2023-06-20', color: 'blue' },
    { id: 3, date: '2023-06-25', color: 'green' },
    // ... add more events here
  ];
  useEffect(() => {
    // fetchNotifs();
    fetchRandomFourAdherents();
    const interval = setInterval(() => {
      // fetchNotifs();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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
          <div className="miniCalandar" >
          <MiniCalendar events={events}/>
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
