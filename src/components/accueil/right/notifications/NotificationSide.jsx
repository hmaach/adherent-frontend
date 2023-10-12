import React, { useState } from "react";
import '../right.css'
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

const NotificationSide = (props) => {
  const notif = props.notif


  const createdDate = new Date(notif.dateNotif);
  const relativeTime = formatDistanceToNow(createdDate, { locale: frLocale, addSuffix: true });


  return (
    <div
      className=""
      style={{ width: "100%", margin: "auto" }}
      key={notif.id}
    >
      <div
        className="card-body notif"
      >
        <p
          className="card-subtitle text-muted text-start type_notif"
        >
          {notif.poste ? "Nouveau poste" : "nouvelle évènement"} · {relativeTime}
        </p>
        <p
          className="card-text text-start lib_notif"
          style={{ margin: "0 !important" }}
        >
          {notif.poste
            ? `${notif.nom} ${notif.prenom} publier un nouveau poste "${notif.poste.slice(0, 30)}..."`
            : `${notif.nom} ${notif.prenom} Ajouter une nouvelle évènement "${notif.event.slice(0, 30)}..."`
          }
        </p>
      </div>
    </div>

  );
};

export default NotificationSide;
