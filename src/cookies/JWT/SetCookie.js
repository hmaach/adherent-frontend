
import Cookie from 'js-cookie'

const SetCookie = (cookieName,usrin) => {
    Cookie.set(cookieName,usrin,{
        expires:1,
        secure:false, // Changed to false for localhost HTTP
        sameSite:'Lax', // Changed to Lax for general dev use
        path:'/'
    });
}

export default SetCookie
