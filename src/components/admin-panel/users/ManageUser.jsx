import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import GetCookie from "../../../cookies/JWT/GetCookie";
import {
  changeRoleByAdmin,
  deleteUserByAdmin,
  resetPasswordByAdmin,
} from "../../../app/api/userAxios";
import { toast } from "react-toastify";

const ManageUser = ({ open, handleclose, user, setRefetch, refetch }) => {
  const [changeRole, setChangeRole] = useState(false);
  const [changeRoleLoading, setChangeRoleLoading] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);
  const [newRole, setNewRole] = useState("");
  const token = GetCookie("jwt");

  const handleChangeRole = (newRole) => {
    setChangeRoleLoading(true);

    try {
      changeRoleByAdmin(user?.id, newRole, token)
        .then((data) => {
          if (data.message === "success") {
            setChangeRoleLoading(false);
            toast.success("Le rôle a été bien modifier !", {
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
          }
        })
        .catch((error) => {
          console.log(error);
          setChangeRoleLoading(false);
          toast.error("Une erreur s'est produite, Veuillez réessayer.");
        });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite, Veuillez réessayer.");
      setChangeRoleLoading(false);
    }
  };

  const handleCancelChangeRole = () => {
    setChangeRoleLoading(false);
    setChangeRole(false);
    setNewRole("");
  };

  const handleResetPassword = () => {
    setResetPasswordLoading(true);
    try {
      resetPasswordByAdmin(user?.id, token)
        .then((data) => {
          if (data.message === "success") {
            setResetPasswordLoading(false);
            toast.success("Le mot de passe a été bien riensialiser !", {
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
          }
        })
        .catch((error) => {
          console.log(error);
          setResetPasswordLoading(false);
          toast.error("Une erreur s'est produite, Veuillez réessayer.");
        });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite, Veuillez réessayer.");
      setResetPasswordLoading(false);
    }
  };

  const handleDelete = () => {
    setDeleteUserLoading(true);
    try {
      deleteUserByAdmin(user?.id, token)
        .then((data) => {
          if (data.message === "success") {
            setDeleteUserLoading(false);
            toast.success("Le rôle a été bien supprimer !", {
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
          }
        })
        .catch((error) => {
          console.log(error);
          setDeleteUserLoading(false);
          toast.error("Une erreur s'est produite, Veuillez réessayer.");
        });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite, Veuillez réessayer.");
      setDeleteUserLoading(false);
    }
  };

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
        Gérer l'utilisateur{" "}
        <span className="first-letter">
          {user?.prenom} {user?.nom}
        </span>
      </DialogTitle>
      <DialogContent>
        <div style={{ margin: "0 1rem" }}>
          <p>Prénom : {user?.prenom}</p>
          <p>Nom : {user?.nom}</p>
          <p>Email : {user?.email}</p>
          <div style={{ display: "flex" }}>
            <p>
              Rôle :{" "}
              {user.role === "user"
                ? "Utilisateur"
                : user.role === "admin"
                ? "Admin"
                : user.role === "adherent"
                ? "Adhérent"
                : ""}
            </p>
            <div>
              {!changeRole && (
                <IconButton
                  onClick={() => setChangeRole(true)}
                  aria-label="edit"
                  sx={{ ml: 2 }}
                  size="small"
                >
                  <EditIcon fontSize="small" color="success" />
                </IconButton>
              )}
            </div>
          </div>
        </div>
        {changeRole && <Divider />}
        {changeRole && (
          <div style={{ display: "flex", flexDirection: "column", m: 1 }}>
            <div>
              <span className="span-change-role">Changement du statut d'</span>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" disabled>
                <Select
                  size="small"
                  fullWidth
                  sx={{ borderRadius: "20px", maxHeight: 40 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  color="warning"
                  value={user.role}
                >
                  <MenuItem
                    value="user"
                    disabled={user.role === "user" ? true : false}
                  >
                    Utilisateur
                  </MenuItem>
                  <MenuItem
                    value="adherent"
                    disabled={user.role === "adherent" ? true : false}
                  >
                    Adhérent
                  </MenuItem>
                  <MenuItem
                    value="admin"
                    disabled={user.role === "admin" ? true : false}
                  >
                    Admin
                  </MenuItem>
                </Select>
              </FormControl>

              <span className="span-change-role">à</span>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  size="small"
                  fullWidth
                  sx={{ borderRadius: "20px", maxHeight: 40 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  color="warning"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    -selectionez-
                  </MenuItem>
                  <MenuItem
                    value="user"
                    disabled={user.role === "user" ? true : false}
                  >
                    Utilisateur
                  </MenuItem>
                  <MenuItem
                    value="adherent"
                    disabled={user.role === "adherent" ? true : false}
                  >
                    Adhérent
                  </MenuItem>
                  <MenuItem
                    value="admin"
                    disabled={user.role === "admin" ? true : false}
                  >
                    Admin
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <ButtonGroup
              sx={{ m: "1rem auto" }}
              aria-label="outlined button group"
              size="small"
            >
              <Button
                sx={{ borderRadius: "20px 0 0 20px" }}
                variant="outlined"
                color="error"
                onClick={() => handleCancelChangeRole()}
                endIcon={<CloseIcon />}
              >
                Annuler
              </Button>
              <LoadingButton
                sx={{ borderRadius: "0 20px  20px 0" }}
                variant="contained"
                endIcon={<SaveIcon />}
                color="success"
                onClick={() => handleChangeRole(newRole)}
                loading={changeRoleLoading}
                loadingPosition="end"
                disabled={!newRole}
              >
                Enregistrer
              </LoadingButton>
            </ButtonGroup>
          </div>
        )}
        {!changeRole && (
          <>
            <Divider />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LoadingButton
                color="secondary"
                variant="contained"
                sx={{ borderRadius: "20px", mt: 2, mb: 2 }}
                onClick={handleResetPassword}
                endIcon={<LockResetIcon />}
                loadingPosition="end"
                loading={resetPasswordLoading}
                size="small"
              >
                Réinitialiser le mot de passe
              </LoadingButton>
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LoadingButton
                sx={{ borderRadius: "20px", mt: 2 }}
                color="error"
                variant="contained"
                endIcon={<PersonRemoveIcon />}
                onClick={handleDelete}
                loadingPosition="end"
                loading={deleteUserLoading}
                size="small"
              >
                Supprimer l'utilisateur
              </LoadingButton>
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          color="warning"
          sx={{
            borderRadius: "20px",
          }}
          variant="outlined"
          onClick={() => handleclose()}
          size="small"
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageUser;
