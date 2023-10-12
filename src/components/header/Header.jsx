import React, { useEffect } from 'react'
import { RiSearchLine } from "react-icons/ri";
import './header.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCredentials } from '../../features/auth/authSlice';
import Search from './Search';
import { Button } from '@mui/material';

const Header = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser) {
            dispatch(setCredentials({
                user: storedUser,
                token: localStorage.getItem('token')
            }))
        }
    }, [dispatch])
    return (
        <div className='container'>
            {/* <Search /> */}
            {/* {!user &&
                <Link  to='/login'>
                    <Button 
                        variant="contained"
                        style={{
                            borderRadius: '20px',
                        }}
                    >Connexion</Button>
                </Link>
            } */}
        </div>
    )
}

export default Header
