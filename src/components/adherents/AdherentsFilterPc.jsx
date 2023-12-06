import React, { useEffect, useState } from "react";
import "./adherents.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import url from "../../app/api/url";

const AdherentsFilterPc = ({ onFilterChange }) => {
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedSecteur, setSelectedSecteur] = useState(null);
  const [secteur, setSecteur] = useState([]);
  const hasFilters = selectedCities.length > 0 || selectedSecteur !== null;

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

  const fetchSecteurs = async () => {
    try {
      const response = await fetch(url + "/api/public/secteur");
      const data = await response.json();
      const secteurs = data;
      //   console.log(secteurs);
      setSecteur(secteurs);
      // return data;
    } catch (error) {
      console.error("Error fetching secteurs:", error);
      return [];
    }
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    if (!selectedCities.includes(selectedCity)) {
      const updatedCities = [...selectedCities, selectedCity];
      setSelectedCities(updatedCities);
      //   onFilterChange(updatedCities);
    }
  };

  const handleDeleteCity = (cityToDelete) => {
    const updatedCities = selectedCities.filter(
      (city) => city !== cityToDelete
    );
    setSelectedCities(updatedCities);
    // onFilterChange(updatedCities);
  };

  const handleRemoveAllFilters = () => {
    setSelectedCities([]);
    setSelectedSecteur(null);
    onFilterChange([], null);
  };

  useEffect(() => {
    fetchCitiesFromAPI();
    fetchSecteurs();
  }, []);

  //   useEffect(() => {
  //     console.log(selectedCities);
  //   }, [selectedCities]);

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
            value={selectedSecteur}
            onChange={(event) => {
              const { value } = event.target;
              const selectedSecteurV = secteur.find(
                (item) => item.id === value
              );
              setSelectedSecteur(selectedSecteurV.id);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {secteur?.map((item) => (
              <MenuItem key={item.id} value={item.id} className="first-letter">
                {item.lib}
              </MenuItem>
            ))}
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
        <FormControl sx={{ marginTop: "15px", minWidth: 120 }}>
          <InputLabel id="demo-select-small-label">Ville</InputLabel>
          <Select
            sx={{ borderRadius: "20px" }}
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Ville"
            value={selectedCities}
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
        {hasFilters && (
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<DeleteIcon />}
            sx={{
              borderRadius: "20px",
              marginLeft: "10px",
            }}
            onClick={handleRemoveAllFilters}
          >
            Efface
          </Button>
        )}
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
          onClick={() => onFilterChange(selectedCities, selectedSecteur)}
        >
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default AdherentsFilterPc;
