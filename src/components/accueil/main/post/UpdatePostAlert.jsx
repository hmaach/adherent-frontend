import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import GetCookie from "../../../../cookies/JWT/GetCookie";
import { useDispatch } from "react-redux";


const UpdatePostAlert = (props) => {

  const { post, open, handleClose, onSubmit, filieres } = props;
  const [updatedPost, setUpdatedPost] = useState(post);
  const [err, setErr] = useState();
  const [audience, setAudience] = useState(post.audience);
  const [filiere_id, setFiliere] = useState('');
  const token = GetCookie("jwt");
  const dispatch = useDispatch()

  const handleChangeAudience = (event) => {
    setAudience(event.target.value);
    setUpdatedPost({ ...updatedPost, audience: event.target.value });
  };

  const handleChangeFiliere = (event) => {
    setFiliere(event.target.value);
    setUpdatedPost({ ...updatedPost, filiere_id: event.target.value });
  };

  const handlePostTypeChange = (event) => {
    setUpdatedPost({ ...updatedPost, type: event.target.value });
  };

  const handlePostLibelleChange = (event) => {
    setUpdatedPost({ ...updatedPost, libelle: event.target.value });
  };

  const handleUpdatePost = () => {
    onSubmit(updatedPost);
    // console.log(updatedPost);
    handleClose()
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Modifier Votre Poste"}</DialogTitle>
      <DialogContent>
        <form className="wrapper">
          <div className='filtrage_audience'>
            <FormControl sx={{ m: 0, minWidth: 130, }}>
              <InputLabel id="demo-simple-select-autowidth-label " sx={{ fontSize: '17px', marginTop: '-11px' }}>Audience</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={audience}
                onChange={handleChangeAudience}
                autoWidth
                required
                label="Audience"
                sx={{ height: '34px', borderRadius: '20px' }}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="etablissement">Etablissement</MenuItem>
                <MenuItem value="filiere">Filière</MenuItem>
                <MenuItem value="formateurs">Formateurs</MenuItem>
              </Select>
            </FormControl>
            {audience === "groupe" || audience === "filiere" ?
              <FormControl sx={{ m: 0, minWidth: 100, }}>
                <InputLabel id="demo-simple-select-autowidth-label " sx={{ fontSize: '17px', marginTop: '-11px' }}>Filière</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={filiere_id}
                  onChange={handleChangeFiliere}
                  autoWidth
                  required
                  label="Filière"
                  sx={{ height: '34px', borderRadius: '20px' }}
                >
                  {filieres &&
                    filieres.map(filiere => {
                      return (<MenuItem key={filiere.id} value={filiere.id}>{filiere.libelle}</MenuItem>)
                    })
                  }
                </Select>
              </FormControl>
              : null
            }
          </div>
          <textarea
            className="input-box"
            onChange={handlePostLibelleChange}
            defaultValue={post.libelle}
          >
          </textarea>
          <div className="bottom">
            <ul className="icons">
              <li>
                <FormControl sx={{ m: 0, minWidth: 153 }}>
                  <InputLabel
                    id="demo-simple-select-autowidth-label"
                    sx={{ fontSize: "17px", marginTop: "-11px" }}
                  >
                    Type de poste
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    autoWidth
                    label="Type de poste"
                    value={updatedPost.type}
                    sx={{ height: "34px", borderRadius: "20px" }}
                    required
                    onChange={handlePostTypeChange}
                  >
                    <MenuItem value="announce">Announce</MenuItem>
                    <MenuItem value="cour">Cour</MenuItem>
                    <MenuItem value="exercice">Exercice</MenuItem>
                  </Select>
                </FormControl>
              </li>
            </ul>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleUpdatePost}>Modifier</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePostAlert;
