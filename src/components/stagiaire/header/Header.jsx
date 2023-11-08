import React, { useState, useEffect } from "react";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import EditNoteIcon from "@mui/icons-material/EditNote";
import GetCookie from "../../../cookies/JWT/GetCookie";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import QRCodeReact from "qrcode.react";
import { toast } from "react-toastify";
import "./header.css";
import {
  Box,
  Button,
  IconButton,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";

import ProposAlert from "./ProposAlert";
import RatingAlert from "./RatingAlert";
import BadgeAlert from "./BadgeAlert";
import {
  DeleteProfilImage,
  UpdateApropos,
  UpdateProfilImage,
  getAdherent,
  rateAdherent,
  updateProfilAdherent,
} from "../../../app/api/adherentAxios";
import ImageAlert from "./ImageAlert";
import url from "../../../app/api/url";
import { Navigate, redirect, useNavigate, useParams } from "react-router";
import domain from "../../../app/api/domain";

const Header = () => {
  const [data, setData] = useState({});
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(true);
  const [loadingRating, setLoadingRating] = useState(false);
  const [loadingPropos, setLoadingPropos] = useState(false);

  const [showImg, setShowImg] = useState(false);
  const [showproposAlert, setShowproposAlert] = useState(false);
  const [showRatingAlert, setShowRatingAlert] = useState(false);
  const [showBadgeAlert, setShowBadgeAlert] = useState(false);
  const [proposData, setProposData] = useState({});
  const token = GetCookie("jwt");
  // rating of the adherent
  const [rating, setRating] = useState(null);
  // rating of the user
  const [ratingValue, setRatingValue] = useState(null);
  const skeleton = [1, 2, 3, 4, 5, 6];
  const { id } = useParams();
  let navigate = useNavigate();

  const fetchData = async () => {
    try {
      getAdherent(id, token)
        .then((data) => {
          if (data) {
            // console.log(data.user_id+" , "+user.id);
            setData(data);
            setRating(data.rating);
            // console.log(data);
            setRatingValue(data.myRating);
            setLoading(false);
            setShowRatingAlert(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      // setIsLoading(false);
      // setOpenBackdrop(false);
    }
  };

  const handleOpenRatingAlert = () => {
    if (user) {
      setShowRatingAlert(true);
    } else {
      navigate("/login");
    }
  };

  const handleSubmitRating = (value) => {
    try {
      rateAdherent(id, value, token)
        .then((data) => {
          if (data.message === "success") {
            setRatingValue(value);
            setLoadingRating(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoadingRating(false);
        });
    } catch (error) {
      console.log(error);
      setLoadingRating(false);
    }
  };

  const handleClose = () => {
    setShowproposAlert(false);
  };
  const handleUpdateHeader = (newData) => {
    const post = {
      id: newData.id,
      user_id: newData.user_id,
      secteur_id: newData.secteur_id,
      propos: newData.propos,
      profession: newData.profession,
      ville: newData.ville,
    };
    try {
      UpdateApropos(user?.id, post, token)
        .then((data) => {
          if (data.message === "success") {
            setData((prevData) => ({ ...prevData, ...newData }));
            toast.success("Les changements sont enregistrés", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setLoadingPropos(false);
            handleClose();
          }
        })
        .catch((error) => {
          console.log(error);
          setLoadingPropos(false);
          handleClose();
        });
    } catch (error) {
      console.log(error);
      setLoadingPropos(false);
      handleClose();
    }
  };

  const handleUpdateImage = (image) => {
    try {
      updateProfilAdherent(image, user?.id, token)
        .then((data) => {
          console.log(data.message);
          if (data.message === "success") {
            setData((prevData) => ({
              ...prevData,
              img_path: data.img_path,
            }));
            toast.success("La photo a été modifier", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = () => {
    try {
      DeleteProfilImage(user?.id, token)
        .then((data) => {
          if (data.message === "success") {
            setData((prevData) => ({
              ...prevData,
              img_path: null,
            }));
            toast.success("La photo a été supprimer", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div>
      <div className="cover-bg p-3 p-lg-4 text-white">
        <div className="row">
          <div className="col-lg-3 col-md-5">
            <div className="avatar hover-effect bg-white shadow-sm p-1">
              {loading ? (
                <div style={{ width: "208px", height: "200px" }}>
                  <Skeleton variant="rounded" width="100%" height="100%" />
                </div>
              ) : data.img_path ? (
                <img
                  onClick={() => {
                    setShowImg(true);
                  }}
                  src={url + "/storage/" + data?.img_path}
                  style={{ cursor: "pointer" }}
                  width="200"
                  height="200"
                />
              ) : (
                <img
                  onClick={() => {
                    setShowImg(true);
                  }}
                  src="no-img.jpg"
                  style={{ cursor: "pointer" }}
                  width="200"
                  height="200"
                />
              )}
            </div>
          </div>
          <div className="col-lg-7 col-md-7 text-center text-md-start">
            {data.id ? (
              <h2 className="h1 mt-2" data-aos="fade-left" data-aos-delay="0">
                {data.id}
              </h2>
            ) : (
              <Typography className="h1 mt-2" variant="h2">
                {loading ? <Skeleton /> : "h2"}
              </Typography>
            )}
            {data.profession ? (
              <p
                data-aos="fade-left"
                data-aos-delay="100"
                className="first-letter"
              >
                {data?.profession}
              </p>
            ) : (
              <Typography variant="h5">
                {loading ? <Skeleton /> : "h5"}
              </Typography>
            )}
            <div style={{ display: "flex" }} className="rating-ad">
              <Rating
                name="text-feedback"
                value={rating}
                readOnly
                style={{ color: "white" }}
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box sx={{ ml: 2, color: "white" }}>{rating}</Box>
            </div>
            {!user && user?.id === data?.user_id ? null : (
              <Button
                variant="contained"
                sx={{
                  marginTop: "6px",
                  bgcolor: "white",
                  color: "#e86928",
                  "&:hover": {
                    bgcolor: "#ebebeb",
                  },
                }}
                size="small"
                onClick={handleOpenRatingAlert}
              >
                Votre avis
              </Button>
            )}
          </div>
          <div
            className="col-lg-2 col-md-7 text-center text-md-start qr-code-profil"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QRCodeReact
              onClick={() => {
                setShowBadgeAlert(true);
              }}
              value={`${domain}/profil/${id}`}
              style={{
                cursor: "pointer",
                padding: "8px",
                background: "white",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </div>

      <div className="about-section pt-4 px-3 px-lg-4 mt-1">
        <div className="row">
          <div className="col-md-5">
            <div className="propos-de-moi-section mb-4">
              <h2 className="h3 mb-3 apropos-h3">
                À propos{" "}
                {user && user?.id === data?.user_id ? (
                  <IconButton
                    aria-label="Modifier"
                    style={{
                      // position: "absolute",
                      width: "fit-content",
                      // right: "40px",
                    }}
                    onClick={() => setShowproposAlert(true)}
                  >
                    <EditNoteIcon style={{ fontSize: "2rem" }} />
                  </IconButton>
                ) : null}
              </h2>
              {data?.propos ? (
                <p className="apropos"> {data?.propos} </p>
              ) : (
                <>
                  {skeleton.map((item) => {
                    return (
                      <Skeleton
                        key={item}
                        sx={{
                          display: "inline-block",
                          width: "100%",
                          height: "1rem",
                        }}
                        animation="wave"
                      />
                    );
                  })}
                  <Skeleton
                    sx={{
                      display: "inline-block",
                      width: "60%",
                      height: "1rem",
                    }}
                    animation="wave"
                  />
                </>
              )}
            </div>
          </div>
          <div className="col-md-6 offset-md-1 apropos-detail">
            <div className="pb-1 mb-3">
              SECTEUR D'ACTIVITEE :{" "}
              {data?.secteur?.lib ? (
                <span className="first-letter text-secondary">
                  {data?.secteur?.lib}
                </span>
              ) : (
                <Skeleton
                  sx={{ display: "inline-block", width: "60%", height: "1rem" }}
                  animation="wave"
                />
              )}
            </div>
            <div className="pb-1 mb-3">
              PROFESSION :{" "}
              {data?.profession ? (
                <span className="first-letter text-secondary">
                  {data?.profession}
                </span>
              ) : (
                <Skeleton
                  sx={{ display: "inline-block", width: "60%", height: "1rem" }}
                  animation="wave"
                />
              )}
            </div>
            <div className="pb-1 mb-3">
              VILLE :{" "}
              {data?.ville ? (
                <span className="first-letter text-secondary">
                  {data?.ville}
                </span>
              ) : (
                <Skeleton
                  sx={{ display: "inline-block", width: "60%", height: "1rem" }}
                  animation="wave"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showImg && (
        <ImageAlert
          cur_user_id={user?.id}
          user_id={data.user_id}
          open={true}
          handleClose={() => setShowImg(false)}
          img={data?.img_path}
          onUpdate={handleUpdateImage}
          onDelete={handleDeleteImage}
        />
      )}
      {showproposAlert && (
        <ProposAlert
          open={true}
          handleClose={handleClose}
          data={data}
          onUpdate={handleUpdateHeader}
          loadingPropos={loadingPropos}
          setLoadingPropos={setLoadingPropos}
        />
      )}
      {showRatingAlert && (
        <RatingAlert
          open={true}
          handleClose={() => setShowRatingAlert(false)}
          ratingValue={ratingValue}
          loadingRating={loadingRating}
          setLoadingRating={setLoadingRating}
          onSubmit={handleSubmitRating}
        />
      )}
      {showBadgeAlert && (
        <BadgeAlert
          open={true}
          data={data}
          handleClose={() => setShowBadgeAlert(false)}
        />
      )}
    </div>
  );
};

export default Header;
