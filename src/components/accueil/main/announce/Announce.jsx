import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import url from "../../../../app/api/url";
import { Link } from "react-router-dom";

const Announce = ({ announce, searchValue }) => {
  const [showFullContent, setShowFullContent] = useState(false);

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
    const content = showFullContent ? announce?.desc : `${announce?.desc.substring(0, 70)}`;
    return (
      <div>
        <p
          id="text-tweet"
          dangerouslySetInnerHTML={{ __html: highlightSearchValue(content) }}
        />
        {!showFullContent && announce?.desc.length > 70 && (
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
              {/* {
                post.profile ? (
                  <img src="ayadi.jpeg" alt="profile" id="image-profile" />
                ) : ( */}
              <img alt="Image de profil" src={`https://ui-avatars.com/api/?name=${announce?.user?.prenom || 'S'}&background=random`} id="image-profile" style={{ borderRadius: '50%' }} />
              {/* ) */}
              {/* // <Avatar id="image-profile" {...stringAvatar(`${post.prenom} ${post.nom}`)} /> */}
              {/* } */}
            </div>
            <div className="publieur">
              <span id="flex-tweet">
                <p id="tweet-name" className="first-letter no-margin" style={{fontSize: '1.2rem'}}>
                  {announce?.titre || "Service"}
                  <span style={{ float: 'right', color: '#1976d2', marginLeft: '10px' }}>
                    {announce?.prix ? `${announce?.prix}$` : ''}
                  </span>
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
        </div>

        <div id="post-box">
          {renderContent()}
        </div>
      </div>
      {announce?.img && (
        <img
          className="image_post"
          src={announce?.img?.startsWith('http') ? announce.img : url + "/storage/" + announce?.img}
          alt="Image du service"
          style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px", marginTop: "10px" }}
        />
      )}

      {/* Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px', paddingBottom: '15px', paddingRight: '10px' }}>
        <Link 
          to={`/profil/${announce?.user_id}`}
          style={{ padding: '8px 20px', borderRadius: '20px', backgroundColor: '#1976d2', color: 'white', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', transition: 'background-color 0.2s' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
        >
          Contacter {announce?.user?.prenom || 'le freelance'}
        </Link>
      </div>

      {/* {post.imgs?.map((img, index) => (
        <div key={index}>
          <img
            src={URL.createObjectURL(img)}
            alt={`Image ${index}`}
            className="img_post"
          />
        </div>
      ))} */}
    </div>
  );
};

export default Announce;
