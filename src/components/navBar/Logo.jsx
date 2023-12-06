import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'

const Logo = () => {
  return (
    <div className="logo_div">
      <NavLink to="/" className="logo">
        <img src="/logo.png" alt="logo" />
        <span>
          <span className="sobol">SOBOL </span>
          <span className='digital'>Numérique</span>
        </span>
      </NavLink>
      <hr className="hr" />
    </div>
  )
}

export default Logo
