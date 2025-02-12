import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./announces.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Announce from "./announce/Announce";
import CustomizedMenus from "./CustomizedMenus";
import AnnounceAlert from "./AnnounceAlert";
import AnnouncesEdit from "./AnnouncesEdit";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { publierAnnounce, getAnnounces } from "../../../app/api/announceAxios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { Avatar, CardHeader, IconButton, Skeleton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GetCookie from "../../../cookies/JWT/GetCookie";
import { useParams } from "react-router";

const Announces = () => {
  const user = useSelector(selectCurrentUser);
  const [showAnnounceAlert, setShowAnnounceAlert] = useState(false);
  const [showAnnouncesEdit, setShowAnnouncesEdit] = useState(false);
  const [announces, setAnnounces] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = GetCookie("jwt");
  const { id } = useParams();

  const fetchData = async () => {
    try {
      getAnnounces(id, token)
        .then((data) => {
          if (data) {
            // console.log(data);
            setAnnounces(data);
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

  announces.sort((a, b) => a.order - b.order);
  // console.log(announces.length);
  const handleAddCallback = () => {
    setShowAnnounceAlert(true);
  };
  const handleUpdateCallback = () => {
    // console.log("hamza handle Update");
    setShowAnnouncesEdit(true);
  };
  const handleClose = () => {
    setShowAnnounceAlert(false);
  };

  const handleCloseEdit = () => {
    setShowAnnouncesEdit(false);
  };

  const handleAddAnnouce = (newAnnounce) => {
    const maxIndex = announces.length > 0 ? Math.max(...announces.map((announce) => announce.order || 0)) : 0;
    newAnnounce.order = maxIndex + 1;
    newAnnounce.id = maxIndex + 1;

    try {
      publierAnnounce(newAnnounce, token)
        .then((data) => {
          if (data.message === "success") {
            newAnnounce.img = data.path;
            newAnnounce.approved = 0;
            setAnnounces([...announces, newAnnounce]);
            toast.success(" L'annonce a été bien enregistrée. ", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            console.log(data.message);
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
    <div className="skills-section px-3 px-lg-4">
      <div className="announces-header">
        <h2 className="h3 mb-3 competence announces-h3">Announces</h2>
        {user && user?.role === "adherent" ? (
          <CustomizedMenus
            announcesLength={announces.length}
            handleAddCallback={handleAddCallback}
            handleUpdateCallback={handleUpdateCallback}
          />
        ) : null}
      </div>
      {loading ? (
        <>
          <Skeleton variant="rounded" width="100%" height={380} />
          <Skeleton
            variant="text"
            sx={{ fontSize: "2rem", marginTop: "3px" }}
          />
        </>
      ) : announces?.length != 0 ? (
        <Swiper
          spaceBetween={40}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {announces &&
            announces.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Announce
                    img={item.img}
                    desc={item.desc}
                    debut={item.debut}
                    fin={item.fin}
                    approved={item.approved}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      ) : (
        <div style={{ display:"flex",justifyContent:"center" }}>
          <span className="main-no-posts" >
          Il n'y a pas encore d'annonces !
          </span>
        </div>
      )}
      {showAnnounceAlert && (
        <AnnounceAlert
          // onSubmit={handleUpdatePost}
          // post={selectedPost}
          open={true}
          // filieres={filieres}
          handleAddAnnouceCallback={handleAddAnnouce}
          handleClose={handleClose}
        />
      )}
      {showAnnouncesEdit && (
        <AnnouncesEdit
          // onSubmit={handleUpdatePost}
          announces={announces}
          setAnnounces={setAnnounces}
          open={true}
          // filieres={filieres}
          // handleUpdateAnnoucesCallback={handleUpdateAnnouces}
          handleClose={handleCloseEdit}
        />
      )}
    </div>
  );
};

export default Announces;
