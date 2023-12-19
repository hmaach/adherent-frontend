import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import EditIcon from "@mui/icons-material/Edit";

const Form = ({
  open,
  handleCancel,
  type,
  selectedRow,
  handleAdd,
  handleUpdate,
}) => {
  const [libelle, setLibelle] = useState(
    type === "update" && selectedRow ? selectedRow?.lib : ""
  );

  const handleLibelleChange = (event) => {
    setLibelle(event.target.value);
  };

  const handleButtonClick = () => {
    if (type === "add") {
      handleAdd({ lib: libelle });
    } else if (type === "update" && selectedRow) {
      handleUpdate(selectedRow.id, { lib: libelle });
    }
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
      sx={{ minWidth: "70%" }}
    >
      <DialogTitle sx={{ minWidth: "500px" }}>
        {type === "add"
          ? "Ajouter un secteur d'activité"
          : `Mise à jour le secteur d'activité ${
              selectedRow ? `avec l'ID ${selectedRow.id}` : ""
            }`}
      </DialogTitle>
      <DialogContent sx={{ margin: "10px 5px" }}>
        <div>
          <TextField
            sx={{ margin: "5px 0" }}
            fullWidth
            id="outlined-textarea"
            label="Libelle"
            placeholder="Ex: Développement Full-Stack"
            multiline
            rows={3}
            value={libelle}
            onChange={handleLibelleChange}
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={handleButtonClick}
          component="label"
          sx={{
            borderRadius: "20px",
            color: "white",
            bgcolor: "#e86928",
            "&:hover": {
              bgcolor: "#d46025",
            },
          }}
          variant="contained"
          endIcon={type === "add" ? <PostAddIcon /> : <EditIcon />}
        >
          {type === "add" ? "Ajouter" : "Modifier"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Form;
