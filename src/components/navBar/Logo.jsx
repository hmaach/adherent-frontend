import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'

const Logo = () => {
  return (
    <div className="logo_nav">
      <NavLink to="/" className="logo">
        <img src="/logo.png" alt="logo" />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span className="sobol">SOBOL</span>
          <span className='digital'>Numérique</span>
        </div>
      </NavLink>
    </div>
  )
}

export default Logo
