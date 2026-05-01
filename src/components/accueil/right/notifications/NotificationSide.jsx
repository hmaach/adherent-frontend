import React, { useState } from "react";
import '../right.css'
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

const NotificationSide = (props) => {
  const notif = props.notif


  const createdDate = new Date(notif.created_at || notif.dateNotif);
  const relativeTime = formatDistanceToNow(createdDate, { locale: frLocale, addSuffix: true });

  return (
    <div
      className=""
      style={{ width: "100%", margin: "auto", cursor: "pointer", background: notif.is_read === 0 ? '#fff3cd' : 'transparent', borderRadius: '5px', padding: '5px' }}
      key={notif.id}
    >
      <div
        className="card-body notif"
      >
        <p
          className="card-subtitle text-muted text-start type_notif"
          style={{ fontWeight: notif.is_read === 0 ? 'bold' : 'normal' }}
        >
          {notif.title || (notif.poste ? "Nouveau poste" : "Nouvel évènement")} · {relativeTime}
        </p>
        <p
          className="card-text text-start lib_notif"
          style={{ margin: "0 !important", color: notif.is_read === 0 ? '#856404' : 'inherit' }}
        >
          {notif.message ? notif.message : (notif.poste
            ? `${notif.nom} ${notif.prenom} a publié un nouveau poste "${notif.poste.slice(0, 30)}..."`
            : `${notif.nom} ${notif.prenom} a ajouté un nouvel évènement "${notif.event?.slice(0, 30)}..."`)
          }
        </p>
      </div>
    </div>

  );
};

export default NotificationSide;
