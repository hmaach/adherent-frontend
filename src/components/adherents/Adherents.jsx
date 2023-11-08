import React, { useState } from "react";
import "./adherents.css";
import AdherentsFilterPc from "./AdherentsFilterPc";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Rating,
  Select,
  TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Adherents = () => {
  const [activeButton, setActiveButton] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [adherents, setAdherents] = useState([
    {
      id: 2345,
      user_id: 6,
      profession: "Développeur web",
      ville: "Berkane",
      img: "no-img.jpg",
      rating: 4.3,
    },
    {
      id: 23454,
      user_id: 6,
      profession: "Développeur web",
      ville: "Berkane",
      img: "no-img.jpg",
      rating: 4.3,
    },
    {
      id: 25345,
      user_id: 6,
      profession: "Développeur web",
      ville: "Berkane",
      img: "no-img.jpg",
      rating: 4.3,
    },
    {
      id: 22345,
      user_id: 6,
      profession: "Développeur web",
      ville: "Berkane",
      img: "no-img.jpg",
      rating: 4.3,
    },
    {
      id: 23345,
      user_id: 6,
      profession: "Développeur web",
      ville: "Berkane",
      img: "no-img.jpg",
      rating: 4.3,
    },
    {
      id: 23145,
      user_id: 6,
      profession: "Développeur web",
      ville: "Berkane",
      img: "no-img.jpg",
      rating: 4.3,
    },
    {
      id: 23405,
      user_id: 6,
      profession: "Développeur web",
      ville: "Berkane",
      img: "no-img.jpg",
      rating: 4.3,
    },
  ]);

  return (
    <div className="adherents">
      <div className="adherents-list">
        <div className="adherents-list-header">
          <div className="">
            <FormControl>
              <InputLabel id="demo-simple-select-standard-label">
                Trier
              </InputLabel>
              <Select
              sx={{borderRadius:"20px"}}
                className="adherents-sorting"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value={age}
                // onChange={handleChange}
                label="Trier"
              >
                <MenuItem value="default">
                  <em>Par défaut</em>
                </MenuItem>
                <MenuItem value={10}>Note</MenuItem>
                <MenuItem value={30}>Plus récent</MenuItem>
                <MenuItem value={20}>Plus ancien</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            className=""
            //   value={searchValue}
            //   onChange={handleSearch}
            size="small"
            id="outlined-search"
            label="Chercher Adhérent, Profession..."
            type="search"
            InputProps={{
              style: { borderRadius: "20px" },
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              color: "#1DA1F2",
              minWidth: "400px",
            }}
          />
        </div>
        {adherents?.map((item) => (
          <Link
            to={`/profil/${item.user_id}`}
            key={item.id}
            className="custom-link-style adherents-item"
          >
            <div className="adherent-img-info">
              <img src={item.img} className="adherent-img" alt="" />
              <div className="adherents-info">
                <span className="adherent-id">{item.id}</span>
                <span className="adherent-profession">
                  <WorkIcon sx={{ fontSize: 14 }} /> {item.profession}
                </span>
                <span className="adherent-ville">
                  <LocationOnIcon sx={{ fontSize: 14 }} /> {item.ville}
                </span>
              </div>
            </div>
            <div style={{ display: "flex" }} className="rating-adherent">
              <Rating
                name="text-feedback"
                value={item.rating}
                readOnly
                size="small"
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box sx={{ ml: 2, color: "gold", fontSize: "0.8rem" }}>
                {item.rating}
              </Box>
            </div>
          </Link>
        ))}
      </div>
      <AdherentsFilterPc />
      <div className="adherents-pagination">
        <Pagination count={10} />
      </div>
    </div>
  );
};

export default Adherents;
