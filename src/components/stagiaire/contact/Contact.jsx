import React from 'react'
import './contact.css'
import SocialLinks from './SocialLinks'

const Contact = () => {
  const socialLinks = [
    {
      id: 1,
      name: 'Twitter',
      link: 'https://twitter.com',
      icon: 'fab fa-twitter',
    },
    {
      id: 2,
      name: 'Facebook',
      link: 'https://facebook.com',
      icon: 'fab fa-facebook',
    },
    {
      id: 3,
      name: 'Instagram',
      link: 'https://instagram.com',
      icon: 'fab fa-instagram',
    },
  ];
  return (
    <div className="skills-section px-3 px-lg-4">
      <h2 className="h3 mb-3">Contact
      </h2>
      <div className="row">
        <SocialLinks
          socialLinks={socialLinks}
        />
      </div>
    </div>
  )
}

export default Contact
