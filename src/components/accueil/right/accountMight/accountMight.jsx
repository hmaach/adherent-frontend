import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AccountMight = (props) => {
  const stagiaire = props.stagiaire

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }


  return (
    <Link to={`/profile/${stagiaire.id}`} id="box-account-might" key={stagiaire.id}>
      <div id="container-might">
        <span id="user-boxh" style={{ display: 'flex' }}>
          {stagiaire.profile
            ? <img
              id="personr"
              src="ayadi.jpeg"
              alt="profile"
            />
            : <Avatar id="personr" {...stringAvatar(`${stagiaire?.prenom} ${stagiaire?.nom}`)} />
          }

          <span className="four_stagiaires">
            {/* <p id="name"><span className='first-letter'>{prenom}</span> <span className='first-letter'>{nom}</span></p> */}
            <p id="namer"><span className='first-letter'>{stagiaire?.prenom}</span> <span className='first-letter'>{stagiaire?.nom}</span></p>
            <p id="idr" className='first-letter'>{stagiaire?.groupe?.libelle} | {stagiaire?.groupe?.filiere?.libelle}</p>
          </span>
        </span>
      </div>
    </Link>
  );
};

export default AccountMight;
