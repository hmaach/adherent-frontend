import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import PasswordIcon from "@mui/icons-material/Password";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Logo from "../../../components/navBar/Logo";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../authApiSlice";
import SetCookie from "../../../cookies/JWT/SetCookie";
import { setCredentials } from "../authSlice";
const { localStorage } = window;

const SingIn = ({ handleToggleClick, firstLogin, loginData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [emailErrorLogin, setEmailErrorLogin] = useState(null);
  const [passwordErrorLogin, setPasswordErrorLogin] = useState(null);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleToggleClickCallback = () => {
    handleToggleClick();
    setLoginLoading(false);
    setShowLoginPassword(false);
    setEmailErrorLogin(null);
    setPasswordErrorLogin(null);
  };

  const handleClickShowPasswordLogin = () =>
    setShowLoginPassword((show) => !show);

  const handleMouseDownPasswordLogin = (event) => {
    event.preventDefault();
  };

  const handleClickConnexion = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setEmailErrorLogin(null);
    setPasswordErrorLogin(null);
    setShowLoginPassword(false);

    try {
      const userData = await login({ email, password }).unwrap();
      if (userData.user && userData.token) {
        dispatch(setCredentials(userData));
        SetCookie("jwt", userData.token);
        localStorage.setItem("credentials", JSON.stringify(userData));
        localStorage.setItem("token", JSON.stringify(userData.token));
      }
      setEmail("");
      setPassword("");
      navigate("/accueil");
    } catch (err) {
      console.log(err);
      if (err.data.error === "email") {
        setPassword("");
        setEmailErrorLogin(err.data.message);
      } else if (err.data.error === "password") {
        setPassword("");
        setPasswordErrorLogin(err.data.message);
      }
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    if (firstLogin) {
      setEmail(loginData.email);
      setPassword(loginData.password);
    }
  }, [firstLogin, loginData]);

  return (
    <form action="index.html" autoComplete="off" className="sign-in-form">
      <div className="logo">
        <Logo />
      </div>
      <div className="divHeading">
        <div className="heading">
          <h2 style={{ textAlign: "center" }}>Connexion</h2>
          <div className="singup">
            <span>Vous n'avez pas encore de compte ?</span>
            <Button size="small" onClick={handleToggleClickCallback}>
              S'inscrire
            </Button>
          </div>
        </div>
      </div>

      <div className="actual-form connexion-form">
        <div className="input-wrap">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <div style={{ marginBottom: emailErrorLogin ? "1.6rem" : "" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            </div>
            <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
              <InputLabel
                {...(emailErrorLogin && { error: true })}
                htmlFor="standard-adornment-email"
              >
                Email
              </InputLabel>
              <Input
                {...(emailErrorLogin && { error: true })}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErrorLogin(null);
                }}
                value={email}
                id="standard-adornment-email"
                fullWidth
                autoComplete="username"
              />
              {emailErrorLogin && (
                <FormHelperText error id="component-error-text">
                  {emailErrorLogin}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </div>

        <div className="input-wrap">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <div
              style={{
                marginBottom: passwordErrorLogin ? "1.6rem" : "",
              }}
            >
              <PasswordIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            </div>
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel
                {...(passwordErrorLogin && { error: true })}
                htmlFor="standard-adornment-password"
              >
                Mot de passe
              </InputLabel>
              <Input
                {...(passwordErrorLogin && { error: true })}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordErrorLogin(null);
                }}
                id="standard-adornment-password"
                type={showLoginPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordLogin}
                      onMouseDown={handleMouseDownPasswordLogin}
                    >
                      {showLoginPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="current-password"
              />
              {passwordErrorLogin && (
                <FormHelperText error id="component-error-text">
                  {passwordErrorLogin}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </div>
        <div className="div-connexion-btn">
          <LoadingButton
            // className="connexion-btn"
            className={
              email === "" || password === ""
                ? "connexion-btn-disabled"
                : "connexion-btn"
            }
            type="submit"
            variant="contained"
            size="small"
            {...(email === "" || password === "" ? { disabled: true } : "")}
            loadingPosition="end"
            loading={loginLoading}
            endIcon={<PersonIcon />}
            onClick={handleClickConnexion}
          >
            <span>Connexion</span>
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};

export default SingIn;
