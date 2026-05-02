import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import url from "../../../../app/api/url";
import { Link } from "react-router-dom";
import ContactModal from "../../../ContactModal";

const Announce = ({ announce, searchValue }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const highlightSearchValue = (text) => {
    if (!searchValue) return text;
    const regex = new RegExp(`(${searchValue})`, "gi");
    return text.replace(regex, (match, p1) => `<span class="highlight">${p1}</span>`);
  };

  const startDate = new Date(announce.debut);
  const endDate = new Date(announce.fin);

  const formattedStartDate = format(startDate, "HH:mm 'le' EEEE dd MMMM yyyy", { locale: fr });
  const formattedEndDate = format(endDate, "HH:mm 'le' EEEE dd MMMM yyyy", { locale: fr });

  const renderContent = () => {
    const content = showFullContent ? announce?.desc : `${announce?.desc.substring(0, 120)}`;
    return (
      <div>
        <p
          id="text-tweet"
          style={{ fontSize: '15px', color: '#495057', lineHeight: 1.7, margin: 0 }}
          dangerouslySetInnerHTML={{ __html: highlightSearchValue(content) }}
        />
        {!showFullContent && announce?.desc.length > 120 && (
          <span className="voir_plus" onClick={handleToggleContent} style={{ color: '#e86928', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>
            {" "}…voir plus
          </span>
        )}
      </div>
    );
  };

  const initials = announce?.user?.prenom?.[0] || 'S';

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        marginBottom: '12px',
        width: '95%',
        overflow: 'hidden',
        border: hovered ? '1px solid #e86928' : '1px solid #e9ecef',
        boxShadow: hovered
          ? '0 4px 12px rgba(232,105,40,0.10)'
          : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card Header */}
      <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            alt="avatar"
            src={`https://ui-avatars.com/api/?name=${announce?.user?.prenom || 'S'}&background=e86928&color=fff&bold=true&size=48`}
            style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0 }}
          />
          <div>
            <p style={{ fontWeight: 700, fontSize: '16px', color: '#212529', margin: 0, lineHeight: 1.3 }}>
              {announce?.titre || "Service"}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <AccessTimeIcon style={{ fontSize: 13, color: '#adb5bd' }} />
              <span style={{ color: '#adb5bd', fontSize: '12px' }}>
                {formattedStartDate}
              </span>
            </div>
          </div>
        </div>
        {announce?.prix && (
          <span style={{
            backgroundColor: '#fff8f3',
            color: '#e86928',
            fontWeight: 700,
            fontSize: '15px',
            padding: '4px 12px',
            borderRadius: '20px',
            border: '1px solid #ffd8b8',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {announce.prix}$
          </span>
        )}
      </div>

      {/* Description */}
      <div style={{ padding: '0 20px 14px' }}>
        {renderContent()}
      </div>

      {/* Image */}
      {announce?.img && (
        <img
          className="image_post"
          src={announce?.img?.startsWith('http') ? announce.img : url + "/storage/" + announce?.img}
          alt="Image du service"
          style={{ width: "100%", maxHeight: "260px", objectFit: "cover" }}
        />
      )}

      {/* Action Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '12px 20px',
        borderTop: '1px solid #f1f3f5',
        backgroundColor: '#fafafa',
      }}>
        <button
          onClick={() => setContactModalOpen(true)}
          style={{
            padding: '8px 22px',
            borderRadius: '8px',
            backgroundColor: '#e86928',
            color: 'white',
            fontWeight: 600,
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s',
            fontFamily: 'inherit',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d35f1a'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e86928'}
        >
          Contacter {announce?.user?.prenom || 'le freelance'}
        </button>
      </div>

      <ContactModal
        open={contactModalOpen}
        handleClose={() => setContactModalOpen(false)}
        adherentId={announce?.user_id}
        adherentName={announce?.user?.prenom || 'le freelance'}
      />
    </div>
  );
};

export default Announce;

