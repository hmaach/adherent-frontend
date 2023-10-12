import React, { useState } from 'react';
import './login.css';
import SliderLogin from './SliderLogin';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCredentials } from '../../features/auth/authSlice';
import Logo from '../../components/navBar/Logo';
import SetCookie from '../../cookies/JWT/SetCookie';
const { localStorage } = window;

function Login() {
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()



    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const userData = await login({ email, password }).unwrap()
            if (userData.user && userData.token) {
              dispatch(setCredentials(userData));
              SetCookie('jwt',userData.token)
              localStorage.setItem('credentials', JSON.stringify(userData));
              localStorage.setItem('token', JSON.stringify(userData.token));
            }
            setEmail('')
            setPwd('')
            navigate('/accueil')
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No server response')
            } else if (err.originalStatus?.status === 400) {
                setErrMsg('Missing email or password')

            } else if (err.originalStatus?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        }
    }



    const handleUserInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPwd(e.target.value)

    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [currentSliderIndex, setCurrentSliderIndex] = useState(1);

    const handleInputChange = (e) => {
        const inputField = e.target;
        if (inputField.value) {
            inputField.classList.add('active');
        } else {
            inputField.classList.remove('active');
        }
    };

    const toggleMode = () => {
        setIsSignUpMode((prevMode) => !prevMode);
    };

    const handleSliderChange = (e) => {
        const index = e.target.getAttribute('data-value');
        setCurrentSliderIndex(index);
    };

    const renderSliderImages = () => {
        return (
            <div className="images-wrapper">
                <img src="login_img/image1.png" className={`image img-1 ${currentSliderIndex === '1' && 'show'}`} alt="" />
                <img src="login_img/image2.png" className={`image img-2 ${currentSliderIndex === '2' && 'show'}`} alt="" />
                <img src="login_img/image3.png" className={`image img-3 ${currentSliderIndex === '3' && 'show'}`} alt="" />
            </div>
        );
    };



    return (
        <main className='login-main'>
            <div className="box">
                <div className="inner-box">
                    <div className="forms-wrap">
                        <form onSubmit={handleSubmit} autoComplete="off" className="login_form">
                            <div className="logo">
                                <Logo />
                            </div>
                            <div className='divHeading'>
                                <div className="heading">
                                    <h2>Connexion</h2>
                                </div>
                            </div>

                            <div className="actual-form">
                                <div className="input-wrap">
                                    <input
                                        type="email"
                                        minLength="1"
                                        className="input-field"
                                        autoComplete="off"  
                                        required
                                        value={email}
                                        ref={userRef}
                                        onChange={(e) => { handleUserInput(e); handleInputChange(e) }}
                                    />
                                    <label className='label_login'>Email</label>
                                </div>

                                <div className="input-wrap">
                                    <input
                                        type="password"
                                        minLength="4"
                                        className="input-field"
                                        autoComplete="off"
                                        required
                                        value={password}
                                        onChange={(e) => { handlePwdInput(e); handleInputChange(e) }}
                                    />
                                    <label className='label_login'>Mot de passe</label>
                                </div>

                                <input type="submit" value="Connecxion" className="sign-btn" />

                            </div>
                        </form>
                    </div>
                    <SliderLogin />
                </div>
            </div>
        </main>
    )
}
export default Login