import React, { useEffect, useState } from "react";
import "./adherents.css";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
    Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const AdherentsFilterPc = () => {
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const fetchCitiesFromAPI = async () => {
    try {
      const response = await fetch(
        "https://parseapi.back4app.com/classes/List_of_Morroco_cities?keys=asciiname",
        {
          headers: {
            "X-Parse-Application-Id":
              "2ZOfB60kP39M5kE4WynRqyP7lNGKZ9MB8fVWqAM9",
            "X-Parse-Master-Key": "Qq7lEIoEEzRris3IM6POE5ewvYuzACVyA6VKtiVb",
          },
        }
      );
      const data = await response.json();
      const cityNames = data.results
        .map((city) => city.asciiname)
        .filter(Boolean);
      setCities(cityNames);
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    if (!selectedCities.includes(selectedCity)) {
      setSelectedCities([...selectedCities, selectedCity]);
    }
  };

  const handleDeleteCity = (cityToDelete) => {
    const updatedCities = selectedCities.filter(
      (city) => city !== cityToDelete
    );
    setSelectedCities(updatedCities);
  };

  useEffect(() => {
    fetchCitiesFromAPI();
  }, []);

  useEffect(() => {
    console.log(selectedCities);
  }, [selectedCities]);

  return (
    <div className="adherents-filrage-pc">
      <h4>Filtrage</h4>
      <div className="adherents-filter-pc-select">
        <FormControl fullWidth sx={{ marginTop: "15px", minWidth: 120 }}>
          <InputLabel
            id="demo-select-small-label"
            sx={{ backgroundColor: "white", padding: "1px 5px" }}
          >
            Secteur d'activité
          </InputLabel>
          <Select
            sx={{ borderRadius: "20px" }}
            labelId="demo-select-small-label"
            id="demo-select-small"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {/* {secteur?.map((item) => (
              <MenuItem key={item.id} value={item.id} className="first-letter">
              {item.lib}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>
      </div>
      <div className="adherents-filter-pc-select">
        {selectedCities
          ? selectedCities.map((item, index) => (
              <Chip
                sx={{
                  height: "55px",
                  marginTop: "15px",
                  marginRight: "7px",
                }}
                key={index}
                label={item}
                onDelete={() => handleDeleteCity(item)}
                variant="outlined"
              />
            ))
          : null}

        {/* <Chip
          sx={{
            height: "55px",
            marginTop: "15px",
            marginRight: "7px",
          }}
          label="test"
          onDelete={() => handleDeleteCity()}
          variant="outlined"
        /> */}

        <FormControl sx={{ marginTop: "15px", minWidth: 120 }}>
          <InputLabel id="demo-select-small-label">Ville</InputLabel>
          <Select
            sx={{ borderRadius: "20px" }}
            labelId="demo-select-small-label"
            id="demo-select-small"
            value=""
            label="Ville"
            onChange={(e) => handleCityChange(e)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cities?.map((item, index) => (
              <MenuItem key={index} value={item} className="first-letter">
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="submit-adherents-filter-pc">
        <Button
          variant="contained"
        //   size="small"
          endIcon={<FilterAltIcon />}
          sx={{
            borderRadius: "20px",
            color: "white",
            bgcolor: "#e86928",
            "&:hover": {
              bgcolor: "#d46025",
            },
          }}
        >
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default AdherentsFilterPc;
