import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GetCookie from '../../cookies/JWT/GetCookie';
import { selectCurrentUser, setCredentials } from '../../features/auth/authSlice';
import { changePassword } from '../../app/api/stagiaireAxios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import './profile.css';
import { Avatar } from '@mui/material'




const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 120, // Increase the width
      height: 120, // Increase the height
      borderRadius: '50%',
      margin: 'auto', // Add margin: auto to center horizontally and vertically
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};

const useStyles = styled((theme) => ({


  card: {
    maxWidth: 600,
    margin: '0 auto',
  },
  avatarImage: {
    width: 120, // Increase the width
    height: 120, // Increase the height
    borderRadius: '50%',
    zIndex: 1,
    margin: 'auto', // Add margin: auto to center horizontally and vertically
  },

  editButton: {
    height: 36,
    overflow: 'visible',
  },
  cardContent: {
    backgroundColor: '#f8f9fa',
    padding: theme.spacing(2),
  },
  cardText: {
    marginBottom: theme.spacing(0.5),
  },
  aboutContainer: {
    backgroundColor: '#f8f9fa',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  recentPhotosContainer: {
    marginBottom: theme.spacing(1),
  },

  formContainer: {
    marginBottom: theme.spacing(2),
  },
  formInput: {
    marginBottom: theme.spacing(2),
  },
  formButton: {
    marginRight: theme.spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const token = GetCookie('jwt');

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State for the confirmation dialog

  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(
        setCredentials({
          user: storedUser,
          token: localStorage.getItem('token'),
        })
      );
    }
  }, [dispatch]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');

    try {
      if (currentPassword === '') {
        setCurrentPasswordError('Please enter the current password');
        return;
      }
      if (newPassword === '') {
        setNewPasswordError('Please enter a new password');
        return;
      }
      if (newPassword !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        return;
      }

      setDialogOpen(true); // Open the confirmation dialog
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { errors } = error.response.data;
        if (errors.currentPassword) {
          setCurrentPasswordError(errors.currentPassword);
        }
        if (errors.newPassword) {
          setNewPasswordError(errors.newPassword);
        }
      }
    }
  };

  const handleConfirmationDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmationDialogConfirm = async () => {
    try {
      const response = await dispatch(changePassword(currentPassword, newPassword, token));

      if (response.status === 200) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setFormVisible(false);
        setDialogOpen(false);
      } else {
        setCurrentPasswordError('Current password is incorrect');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    const { nom, prenom, email, tel, role } = user;


    return (
      <div className="profile-container">
        <Container>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={9} md={7} lg={6} xl={7}>
              <Card className={classes.card}>
                <CardMedia className="card-media" component="div">
                  <CardContent className={classes.cardContent}>
                    {user.profile ? (
                      <img id="person" src="ayadi.jpeg" alt="profile" />
                    ) : (
                      <Avatar className={classes.avatarImage} {...stringAvatar(`${prenom} ${nom}`)} />
                    )}
                  </CardContent>

                </CardMedia>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h5">{`${prenom} ${nom}`}</Typography>
                  <Typography variant="body2" className={classes.cardText}>
                    {role}
                  </Typography>
                </CardContent>
                <CardContent className={classes.cardContent}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="body2" className={classes.cardText}>
                        Email
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className={classes.cardText}>
                        {email}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" className={classes.cardText}>
                        Numéro de téléphone
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className={classes.cardText}>
                        {tel}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" className={classes.cardText}>
                        Modifier Mot de Passe
                      </Typography>
                      <Button variant="outlined" onClick={handlePasswordVisibility}>Modifier</Button >
                    </Grid>


                  </Grid>
                </CardContent>
                <CardContent className={classes.cardContent}>
                  <Dialog open={dialogOpen} onClose={handleConfirmationDialogClose}>
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogContent>
                      Êtes-vous sûr de vouloir changer votre mot de passe ?
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleConfirmationDialogClose} color="primary">
                        Non
                      </Button>
                      <Button onClick={handleConfirmationDialogConfirm} color="primary">
                        Oui
                      </Button>
                    </DialogActions>
                  </Dialog>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  } else {
    return null;
  }
};

export default Profile;
