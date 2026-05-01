import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import url from "../../../../app/api/url";

const AccountMight = (props) => {
  const adherent = props.adherent;

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  return (
    <Link
      to={`/profil/${adherent.user_id}`}
      id="box-account-might"
      key={adherent.user_id}
    >
      <div id="container-might">
        <span id="user-boxh" style={{ display: "flex" }}>
          {
            adherent.img_path ? (
              <img
                id="personr"
                src={adherent.img_path.startsWith('http') ? adherent.img_path : url + "/storage/" + adherent.img_path}
                alt="profile"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${adherent?.user?.prenom || 'U'}&background=random` }}
                style={{ borderRadius: '50%' }}
              />
            ) : (
              <img src={`https://ui-avatars.com/api/?name=${adherent?.user?.prenom || 'U'}&background=random`} alt="profil" id="personr" style={{ borderRadius: '50%' }} />
            )
          }

          <span className="four_stagiaires">
            {/* <p id="name"><span className='first-letter'>{prenom}</span> <span className='first-letter'>{nom}</span></p> */}
            <p id="namer">
              <span className="first-letter" style={{ fontWeight: 'bold' }}>
                {adherent?.user?.prenom} {adherent?.user?.nom}
              </span>
            </p>
            <p id="idr" className="first-letter">
              {adherent?.profession}
            </p>
          </span>
        </span>
      </div>
    </Link>
  );
};

export default AccountMight;
