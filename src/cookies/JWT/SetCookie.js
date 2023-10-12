import React from 'react'
import Cookie from 'js-cookie'

const SetCookie = (cookieName,usrin) => {
    Cookie.set(cookieName,usrin,{
        expires:1,
        secure:true,
        sameSite:'Strict',
        path:'/'
    });
}

export default SetCookie
