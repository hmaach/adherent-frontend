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

const Announces = () => {
  const [showAnnounceAlert, setShowAnnounceAlert] = useState(false);
  const [showAnnouncesEdit, setShowAnnouncesEdit] = useState(false);
  const [announces, setAnnounces] = useState([
    {
      id: 1,
      order: 4,
      img: "https://media.web.userguiding.com/uploads/2021/04/22005552/announce-features.jpg",
      desc: "lorem4 lorem lorem lorem lorem lorem lorem lorem lorem lorem",
      debut: "Lundi 23 mars 2023",
      fin: "Lundi 23 mars 2023",
    },
    {
      id: 2,
      order: 2,
      img: "https://st2.depositphotos.com/3433891/6661/i/450/depositphotos_66619479-stock-photo-boy-shouting-with-the-megaphone.jpg",
      desc: "lorem2 lorem lorem lorem lorem lorem lorem lorem lorem lorem",
      debut: "Lundi 23 mars 2023",
      fin: "Lundi 23 mars 2023",
    },
    {
      id: 3,
      order: 3,
      img: "https://as2.ftcdn.net/v2/jpg/01/66/10/69/1000_F_166106902_E03lyVNk1y3A4zQDBGD7SOv82B1mVhia.jpg",
      desc: "lorem3 lorem lorem lorem lorem lorem lorem lorem lorem lorem",
      debut: "Lundi 23 mars 2023",
      fin: "Lundi 23 mars 2023",
    },
    {
      id: 4,
      order: 1,
      img: "https://media.istockphoto.com/id/1319828004/vector/megaphone-with-exciting-news-speech-bubble-loudspeaker-banner-for-business-marketing-and.jpg?s=612x612&w=0&k=20&c=6jEplCQaAAIQS2FmM5txZ7UK6A0DPK6IC2UQ9t2cF3g=",
      desc: "lorem1 lorem lorem lorem lorem lorem lorem lorem lorem lorem",
      debut: "Lundi 23 mars 2023",
      fin: "Lundi 23 mars 2023",
    },
    {
      id: 5,
      order: 5,
      img: "https://www.guidingtech.com/wp-content/uploads/shutterstock_93030295c_4d470f76dc99e18ad75087b1b8410ea9.jpg",
      desc: "lorem5 lorem lorem lorem lorem lorem lorem lorem lorem lorem",
      debut: "Lundi 23 mars 2023",
      fin: "Lundi 23 mars 2023",
    },
    {
      id: 6,
      order: 6,
      img: "https://en.pimg.jp/069/015/376/1/69015376.jpg",
      desc: "lorem6 lorem lorem lorem lorem lorem lorem lorem lorem lorem",
      debut: "Lundi 23 mars 2023",
      fin: "Lundi 23 mars 2023",
    },
  ]);

  announces.sort((a, b) => a.order - b.order);

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
    // console.log(announce);
    const maxIndex = Math.max(...announces.map((announce) => announce.order));
    newAnnounce.order = maxIndex + 1;
    newAnnounce.id = maxIndex + 1;
    setAnnounces([...announces, newAnnounce]);
    toast.success(' L\'annonce a été bien enregistrée. ', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="skills-section px-3 px-lg-4">
      <div className="announces-header">
        <h2 className="h3 mb-3 competence announces-h3">Announces</h2>
        <CustomizedMenus
          handleAddCallback={handleAddCallback}
          handleUpdateCallback={handleUpdateCallback}
        />
      </div>
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
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
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
