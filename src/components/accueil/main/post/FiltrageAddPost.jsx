import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function FiltrageAddPost() {
  const [audience, setAudience] = useState('');
  const [filiere, setFiliere] = useState('');
  const [groupe, setGroupe] = useState('');

  const handleChangeAudience = (event) => {
    setAudience(event.target.value);
  };
  const handleChangeFiliere = (event) => {
    setFiliere(event.target.value);
  };
  const handleChangeGroupe = (event) => {
    setGroupe(event.target.value);
  };

  return (
    <div className='filtrage_audience'>
      <FormControl sx={{ m: 0, minWidth: 130, }}>
        <InputLabel id="demo-simple-select-autowidth-label " sx={{ fontSize: '17px', marginTop: '-11px' }}>Audience</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={audience}
          onChange={handleChangeAudience}
          autoWidth
          label="Adudience"
          sx={{ height: '34px',borderRadius: '20px' }}
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="etablissement">Etablissement</MenuItem>
          <MenuItem value="filière">Filière</MenuItem>
          <MenuItem value="groupe">Groupe</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 0, minWidth: 100, }}>
        <InputLabel id="demo-simple-select-autowidth-label " sx={{ fontSize: '17px', marginTop: '-11px' }}>Filière</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={filiere}
          onChange={handleChangeFiliere}
          autoWidth
          label="Filière"
          sx={{ height: '34px',borderRadius: '20px' }}
        >
          <MenuItem value="public">Développement digital</MenuItem>
          <MenuItem value="etablissement">Développement digital</MenuItem>
          <MenuItem value="filière">Développement digital</MenuItem>
          <MenuItem value="groupe">Développement digital</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 0, minWidth: 120, }}>
        <InputLabel id="demo-simple-select-autowidth-label " sx={{ fontSize: '17px', marginTop: '-11px' }}>Groupe</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={groupe}
          onChange={handleChangeGroupe}
          autoWidth
          label="Groupe"
          sx={{ height: '34px',borderRadius: '20px' }}
        >
          <MenuItem value="public">DEV201</MenuItem>
          <MenuItem value="etablissement">DEV201</MenuItem>
          <MenuItem value="filière">DEV201</MenuItem>
          <MenuItem value="groupe">DEV201</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}