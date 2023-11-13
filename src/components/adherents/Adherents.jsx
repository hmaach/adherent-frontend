import React, { useEffect, useState } from "react";
import "./adherents.css";
import AdherentsFilterPc from "./AdherentsFilterPc";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Rating,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { debounce } from "lodash";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import GetCookie from "../../cookies/JWT/GetCookie";
import { getAdherents } from "../../app/api/adherentAxios";
import AdherentsFilterPhone from "./AdherentsFilterPhone";

const Adherents = () => {
  const [query, setQuery] = useState({
    sort: "default",
    cities: [],
    secteur_id: "",
  });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = GetCookie("jwt");
  const [adherents, setAdherents] = useState([]);
  const skeleton = [1, 2, 3, 4, 5, 6];
  const [loading, setLoading] = useState(true);
  const [selectedCities, setSelectedCities] = useState([]);
  const [showFilterAlert, setShowFilterAlert] = useState(false);

  const fetchData = async () => {
    try {
      getAdherents(search, query, token);
      getAdherents({
        search: search,
        sort: query.sort,
        cities: query.cities,
        secteur_id: query.secteur_id,
        // token: token,
      })
        .then((data) => {
          if (data) {
            setAdherents(data.data);
            setTotalPages(data.last_page);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowFilterAlert(false);
  };

  const handleSort = (event) => {
    setQuery({ ...query, sort: event.target.value });
  };

  const handleFilterChange = (cities, secteur) => {
    setQuery({ ...query, cities: cities, secteur_id: secteur });
    // setSelectedCities(cities);
  };

  const debouncedFetchData = debounce(() => {
    setLoading(true);
    fetchData();
  }, 3000);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    debouncedFetchData();
  };

  useEffect(() => {
    const fetchWithDebounce = async () => {
      debouncedFetchData();
    };

    const cleanup = () => {
      debouncedFetchData.cancel();
    };

    fetchWithDebounce();

    return cleanup;
  }, [search]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [currentPage, query]);

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
                sx={{ borderRadius: "20px" }}
                className="adherents-sorting"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={query.sort}
                onChange={handleSort}
                label="Trier"
              >
                <MenuItem value="default" selected>
                  <em>Par défaut</em>
                </MenuItem>
                <MenuItem value="rating">Note</MenuItem>
                <MenuItem value="recent">Plus récent</MenuItem>
                <MenuItem value="ancien">Plus ancien</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            className=""
            value={search}
            onChange={handleSearchChange}
            size="small"
            id="outlined-search"
            label="Chercher..."
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
              minWidth: "100px",
            }}
          />
          <div className="adherents-filtrage-phone-button">
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => setShowFilterAlert(true)}
            >
              <FilterAltIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>

        {loading ? (
          <>
            {skeleton.map((item, index) => {
              return (
                <div key={index} className="custom-link-style adherents-item">
                  <div className="adherent-img-info">
                    <Skeleton
                      animation="wave"
                      className="adherent-img"
                      variant="circular"
                      width={60}
                      height={60}
                    />
                    <div className="adherents-info">
                      <Skeleton
                        sx={{ display: "inline-block", minWidth: "200px" }}
                        className="adherent-id"
                        animation="wave"
                      />

                      <span className="adherent-profession">
                        <Skeleton
                          sx={{ display: "inline-block", minWidth: "170px" }}
                          animation="wave"
                        />
                      </span>
                      <span className="adherent-ville">
                        <Skeleton
                          sx={{ display: "inline-block", minWidth: "130px" }}
                          animation="wave"
                        />
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex" }} className="rating-adherent">
                    <Rating
                      name="text-feedback"
                      value={0}
                      readOnly
                      size="small"
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          className="adherent-item-rating-star"
                          style={{ opacity: 0.55 }}
                          //   fontSize="inherit"
                          sx={{ fontSize: "1rem" }}
                        />
                      }
                    />
                    <Box sx={{ ml: 2, color: "gold", fontSize: "0.8rem" }}>
                      {item?.rating}
                    </Box>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {adherents?.map((item, index) => (
              <Link
                to={`/profil/${item.user_id}`}
                key={index}
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
                  <Box
                    className="adherent-item-rating-value"
                    sx={{ color: "gold" }}
                  >
                    {item.rating}
                  </Box>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
      <AdherentsFilterPc
        selectedCities={selectedCities}
        onFilterChange={handleFilterChange}
      />
      {showFilterAlert ? (
        <AdherentsFilterPhone
          onFilterChange={handleFilterChange}
          open={true}
          handleCancel={handleCancel}
          handleClose={() => setShowFilterAlert(false)}
        />
      ) : null}
      <div className="adherents-pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Adherents;
