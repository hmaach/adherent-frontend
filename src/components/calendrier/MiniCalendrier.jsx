import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Skeleton } from '@mui/material'
import { useState } from 'react';
import { Link } from 'react-router-dom'

const MiniCalendrier = () => {
    const [isLoading, setIsLoading] = useState(false);
  return (
    <div id="minCalendrier-box">
          <h2 id="title-minCalendrier">Calendrier</h2>
          {isLoading
            ?
            <div className="right_loading">
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </div>
            : (
                <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                />
            )
          }
          <div to='/stagiaires' id="show-more-box">
            <Link id="show-more-btn">Voir plus...</Link>
          </div>
        </div>
  )
}

export default MiniCalendrier
