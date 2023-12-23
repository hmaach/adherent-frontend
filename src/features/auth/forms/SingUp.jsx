import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import TermsAlert from "../TermsAlert";
import { toast } from "react-toastify";
import { register } from "../../../app/api/userAxios";

const SingUp = ({ handleToggleClick, login }) => {
  // Form fields
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //----------
  const [showPassword, setShowPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  // Error states
  const [nomError, setNomError] = useState(null);
  const [prenomError, setPrenomError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);

  // Loading state

  const handleToggleClickCallback = () => {
    handleToggleClick();
    setLoading(false);
    setNomError(null);
    setPrenomError(null);
    setEmailError(null);
    setPasswordError(null);
    setPasswordConfirmError(null);
    setShowPassword(false);
    setShowPasswordConfirm(false);
    setNom("");
    setPrenom("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setAgreed(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setAgreed(false);
  };

  const handleAgreeDialog = () => {
    setAgreed(true);
    setShowDialog(false);
  };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
    setAgreed(event.target.checked);
  };

  const validateForm = () => {
    let isValid = true;

    if (!nom.trim()) {
      setNomError("Le nom est requis");
      isValid = false;
    } else {
      setNomError(null);
    }

    if (!prenom.trim()) {
      setPrenomError("Le prénom est requis");
      isValid = false;
    } else {
      setPrenomError(null);
    }

    if (!email.trim()) {
      setEmailError("L'email est requis");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Veuillez entrer une adresse email valide");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (password.length < 8) {
      setPasswordError("doit contenir au moins 8 caractères");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError("Les mots de passe ne correspondent pas");
      isValid = false;
    } else {
      setPasswordConfirmError(null);
    }

    return isValid;
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleClickSinscrire = () => {
    if (validateForm()) {
      if (agreed) {
        setLoading(true);

        try {
          register({
            nom: nom,
            prenom: prenom,
            email: email,
            password: password,
            password_confirmation: passwordConfirm,
            acceptTerms: agreed,
          })
            .then((data) => {
              if (data.message === "success") {
                // console.log("success");
                setEmail(data.user.email);
                setLoading(false);
                toast.success("Félicitations pour votre inscription!", {
                  position: "top-center",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                login(email, password);
                setNom("");
                setPrenom("");
                setEmail("");
                setPassword("");
                setPasswordConfirm("");
                setShowPassword(false);
                setShowDialog(false);
                setLoading(false);
                setAgreed(false);
                setShowPasswordConfirm(false);
                setNomError(null);
                setPrenomError(null);
                setEmailError(null);
                setPasswordError(null);
                setPasswordConfirmError(null);
              } else if (data.response.data.errors) {
                setLoading(false);
                const errors = data?.response?.data?.errors;
                errors.forEach((error) => {
                  if (error?.field === "nom") {
                    setNomError(error?.message);
                  } else if (error?.field === "prenom") {
                    setPrenomError(error?.message);
                  } else if (error?.field === "email") {
                    setEmailError(error?.message);
                  } else if (error?.field === "password") {
                    setPasswordError(error?.message);
                    setPasswordConfirm("");
                  }
                });
                console.log(errors);
              }
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
              toast.error(
                "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
              );
            });
        } catch (error) {
          console.error(error);
          toast.error(
            "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
          );
          setLoading(false);
        }
      } else {
        toast.error(
          "Veuillez accepter les Conditions d'utilisation et la Politique de confidentialité !"
        );
        return;
      }
    }
  };

  return (
    <form action="index.html" autoComplete="off" className="sign-up-form">
      <div className="heading">
        <h3 style={{ textAlign: "center", fontWeight: "bolder" }}>
          S'inscrire
        </h3>
        <div className="singup">
          <span>Vous avez déjà un compte ?</span>
          <Button size="small" onClick={handleToggleClickCallback}>
            Se connecter
          </Button>
        </div>
      </div>

      <div className="actual-form iscrire-form">
        <div className="input-wrap">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <FormControl sx={{ m: 1, mt: 0 }} variant="standard" fullWidth>
              <InputLabel
                // {...(nomError && { error: true })}
                htmlFor="standard-adornment-nom"
              >
                Nom
              </InputLabel>
              <Input
                {...(nomError && { error: true })}
                id="standard-adornment-nom"
                fullWidth
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              {nomError && (
                <FormHelperText error id="component-error-text">
                  {nomError}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </div>
        <div className="input-wrap">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
              <InputLabel
                // {...(prenomError && { error: true })}
                htmlFor="standard-adornment-email-prenom"
              >
                Prénom
              </InputLabel>
              <Input
                {...(prenomError && { error: true })}
                id="standard-adornment-email-prenom"
                fullWidth
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              {prenomError && (
                <FormHelperText error id="component-error-text">
                  {prenomError}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </div>
        <div className="input-wrap">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
              <InputLabel
                // {...(emailError && { error: true })}
                htmlFor="standard-adornment-email-singup"
              >
                Email
              </InputLabel>
              <Input
                {...(emailError && { error: true })}
                id="standard-adornment-email-singup"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <FormHelperText error id="component-error-text">
                  {emailError}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </div>
        <div className="input-wrap">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <FormControl sx={{ m: 1 }} fullWidth variant="standard">
              <InputLabel
                // {...(passwordError && { error: true })}
                htmlFor="standard-adornment-password-singup"
              >
                Mot de passe
              </InputLabel>
              <Input
                {...(passwordError && { error: true })}
                id="standard-adornment-password-singup"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordError && (
                <FormHelperText error id="component-error-text">
                  {passwordError}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </div>
        <div className="input-wrap">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <FormControl sx={{ m: 1 }} fullWidth variant="standard">
              <InputLabel
                // {...(passwordConfirmError && { error: true })}
                htmlFor="standard-adornment-password-singup-confirm"
              >
                Confirmer le mot de passe
              </InputLabel>
              <Input
                {...(passwordConfirmError && { error: true })}
                id="standard-adornment-password-singup-confirm"
                type={showPasswordConfirm ? "text" : "password"}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPasswordConfirm}
                    >
                      {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordConfirmError && (
                <FormHelperText error id="component-error-text">
                  {passwordConfirmError}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </div>
        <FormControlLabel
          sx={{
            marginTop: 2,
          }}
          control={
            <Checkbox checked={agreed} onChange={handleCheckboxChange} />
          }
          label={
            <p className="text" style={{ marginBottom: 0 }}>
              J'accepte les Conditions d'utilisation et la Politique de
              confidentialité !
            </p>
          }
        />
        <div className="div-connexion-btn">
          <LoadingButton
            className="connexion-btn"
            variant="contained"
            size="small"
            loadingPosition="end"
            loading={loading}
            endIcon={<PersonAddIcon />}
            onClick={handleClickSinscrire}
          >
            <span>S'inscrire</span>
          </LoadingButton>
        </div>
      </div>
      {showDialog && (
        <TermsAlert
          open={true}
          handleClose={handleCloseDialog}
          handleAgreeDialog={handleAgreeDialog}
        />
      )}
    </form>
  );
};

export default SingUp;
