import React from 'react'
import Cookie from 'js-cookie'

const GetCookie = (cookieName) => {
    const val = Cookie.get(cookieName);
    if (!val && cookieName === "jwt") {
        const localToken = localStorage.getItem("token");
        return typeof localToken === 'string' ? localToken.replace(/\"/g, "") : null;
    }
    return val;
}

export default GetCookie
