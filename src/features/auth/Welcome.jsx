import React from 'react'
import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUser } from '../../features/auth/authSlice'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    const welcome = user ? `Welcome ${user.prenom} ${user.nom} !` : 'Welcome'
    const tokenAbbr = token ? `${token.slice(0, 9)}...` : ''
        const content = (
        <section>
            <h1>{welcome}</h1>
            <p>Token : {tokenAbbr}</p>
            <p><Link to='/profile'>Go to profile</Link></p>
        </section>
    )

    return content
}

export default Welcome


 