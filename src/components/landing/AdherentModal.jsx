import React, { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

const AdherentModal = ({ adherent, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="modal-image">{adherent.image}</div>
        <h3 className="modal-title">{adherent.name}</h3>
        <p className="modal-subtitle">{adherent.service}</p>

        <div className="modal-description">
          <div style={{ marginBottom: "1rem" }}>
            <strong>{t.adherents.rating}:</strong> {adherent.rating} ⭐
            ({adherent.reviews} {t.footer.rights})
          </div>
          <div>
            <strong>{t.adherents.viewProfile}:</strong> Available for consultations
            and service inquiries. {adherent.verified && "Verified professional."}
          </div>
        </div>

        <div className="modal-actions">
          <button className="modal-action-close" onClick={onClose}>
            {t.footer.contact}
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
