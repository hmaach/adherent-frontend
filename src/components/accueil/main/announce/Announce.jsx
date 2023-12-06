import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import url from "../../../../app/api/url";

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
            ...Voir plus
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
              <img alt="Image de profil" src="no-img.jpg" id="image-profile" />
              {/* ) */}
              {/* // <Avatar id="image-profile" {...stringAvatar(`${post.prenom} ${post.nom}`)} /> */}
              {/* } */}
            </div>
            <div className="publieur">
              <span id="flex-tweet">
                <p id="tweet-name" className="first-letter no-margin">
                  {/* {post.prenom} {post.nom} */}4567
                </p>

                <p id="type_poste" className="no-margin date_poste">
                  {/* <AccessTimeIcon
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                      marginRight: "2px",
                    }}
                  /> */}
                  Depuis {formattedStartDate}
                </p>
                <p id="type_poste" className="no-margin date_poste">
                  {/* <AccessTimeIcon
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                      marginRight: "2px",
                    }}
                  /> */}
                  à {formattedEndDate}
                </p>
              </span>
            </div>
            {/* <div className="type">
                            <Badge
                            className="first-letter"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                color="primary"
                                badgeContent={post.type}
                            >
                                <span className="role_poste first-letter">( {post.role} )</span>
                                <span id="type_poste" className="first-letter"></span>
                            </Badge>
                        </div> */}
          </div>

          {/* {user &&
                        <CustomizedMenus
                            user={user}
                            setPosts={setPosts}
                            onSubmit={handleDeletePost}
                            post={post}
                            handleUpdateCallback={handleUpdateCallback}
                        />
                    } */}
        </div>

        <div id="post-box">
          {/* <p id="text-tweet">
            {showFullContent
              ? announce?.desc
              : `${announce?.desc.substring(0, 70)}`}
            {!showFullContent && announce?.desc.length > 70 && (
              <span className="voir_plus" onClick={handleToggleContent}>
                ...Voir plus
              </span>
            )}
          </p> */}
          {renderContent()}
          {/* {!showFullContent && announce?.desc.length > 70 && (
            <span className="voir_plus" onClick={handleToggleContent}>
              ...Voir plus
            </span>
          )} */}
        </div>
      </div>
      {announce?.img && (
        // !post.pdf_path
        <img
          className="image_post"
          src={url + "/storage/" + announce?.img}
          alt="Image"
        />
      )}

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
