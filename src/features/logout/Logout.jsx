import React from 'react'
import { useNavigate } from 'react-router-dom';
import { TbLogout } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { logOut } from '../../features/auth/authSlice'
import RemoveCookie from '../../cookies/JWT/RemoveCookie';
const { localStorage } = window;

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        RemoveCookie('jwt')
        localStorage.removeItem('credentials');
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <button onClick={handleLogout} className='logout'>
            <TbLogout id="logout-bottom" />
        </button>
    )
}

export default Logout
