import React, { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

const AdherentModal = ({ adherent, onClose }) => {
  const { t } = useLanguage();
  const initial = adherent.name?.[0]?.toUpperCase() || "A";

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

        <div className="modal-avatar-placeholder">{initial}</div>

        <h3 className="modal-title">{adherent.name}</h3>
        <p className="modal-subtitle">{adherent.service}</p>

        <div className="modal-description">
          <div style={{ marginBottom: "0.75rem" }}>
            <strong>{t.adherents.rating}:</strong>{" "}
            <span style={{ color: "#f59e0b" }}>
              {"★".repeat(Math.floor(adherent.rating))}
            </span>{" "}
            {adherent.rating} &nbsp;·&nbsp; {adherent.reviews} reviews
          </div>
          <div>
            {adherent.verified && (
              <span
                style={{
                  display: "inline-block",
                  background: "#10b981",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "2rem",
                  marginBottom: "0.5rem",
                }}
              >
                ✓ Verified Professional
              </span>
            )}
            <p style={{ marginTop: "0.5rem", margin: 0 }}>
              Available for consultations and service inquiries.
            </p>
          </div>
        </div>

        <div className="modal-actions">
          <button className="modal-action-close" onClick={onClose}>
            {t.footer.contact || "Close"}
          </button>
          <button className="modal-action-contact">
            {t.adherents.viewProfile}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdherentModal;
