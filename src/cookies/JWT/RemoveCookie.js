import React from 'react'
import Cookie from 'js-cookie'

const RemoveCookie = (cookieName) => {
    Cookie.remove(cookieName);
}

export default RemoveCookie
