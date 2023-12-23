import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import GetCookie from "../../../cookies/JWT/GetCookie";
import { registerByAdmin } from "../../../app/api/userAxios";

const AddUser = ({ open, handleclose, refetch, setRefetch }) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [defaultPasword, setDefaultPasword] = useState(true);

  //----------
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  // Error states
  const [nomError, setNomError] = useState(null);
  const [prenomError, setPrenomError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);

  const token = GetCookie("jwt");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };

  const handleDefaultPassword = (e) => {
    if (e.target.value === "true") {
      setDefaultPasword(true);
    } else {
      setDefaultPasword(false);
    }
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
    if (!defaultPasword) {
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
    } else {
      return true;
    }

    return isValid;
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleClickSinscrire = () => {
    if (validateForm()) {
      setLoading(true);

      try {
        registerByAdmin(
          {
            nom: nom,
            prenom: prenom,
            email: email,
            role: role,
            defaultPasword: defaultPasword,
            password: password,
            password_confirmation: passwordConfirm,
          },
          token
        )
          .then((data) => {
            if (data.message === "success") {
              setEmail(data.user.email);
              setLoading(false);
              toast.success("L'utilisateur a été bien ajouter !", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              handleclose();
              setRefetch(!refetch);
              setNom("");
              setPrenom("");
              setEmail("");
              setPassword("");
              setPasswordConfirm("");
              setShowPassword(false);
              setLoading(false);
              setShowPasswordConfirm(false);
              setNomError(null);
              setPrenomError(null);
              setEmailError(null);
              setPasswordError(null);
              setPasswordConfirmError(null);
            } else if (data.response.data.errors) {
              setLoading(false);
              const errors = data?.response?.data?.errors;
              console.log(errors);
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
            if (error.response.data.errors) {
              setLoading(false);
              const errors = error?.response?.data?.errors;
              console.log(errors);
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
            } else {
              toast.error(
                "Une 333erreur s'est produite lors de l'inscription. Veuillez réessayer."
              );
            }
          });
      } catch (error) {
        console.error(error);
        toast.error(
          "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
        );
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setPassword("");
    setPasswordConfirm("");
    setShowPassword(false);
    setPasswordError(null);
    setPasswordConfirmError(null);
  }, [defaultPasword]);

  return (
    <Dialog
      open={open}
      onClose={handleclose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ minWidth: 500, margin: "auto" }}
        id="alert-dialog-title"
      >
        Ajouter un utilisateur
      </DialogTitle>
      <DialogContent>
        <div className="actual-form iscrire-form">
          <div className="input-wrap">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <FormControl sx={{ m: 1, mt: 0 }} variant="standard" fullWidth>
                <InputLabel
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
          <FormControl variant="standard" sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-standard-label">Rôle</InputLabel>
            <Select
              fullWidth
              sx={{ maxHeight: 40 }}
              label="Role"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="user">Utilisateurs</MenuItem>
              <MenuItem value="adherent">Adhérents</MenuItem>
              <MenuItem value="admin">Admins</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, mt: 0, mb: 0 }}>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleDefaultPassword}
              value={defaultPasword}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Mot de passe par défaut (12...89)"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Saisir le mot de passe"
              />
            </RadioGroup>
          </FormControl>
          {!defaultPasword && (
            <>
              <div className="input-wrap">
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <FormControl
                    sx={{ m: 1, mt: 0 }}
                    fullWidth
                    variant="standard"
                  >
                    <InputLabel
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
                            {showPasswordConfirm ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
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
            </>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          color="warning"
          sx={{
            borderRadius: "20px",
          }}
          variant="outlined"
          onClick={() => handleclose()}
        >
          Annuler
        </Button>
        <LoadingButton
          color="warning"
          size="small"
          loadingPosition="end"
          loading={loading}
          sx={{
            borderRadius: "20px",
          }}
          variant="contained"
          endIcon={<PersonAddIcon />}
          autoFocus
          onClick={handleClickSinscrire}
        >
          <span>Ajouter</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;
