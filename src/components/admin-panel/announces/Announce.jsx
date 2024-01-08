import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import url from "../../../app/api/url";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ButtonGroup } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {
  approveAnnounce,
  deleteAnnounce,
} from "../../../app/api/announceAxios";
import { toast } from "react-toastify";
import GetCookie from "../../../cookies/JWT/GetCookie";

const Announce = ({
  announce,
  searchValue,
  // onApprouver,
  // onSupprimer,
  handleRefetch,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [approuverLoading, setApprouverLoading] = useState(false);
  const [suppLoading, setSuppLoading] = useState(false);
  const token = GetCookie("jwt");

  const handleApprouver = () => {
    try {
      approveAnnounce(announce?.id, token).then((data) => {
        if (data?.message === "success") {
          setApprouverLoading(true);
          handleRefetch();
          setApprouverLoading(false);
          toast.success("L'announe a été approuvé avec succès!", {
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSupprimer = () => {
    try {
      deleteAnnounce(announce?.id, token).then((data) => {
        if (data?.message === "success") {
          setSuppLoading(true);
          handleRefetch();
          setSuppLoading(false);
          toast.success("L'announe a été supprimé avec succès!", {
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const highlightSearchValue = (text) => {
    if (!searchValue) {
      return text;
    }

    const regex = new RegExp(`(${searchValue})`, "gi");
    return text.replace(
      regex,
      (match, p1) => `<span class="highlight">${p1}</span>`
    );
  };

  const startDate = new Date(announce.debut);
  const endDate = new Date(announce.fin);

  const formattedStartDate = format(startDate, "HH:mm 'le' EEEE dd MMMM yyyy", {
    locale: fr,
  });
  const formattedEndDate = format(endDate, "HH:mm 'le' EEEE dd MMMM yyyy", {
    locale: fr,
  });

  const renderContent = () => {
    const content = showFullContent
      ? announce?.desc
      : `${announce?.desc?.substring(0, 70)}`;
    return (
      <div>
        <p
          id="text-tweet"
          dangerouslySetInnerHTML={{ __html: highlightSearchValue(content) }}
        />
        {!showFullContent && announce?.desc?.length > 70 && (
          <span className="voir_plus" onClick={handleToggleContent}>
            ...voir plus
          </span>
        )}
      </div>
    );
  };

  return (
    <div id="tweet-box">
      <div id="box-tweet">
        <div id="name-id">
          <div style={{ display: "flex" }}>
            <div id="profile-tweet">
              <img alt="Image de profil" src="no-img.jpg" id="image-profile" />
            </div>
            <div className="publieur">
              <span id="flex-tweet">
                <p id="tweet-name" className="first-letter no-margin">
                  {announce?.user_id}
                </p>

                <p id="type_poste" className="no-margin date_poste">
                  Depuis {formattedStartDate}
                </p>
                <p id="type_poste" className="no-margin date_poste">
                  à {formattedEndDate}
                </p>
              </span>
            </div>
          </div>
          <div>
            <ButtonGroup variant="text" aria-label="text button group">
              <LoadingButton
                loading={suppLoading}
                loadingPosition="end"
                endIcon={<DeleteOutlineIcon />}
                color="error"
                onClick={handleSupprimer}
              >
                Supprimer
              </LoadingButton>
              <LoadingButton
                loading={approuverLoading}
                loadingPosition="end"
                color="success"
                endIcon={<AddTaskIcon />}
                onClick={handleApprouver}
              >
                Approuver
              </LoadingButton>
            </ButtonGroup>
          </div>
        </div>

        <div id="post-box">{renderContent()}</div>
      </div>
      {announce?.img && (
        <img
          className="image_post"
          src={url + "/storage/" + announce?.img}
          alt="Image"
        />
      )}
    </div>
  );
};

export default Announce;
