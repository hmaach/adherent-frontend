import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'

const Logo2 = () => {
  return (
    <div className="logo_div2">
    <NavLink to="/" className="logo2">
      <img src="/Logo_ofppt.png" alt="logo" />
    </NavLink>
    <hr className="hr" />
  </div>
  )
}

export default Logo2
