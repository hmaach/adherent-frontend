import React, { useEffect, useState } from "react";
import "./right.css";
import AccountMight from "./accountMight/accountMight";
import { Link } from "react-router-dom";
import NotificationSide from "./notifications/NotificationSide";
import axios from "axios";
import GetCookie from "../../../cookies/JWT/GetCookie";
import baseURL from "../../../app/api/baseURL";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import MiniCalendar from "../../calandar/MiniCalendar";
import { getRandomFourAdherents } from "../../../app/api/adherentAxios";
// import MiniCalendrier from "../calendrier/MiniCalendrier";

const Right = () => {
  const [notifs, setNotifs] = useState([]);
  const [fourAdherents, setFourAdherents] = useState([]);
  const [isLoadingNotif, setIsLoadingNotif] = useState(true);
  const [isLoadingStag, setIsLoadingStag] = useState(false);
  const [errNotif, setErrNotif] = useState();
  const [errStag, setErrStag] = useState();

  const fetchNotifs = async () => {
    try {
      const token = GetCookie("jwt");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await baseURL.get(`/notifications`, { headers });
      const data = response.data;
      setNotifs(data.notifications || []);
      setIsLoadingNotif(false);
    } catch (error) {
      console.log(error);
      setErrNotif(error);
      setIsLoadingNotif(false);
    }
  };

  const fetchRandomFourAdherents = async () => {
    try {
      getRandomFourAdherents().then((data) => {
        setFourAdherents(data);
        setIsLoadingStag(false);
      });
    } catch (error) {
      console.log(error);
      setErrStag(error);
      setIsLoadingStag(false);
    }
  };

  useEffect(() => {
    fetchNotifs();
    fetchRandomFourAdherents();
    const interval = setInterval(() => {
      fetchNotifs();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNotifClick = async (notifId) => {
    try {
      const token = GetCookie("jwt");
      if (!token) return;
      await baseURL.post(`/notifications/${notifId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state to mark as read
      setNotifs(notifs.map(n => n.id === notifId ? { ...n, is_read: 1 } : n));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="container-right">
      {notifs && (
        <div id="might-like-box">
          <h2 id="title-might" style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Notifications
            {notifs.some(n => n.is_read === 0) && (
              <span style={{ fontSize: '12px', background: '#e86928', color: 'white', padding: '2px 6px', borderRadius: '10px' }}>
                {notifs.filter(n => n.is_read === 0).length} nouvelle(s)
              </span>
            )}
          </h2>
          {isLoadingNotif
            ?
            <div className="right_loading">
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </div>
            : notifs.length > 0 ? (
              notifs.map(notif => {
                return (
                  <div key={notif.id} onClick={() => handleNotifClick(notif.id)}>
                    <NotificationSide notif={notif} />
                  </div>
                )
              })
            ) : (
              <p style={{ color: "#6c757d", fontSize: "14px", fontStyle: "italic", textAlign: "center" }}>
                Aucune notification pour le moment.
              </p>
            )
          }
          <h2 id="title-might" style={{ marginTop: "20px", marginBottom: "15px" }}>Calendrier</h2>
          <div className="miniCalandar">
            <MiniCalendar />
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
