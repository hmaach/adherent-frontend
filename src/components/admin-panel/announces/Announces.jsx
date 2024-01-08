import React, { useEffect, useState } from "react";
import Announce from "./Announce";
import { getUnimprovedAnnounces } from "../../../app/api/announceAxios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import GetCookie from "../../../cookies/JWT/GetCookie";
import { LoadingButton } from "@mui/lab";

const Announces = () => {
  const [page, setPage] = useState(1);
  const [announces, setAnnounces] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [lastPage, setLastPage] = useState(null);
  const [refetch, setRefetch] = useState(false);
  // const [approuverLoading, setApprouverLoading] = useState(false);
  // const [suppLoading, setSuppLoading] = useState(false);
  const token = GetCookie("jwt");

  const fetchAnnounces = async (currentPage, loading = null) => {
    try {
      if (loading) {
        setIsLoading(true);
      }
      getUnimprovedAnnounces(currentPage, token)
        .then((data) => {
          if (data.data) {
            const newDataArray = Object.values(data?.data);
            setAnnounces((prevAnnounces) => [
              ...prevAnnounces,
              ...newDataArray,
            ]);
            setTotal(data?.total)
            setPage(data.current_page);
            setLastPage(data.last_page);
            setIsLoading(false);
            setLoadMore(false);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 401) {
            // logoutRedirect();
          }
        });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching announcements");
    }
  };

  const refetchAnnounces = async (currentPage) => {
    try {
      getUnimprovedAnnounces(currentPage, token)
        .then((data) => {
          if (data.data) {
            const newDataArray = Object.values(data?.data);
            setAnnounces(newDataArray);
            setPage(data.current_page);
            setLastPage(data.last_page);
            setIsLoading(false);
            setLoadMore(false);
            setTotal(data?.total)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching announcements");
    }
  };

  // const handleApprouver = (announceId) => {
  //   setApprouverLoading(true);

  //   setAnnounces((prevAnnounces) =>
  //     prevAnnounces.filter((announce) => announce.id !== announceId)
  //   );

  //   setApprouverLoading(false);
  // };

  // const handleSupprimer = (announceId) => {
  //   setSuppLoading(true);

  //   setAnnounces((prevAnnounces) =>
  //     prevAnnounces.filter((announce) => announce.id !== announceId)
  //   );

  //   setSuppLoading(false);
  // };

  // const handleLoadMore = () => {
  //   setLoadMore(true);
  //   setPage((prevPage) => {
  //     const nextPage = prevPage + 1;
  //     fetchAnnounces(nextPage, false);
  //     return nextPage;
  //   });
  // };

  const handleRefetch = () => {
    setRefetch(!refetch);
  };

  const handleLoadMore = () => {
    setLoadMore(true);
    const nextPage = page + 1;
    fetchAnnounces(nextPage, false);
  };

  useEffect(() => {
    fetchAnnounces(page);
  }, []);

  useEffect(() => {
    refetchAnnounces(1);
  }, [refetch]);

  return (
    <div id="container-main" style={{ margin: 0 }}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
        <h5 className="resultats-title">Annonces en attente d'acceptation <span className="resultats">( {total} Résultats )</span></h5>
          {announces.map((item, index) => (
            // item?.id
            <Announce
              key={index}
              announce={item}
              handleRefetch={handleRefetch}
              // onApprouver={() => handleApprouver(item.id)}
              // onSupprimer={() => handleSupprimer(item.id)}
            />
          ))}

          <div className="div_get_more">
            {announces.length !== 0 ? (
              page !== lastPage ? (
                <LoadingButton
                  size="small"
                  onClick={handleLoadMore}
                  loading={loadMore}
                  variant="outlined"
                  sx={{
                    borderRadius: "20px",
                    borderColor: "#e86928",
                    color: "#e86928",
                    bgcolor: "white",
                    marginTop: "0.5rem",
                    "&:hover": {
                      borderColor: "#e86928",
                      color: "#e86928",
                      bgcolor: "white",
                      boxShadow: "3px 2px 3px #e7dfcf",
                    },
                  }}
                >
                  <span>Avoir plus</span>
                </LoadingButton>
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

export default Announces;
