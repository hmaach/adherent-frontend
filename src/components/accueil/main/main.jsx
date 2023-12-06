import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import Announce from "./announce/Announce";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import {
  getAccueilAnnounces,
  searchAccueilAnnounces,
} from "../../../app/api/announceAxios";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import GetCookie from "../../../cookies/JWT/GetCookie";
import "./main.css";
import Evenement from "./Evenement";

const Main = () => {
  const [announces, setAnnounces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [curPage, setCurPage] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const curUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const fetchAnnounces = async (currentPage, loading = null) => {
    try {
      if (loading) {
        setIsLoading(true);
      }
      getAccueilAnnounces(currentPage)
        .then((data) => {
          const newDataArray = Object.values(data?.data);
          setAnnounces((prevAnnounces) => [...prevAnnounces, ...newDataArray]);
          setCurPage(data.current_page);
          setLastPage(data.last_page);
          // setPage(data?.current_page);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching announcements");
    }
  };

  const searchAnnounces = async (q, currentPage, loading = null) => {
    try {
      if (loading) {
        setIsLoading(true);
      }
      searchAccueilAnnounces(q, currentPage)
        .then((data) => {
          if (loading) {
            setAnnounces(data.data);
            setCurPage(data.current_page);
            setLastPage(data.last_page);
          } else {
            const newDataArray = Array.isArray(data.data)
              ? data.data
              : Object.values(data?.data);
            setAnnounces((prevAnnounces) => [
              ...prevAnnounces,
              ...newDataArray,
            ]);
          }

          setCurPage(data.current_page);
          setLastPage(data.last_page);
          setIsLoading(false);
          // setPage(data?.current_page);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching announcements");
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchAnnounces(nextPage, false);
      return nextPage;
    });
  };

  useEffect(() => {
    let timerId;

    if (searchValue !== "") {
      // Clear previous timer
      clearTimeout(timerId);

      // Set a new timer to execute after 2 seconds
      timerId = setTimeout(() => {
        searchAnnounces(searchValue, searchPage, true);
      }, 2000);
    }

    // Clean up the timer on component unmount or when searchValue changes
    return () => {
      clearTimeout(timerId);
    };
  }, [searchValue, searchPage]);

  useEffect(() => {
    if (searchValue === "") {
      setAnnounces([])
      setPage(1)
      fetchAnnounces(1, true);
    }
  }, [searchValue]);
  return (
    <div id="container-main">
      <div className="main-post-header">
        <TextField
          className="main-post-search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          size="small"
          id="outlined-search"
          label="Chercher publications..."
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
          }}
        />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {announces.map((item, index) =>
            item.type === "announce" ? (
              <Announce key={index} announce={item} searchValue={searchValue} />
            ) : (
              <Evenement key={index} event={item} searchValue={searchValue} />
            )
          )}

          <div className="div_get_more">
            {announces.length !== 0 ? (
              curPage !== lastPage ? (
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: "20px",
                    marginTop: "0.5rem",
                  }}
                  onClick={handleLoadMore}
                >
                  Avoir plus
                </Button>
              ) : (
                <span className="main-no-posts">
                  Pas d'autres annonces disponibles.
                </span>
              )
            ) : (
              <span className="main-no-posts">
                Aucune publication trouvée !
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
