import React, { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

const TeamMemberModal = ({ member, onClose }) => {
  const { t } = useLanguage();
  const initial =
    member.firstName?.[0]?.toUpperCase() ||
    member.lastName?.[0]?.toUpperCase() ||
    "T";

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {member.image ? (
          <img
            src={member.image}
            className="modal-image"
            alt={`${member.firstName} ${member.lastName}`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="modal-avatar-placeholder"
          style={{ display: member.image ? "none" : "flex" }}
        >
          {initial}
        </div>

        <h3 className="modal-title">
          {member.firstName} {member.lastName}
        </h3>
        <p className="modal-subtitle">{member.role}</p>

        <div className="modal-description">{member.bio}</div>

        <div className="modal-actions">
          <button className="modal-action-close" onClick={onClose}>
            {t.footer.contact || "Close"}
          </button>
          <a
            href={`mailto:${member.email}`}
            style={{
              flex: 1,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button className="modal-action-contact" style={{ width: "100%" }}>
              {t.footer.contact}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;
