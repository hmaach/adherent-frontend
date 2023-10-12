import React, { useEffect } from 'react'
import { TbLogout } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, setCredentials } from '../../features/auth/authSlice'
import './navbar.css'
import Logout from '../../features/logout/Logout'
import { Avatar } from '@mui/material'

const User = () => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
      dispatch(setCredentials({
        user: storedUser,
        token: localStorage.getItem('token')
      }))
    }
  }, [dispatch])

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
  if (user) {
    let nom = user.nom
    let prenom = user.prenom
    return (
      <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
        <span id="user-box">
          {user.profile
            ? <img
              id="person"
              src="ayadi.jpeg"
              alt="profile"
            />
            : <Avatar id="person" {...stringAvatar(`${prenom} ${nom}`)} />
          }

          {user.role === 'stagiaire' ?
            <span>
              <p id="name"><span className='first-letter'>{prenom}</span> <span className='first-letter'>{nom}</span></p>
              <p id="id">DEVOWFS202</p>
            </span>
            :
            <span>
              <p id="name"><span className='first-letter'>{prenom}</span> <span className='first-letter'>{nom}</span></p>
              <p id="id" className='first-letter'>{user.role}</p>
            </span>
          }

        </span>
        <Logout />
      </div>
    )
  } else {
    return null
  }
}

export default User
